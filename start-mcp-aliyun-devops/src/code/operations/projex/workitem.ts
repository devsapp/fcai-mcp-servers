import {RecordType, string, z, ZodString} from "zod";
import { yunxiaoRequest } from "../../common/utils.js";
import {
  WorkItemSchema,
  FilterConditionSchema,
  ConditionsSchema, ProjectInfoSchema, WorkItemType
} from "../../common/types.js";
import { getCurrentUserFunc } from "../organization/organization.js";

export async function getWorkItemFunc(
  organizationId: string,
  workItemId: string
): Promise<z.infer<typeof WorkItemSchema>> {
  const url = `/oapi/v1/projex/organizations/${organizationId}/workitems/${workItemId}`;

  const response = await yunxiaoRequest(url, {
    method: "GET",
  });

  return WorkItemSchema.parse(response);
}

export async function searchWorkitemsFunc(
  organizationId: string,
  category: string,
  spaceId: string,
  subject?: string,
  status?: string,
  createdAfter?: string,
  createdBefore?: string,
  updatedAfter?: string,
  updatedBefore?: string,
  creator?: string,
  assignedTo?: string,
  advancedConditions?: string,
  orderBy: string = "gmtCreate",
  includeDetails: boolean = false // 新增参数：是否自动补充缺失的description等详细信息
): Promise<z.infer<typeof WorkItemSchema>[]> {
  // 处理assignedTo为"self"的情况，自动获取当前用户ID
  let finalAssignedTo = assignedTo;
  let finalCreator = creator;
  
  if (assignedTo === "self" || creator === "self") {
    try {
      const currentUser = await getCurrentUserFunc();
      if (currentUser.id) {
        if (assignedTo === "self") {
          finalAssignedTo = currentUser.id;
        }
        if (creator === "self") {
          finalCreator = currentUser.id;
        }
      } else {
        finalAssignedTo = assignedTo;
        finalCreator = creator;
      }
    } catch (error) {
      finalAssignedTo = assignedTo;
      finalCreator = creator;
    }
  }

  const url = `/oapi/v1/projex/organizations/${organizationId}/workitems:search`;

  const payload: Record<string, any> = {
    category: category,
    spaceId: spaceId,
  };

  const conditions = buildWorkitemConditions({
    subject,
    status,
    createdAfter,
    createdBefore,
    updatedAfter,
    updatedBefore,
    creator: finalCreator,
    assignedTo: finalAssignedTo,
    advancedConditions
  });
  
  if (conditions) {
    payload.conditions = conditions;
  }

  payload.orderBy = orderBy;

  const response = await yunxiaoRequest(url, {
    method: "POST",
    body: payload,
  });

  if (!Array.isArray(response)) {
    return [];
  }

  const workItems = response.map(workitem => WorkItemSchema.parse(workitem));

  // 如果需要补充详细信息，使用分批并发方式获取
  if (includeDetails) {
    const itemsNeedingDetails = workItems.filter(item => 
      item.id.length > 0 &&
      (item.description === null || item.description === undefined || item.description === "")
    );

    if (itemsNeedingDetails.length > 0) {
      // 分批并发获取详情
      const descriptionMap = await batchGetWorkItemDetails(organizationId, itemsNeedingDetails);

      // 更新workItems中的description
      return workItems.map(item => {
        if (descriptionMap.has(item.id)) {
          return {
            ...item,
            description: descriptionMap.get(item.id) || item.description
          };
        }
        return item;
      });
    }
  }

  return workItems;
}

// 分批并发获取工作项详情
async function batchGetWorkItemDetails(
  organizationId: string, 
  workItems: z.infer<typeof WorkItemSchema>[],
  batchSize: number = 10,  // 每批处理10个
  maxItems: number = 100   // 最多处理100个
): Promise<Map<string, string | null>> {
  const descriptionMap = new Map<string, string | null>();
  
  // 限制处理数量
  const limitedItems = workItems.slice(0, maxItems);

  // 分批处理
  for (let i = 0; i < limitedItems.length; i += batchSize) {
    const batch = limitedItems.slice(i, i + batchSize);
    
    // 批次内并发执行
    const batchResults = await Promise.allSettled(
      batch.map(async (item) => {
        // 再次检查item.id是否为有效字符串
        if (typeof item.id !== 'string' || item.id.length === 0) {
          return { 
            id: item.id || 'unknown', 
            description: null,
            success: false 
          };
        }
        
        const itemId: string = item.id;
        
        try {
          const detailedItem = await getWorkItemFunc(organizationId, itemId);
          return { 
            id: itemId, 
            description: detailedItem.description,
            success: true 
          };
        } catch (error) {
          return { 
            id: itemId, 
            description: null,
            success: false 
          };
        }
      })
    );

    // 处理批次结果
    batchResults.forEach((result) => {
      if (result.status === 'fulfilled') {
        // 确保description类型正确，将undefined转换为null
        const description = result.value.description === undefined ? null : result.value.description;
        descriptionMap.set(result.value.id, description);
      }
    });
  }
  return descriptionMap;
}

