import * as utils from "../../common/utils.js";
import { ServiceConnectionSchema, ServiceConnection } from "../../common/types.js";

/**
 * 获取服务连接列表
 * @param organizationId 组织ID
 * @param serviceConnectionType 服务连接类型
 * @returns 服务连接列表
 */
export async function listServiceConnectionsFunc(
  organizationId: string,
  serviceConnectionType: string
): Promise<ServiceConnection[]> {
  const baseUrl = `/oapi/v1/flow/organizations/${organizationId}/serviceConnections`;
  
  // 构建查询参数
  const queryParams: Record<string, string | number | undefined> = {
    sericeConnectionType: serviceConnectionType  // 注意：API文档中拼写为 sericeConnectionType
  };

  const url = utils.buildUrl(baseUrl, queryParams);
  
  const response = await utils.yunxiaoRequest(url, {
    method: "GET",
  });

  if (!Array.isArray(response)) {
    return [];
  }

  return response.map(item => ServiceConnectionSchema.parse(item));
}
