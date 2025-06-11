import { z } from "zod";
import {yunxiaoRequest, buildUrl, handleRepositoryIdEncoding} from "../../common/utils.js";
import { 
  CompareSchema
} from "../../common/types.js";


export async function getCompareFunc(
  organizationId: string,
  repositoryId: string,
  from: string,
  to: string,
  sourceType?: string, // Possible values: branch, tag
  targetType?: string, // Possible values: branch, tag
  straight?: string
): Promise<z.infer<typeof CompareSchema>> {
  const encodedRepoId = handleRepositoryIdEncoding(repositoryId);

  const baseUrl = `/oapi/v1/codeup/organizations/${organizationId}/repositories/${encodedRepoId}/compares`;

  const queryParams: Record<string, string | undefined> = {
    from,
    to
  };
  
  if (sourceType !== undefined) {
    queryParams.sourceType = sourceType;
  }
  
  if (targetType !== undefined) {
    queryParams.targetType = targetType;
  }
  
  if (straight !== undefined) {
    queryParams.straight = straight;
  }

  const url = buildUrl(baseUrl, queryParams);

  const response = await yunxiaoRequest(url, {
    method: "GET",
  });

  return CompareSchema.parse(response);
} 