function buildWorkitemConditions(args: {
  subject?: string;
  status?: string;
  createdAfter?: string;
  createdBefore?: string;
  updatedAfter?: string;
  updatedBefore?: string;
  creator?: string;
  assignedTo?: string;
  advancedConditions?: string;
}): string | undefined {

  if (args.advancedConditions) {
    return args.advancedConditions;
  }

  const filterConditions: z.infer<typeof FilterConditionSchema>[] = [];

  if (args.subject) {
    filterConditions.push({
      className: "string",
      fieldIdentifier: "subject",
      format: "input",
      operator: "CONTAINS",
      toValue: null,
      value: [args.subject],
    });
  }

  if (args.status) {
    const statusValues = args.status.split(",");
    const values = statusValues.map(v => v.trim());

    filterConditions.push({
      className: "status",
      fieldIdentifier: "status",
      format: "list",
      operator: "CONTAINS",
      toValue: null,
      value: values,
    });
  }

  if (args.createdAfter) {
    const createdBefore = args.createdBefore ? `${args.createdBefore} 23:59:59` : null;

    filterConditions.push({
      className: "dateTime",
      fieldIdentifier: "gmtCreate",
      format: "input",
      operator: "BETWEEN",
      toValue: createdBefore,
      value: [`${args.createdAfter} 00:00:00`],
    });
  }

  if (args.updatedAfter) {
    const updatedBefore = args.updatedBefore ? `${args.updatedBefore} 23:59:59` : null;

    filterConditions.push({
      className: "dateTime",
      fieldIdentifier: "gmtModified",
      format: "input",
      operator: "BETWEEN",
      toValue: updatedBefore,
      value: [`${args.updatedAfter} 00:00:00`],
    })
  }

  if (args.creator) {
    const creatorValues = args.creator.split(",");
    const values = creatorValues.map(v => v.trim());

    filterConditions.push({
      className: "user",
      fieldIdentifier: "creator",
      format: "list",
      operator: "CONTAINS",
      toValue: null,
      value: values,
    });
  }

  if (args.assignedTo) {
    const assignedToValues = args.assignedTo.split(",");
    const values = assignedToValues.map(v => v.trim());

    filterConditions.push({
      className: "user",
      fieldIdentifier: "assignedTo",
      format: "list",
      operator: "CONTAINS",
      toValue: null,
      value: values,
    });
  }

  if (filterConditions.length === 0) {
    return undefined;
  }

  const conditions: z.infer<typeof ConditionsSchema> = {
    conditionGroups: [filterConditions],
  };

  return JSON.stringify(conditions);
} 

export async function createWorkItemFunc(
    organizationId: string,
    assignedTo: string,
    spaceId: string,
    subject: string,
    workitemTypeId: string,
    customFieldValues?: RecordType<string, string> | undefined,
    description?: string | undefined,
    labels?: string[],
    parentId?: string | undefined,
    participants?: string[] | undefined,
    sprint?: string | undefined,
    trackers?: string[] | undefined,
    verifier?: string | undefined,
    versions?: string[] | undefined
): Promise<z.infer<typeof WorkItemSchema>> {
  const url = `/oapi/v1/projex/organizations/${organizationId}/workitems`;

  const payload: Record<string, any> = {
    assignedTo,
    spaceId,
    subject,
    workitemTypeId
  };

  if (customFieldValues) {
    payload.customFieldValues = customFieldValues;
  }

  if (description !== undefined) {
    payload.description = description;
  }

  if (labels && labels.length > 0) {
    payload.labels = labels;
  }

  if (parentId !== undefined) {
    payload.parentId = parentId;
  }

  if (participants && participants.length > 0) {
    payload.participants = participants;
  }

  if (sprint !== undefined) {
    payload.sprint = sprint;
  }

  if (trackers && trackers.length > 0) {
    payload.trackers = trackers;
  }

  if (verifier !== undefined) {
    payload.verifier = verifier;
  }

  if (versions && versions.length > 0) {
    payload.versions = versions;
  }

  const response = await yunxiaoRequest(url, {
    method: "POST",
    body: payload,
  });

  return WorkItemSchema.parse(response);
}

export async function getWorkItemTypesFunc(
  organizationId: string,
  id: string, // 项目唯一标识
  category: string // 工作项类型，可选值为 Req，Bug，Task 等。
): Promise<WorkItemType[]> {
  const url = `/oapi/v1/projex/organizations/${organizationId}/projects/${id}/workitemTypes?category=${encodeURIComponent(category)}`;

  const response = await yunxiaoRequest(url, {
    method: "GET",
  });

  return response as WorkItemType[];
}
