#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

import * as branches from './operations/codeup/branches.js';
import * as files from './operations/codeup/files.js';
import * as repositories from './operations/codeup/repositories.js';
import * as changeRequests from './operations/codeup/changeRequests.js';
import * as changeRequestComments from './operations/codeup/changeRequestComments.js';
import * as organization from './operations/organization/organization.js';
import * as project from './operations/projex/project.js';
import * as workitem from './operations/projex/workitem.js';
import * as compare from './operations/codeup/compare.js'
import * as pipeline from './operations/flow/pipeline.js'
import * as pipelineJob from './operations/flow/pipelineJob.js'
import * as serviceConnection from './operations/flow/serviceConnection.js'
import * as packageRepositories from './operations/packages/repositories.js'
import * as artifacts from './operations/packages/artifacts.js'
import {
    isYunxiaoError,
    YunxiaoError,
    YunxiaoValidationError
} from "./common/errors.js";
import { VERSION } from "./common/version.js";
import {config} from "dotenv";
import * as types from "./common/types.js";


const server = new Server(
    {
        name: "alibabacloud-devops-mcp-server",
        version: VERSION,
    },
    {
        capabilities: {
            tools: {},
        },
    }
);

function formatYunxiaoError(error: YunxiaoError): string {
    let message = `Yunxiao API Error: ${error.message}`;

    if (error instanceof YunxiaoValidationError) {
        message = `Parameter validation failed: ${error.message}`;
        if (error.response) {
            message += `\n errorMessage: ${JSON.stringify(error.response, null, 2)}`;
        }
        // 添加常见参数错误的提示
        if (error.message.includes('name')) {
            message += `\n Suggestion: Please check whether the pipeline name meets the requirements.`;
        }
        if (error.message.includes('content') || error.message.includes('yaml')) {
            message += `\n Suggestion: Please check whether the generated YAML format is correct.`;
        }
    } else {
        // 处理通用的Yunxiao错误
        message = `Yunxiao API error (${error.status}): ${error.message}`;
        if (error.response) {
            const response = error.response as any;
            if (response.errorCode) {
                message += `\n errorCode: ${response.errorCode}`;
            }
            if (response.errorMessage && response.errorMessage !== error.message) {
                message += `\n errorMessage: ${response.errorMessage}`;
            }
            if (response.data && typeof response.data === 'object') {
                message += `\n data: ${JSON.stringify(response.data, null, 2)}`;
            }
        }
        
        // 根据状态码提供通用建议
        switch (error.status) {
            case 400:
                message += `\n Suggestion: Please check whether the request parameters are correct, especially whether all required parameters have been provided.`;
                break;
            case 500:
                message += `\n Suggestion: Internal server error. Please try again later or contact technical support.`;
                break;
            case 502:
            case 503:
            case 504:
                message += `\n Suggestion: The service is temporarily unavailable. Please try again later.`;
                break;
        }
    }

    return message;
}

server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            // Branch Operations
            {
                name: "create_branch",
                description: "[Code Management] Create a new branch in a Codeup repository",
                inputSchema: zodToJsonSchema(types.CreateBranchSchema),
            },
            {
                name: "get_branch",
                description: "[Code Management] Get information about a branch in a Codeup repository",
                inputSchema: zodToJsonSchema(types.GetBranchSchema),
            },
            {
                name: "delete_branch",
                description: "[Code Management] Delete a branch from a Codeup repository",
                inputSchema: zodToJsonSchema(types.DeleteBranchSchema),
            },
            {
                name: "list_branches",
                description: "[Code Management] List branches in a Codeup repository",
                inputSchema: zodToJsonSchema(types.ListBranchesSchema),
            },

            // File Operations
            {
                name: "get_file_blobs",
                description: "[Code Management] Get file content from a Codeup repository",
                inputSchema: zodToJsonSchema(types.GetFileBlobsSchema),
            },
            {
                name: "create_file",
                description: "[Code Management] Create a new file in a Codeup repository",
                inputSchema: zodToJsonSchema(types.CreateFileSchema),
            },
            {
                name: "update_file",
                description: "[Code Management] Update an existing file in a Codeup repository",
                inputSchema: zodToJsonSchema(types.UpdateFileSchema),
            },
            {
                name: "delete_file",
                description: "[Code Management] Delete a file from a Codeup repository",
                inputSchema: zodToJsonSchema(types.DeleteFileSchema),
            },
            {
                name: "compare",
                description: "[Code Management] Query code to compare content",
                inputSchema: zodToJsonSchema(types.GetCompareSchema),
            },

            // Repository Operations
            {
                name: "get_repository",
                description: "[Code Management] Get information about a Codeup repository",
                inputSchema: zodToJsonSchema(types.GetRepositorySchema),
            },
            {
                name: "list_repositories",
                description: "[Code Management] Get the CodeUp Repository List.\n" +
                    "\n" +
                    "A Repository serves as a unit for managing source code and is distinct from a Project.\n" +
                    "\n" +
                    "Use Case:\n" +
                    "\n" +
                    "View my repositories",
                inputSchema: zodToJsonSchema(types.ListRepositoriesSchema),
            },

            // Change Request Operations
            {
                name: "get_change_request",
                description: "[Code Management] Get information about a change request",
                inputSchema: zodToJsonSchema(types.GetChangeRequestSchema),
            },
            {
                name: "list_change_requests",
                description: "[Code Management] List change requests",
                inputSchema: zodToJsonSchema(types.ListChangeRequestsSchema),
            },
            {
                name: "create_change_request",
                description: "[Code Management] Create a new change request",
                inputSchema: zodToJsonSchema(types.CreateChangeRequestSchema),
            },
            {
                name: "create_change_request_comment",
                description: "[Code Management] Create a comment on a change request",
                inputSchema: zodToJsonSchema(types.CreateChangeRequestCommentSchema),
            },
            {
                name: "list_change_request_comments",
                description: "[Code Management] List comments on a change request",
                inputSchema: zodToJsonSchema(types.ListChangeRequestCommentsSchema),
            },
            {
                name: "list_change_request_patch_sets",
                description: "[Code Management] List patch sets for a change request",
                inputSchema: zodToJsonSchema(types.ListChangeRequestPatchSetsSchema),
            },

            // Organization Operations
            {
                name: "get_current_organization_info",
                description: "Get information about the current user and organization based on the token. In the absence of an explicitly specified organization ID, this result will take precedence.",
                inputSchema: zodToJsonSchema(z.object({})),
            },
            {
                name: "get_user_organizations",
                description: "Get the list of organizations the current user belongs to",
                inputSchema: zodToJsonSchema(z.object({})),
            },
            {
                name: "get_current_user",
                description: "Get information about the current user based on the token. In the absence of an explicitly specified user ID, this result will take precedence.",
                inputSchema: zodToJsonSchema(z.object({})),
            },

            // Project Operations
            {
                name: "get_project",
                description: "[Project Management] Get information about a Yunxiao project",
                inputSchema: zodToJsonSchema(types.GetProjectSchema),
            },
            {
                name: "search_projects",
                description: "[Project Management] Search for Yunxiao Project List. A Project is a project management unit that includes work items and sprints, and it is different from a code repository (Repository).\n" +
                    "\n" +
                    "Use Cases:\n" +
                    "\n" +
                    "Query projects I am involved in\n" +
                    "Query projects I have created",
                inputSchema: zodToJsonSchema(types.SearchProjectsSchema),
            },

            // Sprint Operations
            // {
            //     name: "get_sprint",
            //     description: "Get information about a sprint",
            //     inputSchema: zodToJsonSchema(sprint.GetSprintSchema),
            // },
            // {
            //     name: "list_sprints",
            //     description: "List sprints in a project",
            //     inputSchema: zodToJsonSchema(sprint.ListSprintsSchema),
            // },

            // Work Item Operations
            {
                name: "get_work_item",
                description: "[Project Management] Get information about a work item",
                inputSchema: zodToJsonSchema(types.GetWorkItemSchema),
            },
            {
                name: "create_work_item",
                description: "[Project Management] Create a work item",
                inputSchema: zodToJsonSchema(types.CreateWorkItemSchema),
            },
            {
                name: "search_workitems",
                description: "[Project Management] Search work items with various filter conditions",
                inputSchema: zodToJsonSchema(types.SearchWorkitemsSchema),
            },
            {
                name: "get_work_item_types",
                description: "[Project Management] Get the list of work item types for a project",
                inputSchema: zodToJsonSchema(z.object({
                    organizationId: z.string().describe("Organization ID"),
                    id: z.string().describe("Project unique identifier"),
                    category: z.string().describe("Work item type category, optional values: Req, Bug, Task, etc.")
                })),
            },

            // Pipeline Operations
            {
                name: "get_pipeline",
                description: "[Pipeline Management] Get details of a specific pipeline in an organization",
                inputSchema: zodToJsonSchema(types.GetPipelineSchema),
            },
            {
                name: "list_pipelines",
                description: "[Pipeline Management] Get a list of pipelines in an organization with filtering options",
                inputSchema: zodToJsonSchema(types.ListPipelinesSchema),
            },
            {
                name: "generate_pipeline_yaml",
                description: "[Pipeline Management] Generate only the YAML configuration for a pipeline without creating it.\n\n" +
                    "**📋 Use Cases:**\n" +
                    "- Preview YAML before creating pipeline\n" +
                    "- Generate YAML for manual deployment\n" +
                    "- Debug pipeline configuration\n\n" +
                    "**📖 Recommended Workflow:**\n" +
                    "1. 🎯 Parse user description for explicit parameters\n" +
                    "2. 🔍 If missing context, prefer IDE detection (terminal + file reading) over API calls\n" +
                    "3. 🚀 Call this tool with collected parameters\n\n" +
                    "**💡 Parameter Collection Strategy:**\n" +
                    "- For QUICK pipeline creation: Use IDE detection (git config, file reading)\n" +
                    "- For PRECISE parameter selection: Consider list_repositories, list_service_connections when needed\n" +
                    "- Balance efficiency vs. accuracy based on user intent\n\n" +
                    "**⚡ Built-in capabilities:** Handles default service connections internally, auto-extracts project name from repo URL",
                inputSchema: zodToJsonSchema(types.CreatePipelineFromDescriptionSchema),
            },
            {
                name: "create_pipeline_from_description",
                description: "[Pipeline Management] Create a pipeline using structured parameters extracted from user descriptions and environment context.\n\n" +
                    "**🔧 Built-in Capabilities:**\n" +
                    "- ✅ Automatically retrieves default service connection IDs when not specified\n" +
                    "- ✅ Handles repository and service connection logic internally\n" +
                    "- ✅ Auto-extracts project name from repository URL (git@host:org/repo.git → repo)\n" +
                    "- ✅ Supports both IDE detection and explicit parameter specification\n\n" +
                    "**📖 Flexible Workflow Options:**\n" +
                    "1. 🎯 PARSE user description for explicit parameters\n" +
                    "2. 🔍 GATHER missing info using appropriate method:\n" +
                    "   - QUICK: IDE detection (git config, file reading) - recommended for most cases\n" +
                    "   - PRECISE: API calls (list_repositories, list_service_connections) when user needs specific selection\n" +
                    "3. 🚀 CALL this tool with collected parameters\n\n" +
                    "**🎯 Parameter Priority:**\n" +
                    "1. 👤 USER EXPLICIT (highest) - buildLanguage, buildTool, versions, deployTarget\n" +
                    "2. 🔍 CONTEXT DETECTION (flexible) - repoUrl, branch, serviceName, tech stack\n" +
                    "3. 🤖 TOOL DEFAULTS (automatic) - serviceConnectionId, organizationId\n\n" +
                    "**🔍 IDE Detection Rules (efficient for most cases):**\n" +
                    "- 📂 Repository: `git config --get remote.origin.url` → repoUrl\n" +
                    "- 🌿 Branch: `git branch --show-current` → branch\n" +
                    "- 🏷️ Service Name: Auto-extracted from repoUrl (git@host:org/repo.git → repo)\n" +
                    "- ☕ Java Maven: pom.xml exists → buildLanguage='java', buildTool='maven'\n" +
                    "- 🏗️ Java Gradle: build.gradle exists → buildLanguage='java', buildTool='gradle'\n" +
                    "- 🟢 Node npm: package.json + package-lock.json → buildLanguage='nodejs', buildTool='npm'\n" +
                    "- 🧶 Node yarn: package.json + yarn.lock → buildLanguage='nodejs', buildTool='yarn'\n" +
                    "- 🐍 Python: requirements.txt → buildLanguage='python', buildTool='pip'\n" +
                    "- 🐹 Go: go.mod → buildLanguage='go', buildTool='go'\n" +
                    "- 💙 .NET: *.csproj → buildLanguage='dotnet', buildTool='dotnet'\n\n" +
                    "**📝 Version Detection (from project files):**\n" +
                    "- ☕ JDK: Read pom.xml <maven.compiler.source> → jdkVersion\n" +
                    "- 🟢 Node: Read package.json engines.node → nodeVersion\n" +
                    "- 🐍 Python: Read .python-version, pyproject.toml → pythonVersion\n" +
                    "- 🐹 Go: Read go.mod go directive → goVersion\n\n" +
                    "**🎯 Deployment Parsing:**\n" +
                    "- '部署到主机/VM/虚拟机' → deployTarget='vm'\n" +
                    "- '部署到Kubernetes/K8s' → deployTarget='k8s'\n" +
                    "- '只构建/构建制品' → deployTarget='none'\n\n" +
                    "**🔗 Service Connection Strategy (3 scenarios):**\n" +
                    "1. **User specifies ID explicitly** (e.g., '使用服务连接ID abc123')\n" +
                    "   → ✅ Pass serviceConnectionId=abc123 directly, NO list_service_connections call needed\n" +
                    "2. **User doesn't specify any ID** (most common case)\n" +
                    "   → ✅ Pass serviceConnectionId=null, tool will auto-retrieve default ID internally\n" +
                    "3. **User wants to choose from available options** (e.g., '显示可用的服务连接让我选择')\n" +
                    "   → 🔍 Call list_service_connections first, then let user choose, then create pipeline\n\n" +
                    "**🤔 When to Use Other Tools:**\n" +
                    "- User asks to \"select from available repositories\" → use list_repositories first\n" +
                    "- User wants to \"choose from service connections\" → use list_service_connections first\n" +
                    "- User wants to see options before deciding → gather info first, then create\n" +
                    "- For quick creation with current repo → directly use IDE detection\n\n" +
                    "**✅ Required:** organizationId, name, buildLanguage, buildTool",
                inputSchema: zodToJsonSchema(types.CreatePipelineFromDescriptionSchema),
            },
            {
                name: "smart_list_pipelines",
                description: "[Pipeline Management] Intelligently search pipelines with natural language time references (e.g., 'today', 'this week')",
                inputSchema: zodToJsonSchema(
                    z.object({
                        organizationId: z.string().describe("Organization ID"),
                        timeReference: z.string().optional().describe("Natural language time reference such as 'today', 'yesterday', 'this week', 'last month', etc."),
                        pipelineName: z.string().optional().describe("Pipeline name filter"),
                        statusList: z.string().optional().describe("Pipeline status list, comma separated (SUCCESS,RUNNING,FAIL,CANCELED,WAITING)"),
                        perPage: z.number().int().min(1).max(30).default(10).optional().describe("Number of items per page"),
                        page: z.number().int().min(1).default(1).optional().describe("Page number")
                    })
                ),
            },
            {
                name: "create_pipeline_run",
                description: "[Pipeline Management] Run a pipeline with optional parameters",
                inputSchema: zodToJsonSchema(types.CreatePipelineRunSchema),
            },
            {
                name: "get_latest_pipeline_run",
                description: "[Pipeline Management] Get information about the latest pipeline run",
                inputSchema: zodToJsonSchema(types.GetLatestPipelineRunSchema),
            },
            {
                name: "get_pipeline_run",
                description: "[Pipeline Management] Get details of a specific pipeline run instance",
                inputSchema: zodToJsonSchema(types.GetPipelineRunSchema),
            },
            {
                name: "list_pipeline_runs",
                description: "[Pipeline Management] Get a list of pipeline run instances with filtering options",
                inputSchema: zodToJsonSchema(types.ListPipelineRunsSchema),
            },
            {
                name: "list_pipeline_jobs_by_category",
                description: "[Pipeline Management] Get pipeline execution tasks by category. Currently only supports DEPLOY category.",
                inputSchema: zodToJsonSchema(types.ListPipelineJobsByCategorySchema),
            },
            {
                name: "list_pipeline_job_historys",
                description: "[Pipeline Management] Get the execution history of a pipeline task. Retrieve all execution records for a specific task in a pipeline.",
                inputSchema: zodToJsonSchema(types.ListPipelineJobHistorysSchema),
            },
            {
                name: "execute_pipeline_job_run",
                description: "[Pipeline Management] Manually run a pipeline task. Start a specific job in a pipeline run instance.",
                inputSchema: zodToJsonSchema(types.ExecutePipelineJobRunSchema),
            },
            {
                name: "get_pipeline_job_run_log",
                description: "[Pipeline Management] Get the execution logs of a pipeline job. Retrieve the log content for a specific job in a pipeline run.",
                inputSchema: zodToJsonSchema(types.GetPipelineJobRunLogSchema),
            },
            
            // Package Repository Operations
            {
                name: "list_package_repositories",
                description: "[Packages Management] List package repositories in an organization with filtering options",
                inputSchema: zodToJsonSchema(types.ListPackageRepositoriesSchema),
            },
            
            // Package Artifact Operations
            {
                name: "list_artifacts",
                description: "[Packages Management] List artifacts in a package repository with filtering options",
                inputSchema: zodToJsonSchema(types.ListArtifactsSchema),
            },
            {
                name: "get_artifact",
                description: "[Packages Management] Get information about a single artifact in a package repository",
                inputSchema: zodToJsonSchema(types.GetArtifactSchema),
            },

            // Service Connection Operations
            {
                name: "list_service_connections",
                description: "[Service Connection Management] List service connections in an organization with filtering options",
                inputSchema: zodToJsonSchema(types.ListServiceConnectionsSchema),
            }
        ],
    };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
    try {
        if (!request.params.arguments) {
            throw new Error("Arguments are required");
        }

        switch (request.params.name) {
            // Branch Operations
            case "create_branch": {
                const args = types.CreateBranchSchema.parse(request.params.arguments);
                const branch = await branches.createBranchFunc(
                    args.organizationId,
                    args.repositoryId,
                    args.branch,
                    args.ref
                );
                return {
                    content: [{ type: "text", text: JSON.stringify(branch, null, 2) }],
                };
            }

            case "get_branch": {
                const args = types.GetBranchSchema.parse(request.params.arguments);
                const branch = await branches.getBranchFunc(
                    args.organizationId,
                    args.repositoryId,
                    args.branchName
                );
                return {
                    content: [{ type: "text", text: JSON.stringify(branch, null, 2) }],
                };
            }

            case "delete_branch": {
                const args = types.DeleteBranchSchema.parse(request.params.arguments);
                const result = await branches.deleteBranchFunc(
                    args.organizationId,
                    args.repositoryId,
                    args.branchName
                );
                return {
                    content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
                };
            }

            case "list_branches": {
                const args = types.ListBranchesSchema.parse(request.params.arguments);
                const branchList = await branches.listBranchesFunc(
                    args.organizationId,
                    args.repositoryId,
                    args.page,
                    args.perPage,
                    args.sort,
                    args.search ?? undefined
                );
                return {
                    content: [{ type: "text", text: JSON.stringify(branchList, null, 2) }],
                };
            }

            // File Operations
            case "get_file_blobs": {
                const args = types.GetFileBlobsSchema.parse(request.params.arguments);
                const fileContent = await files.getFileBlobsFunc(
                    args.organizationId,
                    args.repositoryId,
                    args.filePath,
                    args.ref
                );
                return {
                    content: [{ type: "text", text: JSON.stringify(fileContent, null, 2) }],
                };
            }

            case "create_file": {
                const args = types.CreateFileSchema.parse(request.params.arguments);
                const result = await files.createFileFunc(
                    args.organizationId,
                    args.repositoryId,
                    args.filePath,
                    args.content,
                    args.commitMessage,
                    args.branch,
                    args.encoding
                );
                return {
                    content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
                };
            }

            case "update_file": {
                const args = types.UpdateFileSchema.parse(request.params.arguments);
                const result = await files.updateFileFunc(
                    args.organizationId,
                    args.repositoryId,
                    args.filePath,
                    args.content,
                    args.commitMessage,
                    args.branch,
                    args.encoding
                );
                return {
                    content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
                };
            }

            case "delete_file": {
                const args = types.DeleteFileSchema.parse(request.params.arguments);
                const result = await files.deleteFileFunc(
                    args.organizationId,
                    args.repositoryId,
                    args.filePath,
                    args.commitMessage,
                    args.branch
                );
                return {
                    content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
                };
            }

            case "list_files": {
                const args = types.ListFilesSchema.parse(request.params.arguments);
                const fileList = await files.listFilesFunc(
                    args.organizationId,
                    args.repositoryId,
                    args.path,
                    args.ref,
                    args.type
                );
                return {
                    content: [{ type: "text", text: JSON.stringify(fileList, null, 2) }],
                };
            }

            case "compare": {
                const args = types.GetCompareSchema.parse(request.params.arguments);
                const compareResult = await compare.getCompareFunc(
                    args.organizationId,
                    args.repositoryId,
                    args.from,
                    args.to,
                    args.sourceType ?? undefined,
                    args.targetType ?? undefined,
                    args.straight ?? undefined
                );

                return {
                    content: [{ type: "text", text: JSON.stringify(compareResult, null, 2) }],
                };
            }

            // Repository Operations
            case "get_repository": {
                const args = types.GetRepositorySchema.parse(request.params.arguments);
                const repository = await repositories.getRepositoryFunc(
                    args.organizationId,
                    args.repositoryId
                );
                return {
                    content: [{ type: "text", text: JSON.stringify(repository, null, 2) }],
                };
            }

            case "list_repositories": {
                const args = types.ListRepositoriesSchema.parse(request.params.arguments);
                const repositoryList = await repositories.listRepositoriesFunc(
                    args.organizationId,
                    args.page,
                    args.perPage,
                    args.orderBy,
                    args.sort,
                    args.search ?? undefined,
                    args.archived
                );
                return {
                    content: [{ type: "text", text: JSON.stringify(repositoryList, null, 2) }],
                };
            }

            // Change Request Operations
            case "get_change_request": {
                const args = types.GetChangeRequestSchema.parse(request.params.arguments);
                const changeRequest = await changeRequests.getChangeRequestFunc(
                    args.organizationId,
                    args.repositoryId,
                    args.localId
                );
                return {
                    content: [{ type: "text", text: JSON.stringify(changeRequest, null, 2) }],
                };
            }

            case "list_change_requests": {
                const args = types.ListChangeRequestsSchema.parse(request.params.arguments);
                const changeRequestList = await changeRequests.listChangeRequestsFunc(
                    args.organizationId,
                    args.page,
                    args.perPage,
                    args.projectIds ?? undefined,
                    args.authorIds ?? undefined,
                    args.reviewerIds ?? undefined,
                    args.state ?? undefined,
                    args.search ?? undefined,
                    args.orderBy,
                    args.sort,
                    args.createdBefore ?? undefined,
                    args.createdAfter ?? undefined
                );
                return {
                    content: [{ type: "text", text: JSON.stringify(changeRequestList, null, 2) }],
                };
            }

            case "create_change_request": {
                const args = types.CreateChangeRequestSchema.parse(request.params.arguments);
                const changeRequest = await changeRequests.createChangeRequestFunc(
                    args.organizationId,
                    args.repositoryId,
                    args.title,
                    args.sourceBranch,
                    args.targetBranch,
                    args.description ?? undefined,
                    args.sourceProjectId,
                    args.targetProjectId,
                    args.reviewerUserIds ?? undefined,
                    args.workItemIds ?? undefined,
                    args.createFrom
                );
                return {
                    content: [{ type: "text", text: JSON.stringify(changeRequest, null, 2) }],
                };
            }

            case "create_change_request_comment": {
                const args = types.CreateChangeRequestCommentSchema.parse(request.params.arguments);
                const comment = await changeRequestComments.createChangeRequestCommentFunc(
                    args.organizationId,
                    args.repositoryId,
                    args.localId,
                    args.comment_type,
                    args.content,
                    args.draft,
                    args.resolved,
                    args.patchset_biz_id,
                    args.file_path ?? undefined,
                    args.line_number ?? undefined,
                    args.from_patchset_biz_id ?? undefined,
                    args.to_patchset_biz_id ?? undefined,
                    args.parent_comment_biz_id ?? undefined
                );
                return {
                    content: [{ type: "text", text: JSON.stringify(comment, null, 2) }],
                };
            }

            case "list_change_request_comments": {
                const args = types.ListChangeRequestCommentsSchema.parse(request.params.arguments);
                const comments = await changeRequestComments.listChangeRequestCommentsFunc(
                    args.organizationId,
                    args.repositoryId,
                    args.localId,
                    args.patchSetBizIds ?? undefined,
                    args.commentType,
                    args.state,
                    args.resolved,
                    args.filePath ?? undefined
                );
                return {
                    content: [{ type: "text", text: JSON.stringify(comments, null, 2) }],
                };
            }

            case "list_change_request_patch_sets": {
                const args = types.ListChangeRequestPatchSetsSchema.parse(request.params.arguments);
                const patchSets = await changeRequests.listChangeRequestPatchSetsFunc(
                    args.organizationId,
                    args.repositoryId,
                    args.localId
                );

                return {
                    content: [{ type: "text", text: JSON.stringify(patchSets, null, 2) }],
                };
            }

            // Organization Operations
            case "get_current_organization_info": {
                const currentOrgInfo = await organization.getCurrentOrganizationInfoFunc();
                return {
                    content: [{ type: "text", text: JSON.stringify(currentOrgInfo, null, 2) }],
                };
            }

            case "get_user_organizations": {
                const userOrgs = await organization.getUserOrganizationsFunc();
                return {
                    content: [{ type: "text", text: JSON.stringify(userOrgs, null, 2) }],
                };
            }

            case "get_current_user": {
                const currentUserInfo = await organization.getCurrentUserFunc();
                return {
                    content: [{ type: "text", text: JSON.stringify(currentUserInfo, null, 2) }],
                };
            }

            // Project Operations
            case "get_project": {
                const args = types.GetProjectSchema.parse(request.params.arguments);
                const projectInfo = await project.getProjectFunc(
                    args.organizationId,
                    args.id
                );
                return {
                    content: [{ type: "text", text: JSON.stringify(projectInfo, null, 2) }],
                };
            }

            case "search_projects": {
                const args = types.SearchProjectsSchema.parse(request.params.arguments);
                const projects = await project.searchProjectsFunc(
                    args.organizationId,
                    args.name ?? undefined,
                    args.status ?? undefined,
                    args.createdAfter ?? undefined,
                    args.createdBefore ?? undefined,
                    args.creator ?? undefined,
                    args.adminUserId ?? undefined,
                    args.logicalStatus ?? undefined,
                    args.advancedConditions ?? undefined,
                    args.extraConditions ?? undefined,
                    args.orderBy,
                    args.page,
                    args.perPage,
                    args.sort,
                    args.scenarioFilter ?? undefined,
                    args.userId ?? undefined,
                );
                return {
                    content: [{ type: "text", text: JSON.stringify(projects, null, 2) }],
                };
            }

            // Sprint Operations
            // case "get_sprint": {
            //     const args = sprint.GetSprintSchema.parse(request.params.arguments);
            //     const sprintInfo = await sprint.getSprintFunc(
            //         args.organizationId,
            //         args.projectId,
            //         args.id
            //     );
            //     return {
            //         content: [{ type: "text", text: JSON.stringify(sprintInfo, null, 2) }],
            //     };
            // }

            // case "list_sprints": {
            //     const args = sprint.ListSprintsSchema.parse(request.params.arguments);
            //     const sprints = await sprint.listSprintsFunc(
            //         args.organizationId,
            //         args.id,
            //         args.status,
            //         args.page,
            //         args.perPage
            //     );
            //     return {
            //         content: [{ type: "text", text: JSON.stringify(sprints, null, 2) }],
            //     };
            // }

            // Work Item Operations
            case "get_work_item": {
                const args = types.GetWorkItemSchema.parse(request.params.arguments);
                const workItemInfo = await workitem.getWorkItemFunc(
                    args.organizationId,
                    args.workItemId
                );
                return {
                    content: [{ type: "text", text: JSON.stringify(workItemInfo, null, 2) }],
                };
            }

            case "create_work_item": {
                const args = types.CreateWorkItemSchema.parse(request.params.arguments);
                const workItemInfo = await workitem.createWorkItemFunc(args.organizationId, args.assignedTo, args.spaceId, args.subject, args.workitemTypeId, args.customFieldValues, args.description, args.labels, args.parentId, args.participants, args.sprint, args.trackers, args.verifier, args.versions);
                return {
                    content: [{ type: "text", text: JSON.stringify(workItemInfo, null, 2) }],
                };
            }

            case "search_workitems": {
                const args = types.SearchWorkitemsSchema.parse(request.params.arguments);
                const workItems = await workitem.searchWorkitemsFunc(
                    args.organizationId,
                    args.category,
                    args.spaceId,
                    args.subject ?? undefined,
                    args.status ?? undefined,
                    args.createdAfter ?? undefined,
                    args.createdBefore ?? undefined,
                    args.updatedAfter ?? undefined,
                    args.updatedBefore ?? undefined,
                    args.creator ?? undefined,
                    args.assignedTo ?? undefined,
                    args.advancedConditions ?? undefined,
                    args.orderBy ?? "gmtCreate",
                    args.includeDetails ?? false
                );
                return {
                    content: [{ type: "text", text: JSON.stringify(workItems, null, 2) }],
                };
            }

            case "get_work_item_types": {
                const args = z.object({
                    organizationId: z.string().describe("organization id"),
                    id: z.string().describe("project id or space id"),
                    category: z.string().describe("Req、Task、Bug etc.")
                }).parse(request.params.arguments);
                
                const workItemTypes = await workitem.getWorkItemTypesFunc(
                    args.organizationId,
                    args.id,
                    args.category
                );
                
                return {
                    content: [{ type: "text", text: JSON.stringify(workItemTypes, null, 2) }],
                };
            }

            // Pipeline Operations
            case "get_pipeline": {
                const args = types.GetPipelineSchema.parse(request.params.arguments);
                const pipelineInfo = await pipeline.getPipelineFunc(
                    args.organizationId,
                    args.pipelineId
                );
                return {
                    content: [{ type: "text", text: JSON.stringify(pipelineInfo, null, 2) }],
                };
            }

            case "list_pipelines": {
                const args = types.ListPipelinesSchema.parse(request.params.arguments);
                const pipelines = await pipeline.listPipelinesFunc(
                    args.organizationId,
                    {
                        createStartTime: args.createStartTime,
                        createEndTime: args.createEndTime,
                        executeStartTime: args.executeStartTime,
                        executeEndTime: args.executeEndTime,
                        pipelineName: args.pipelineName,
                        statusList: args.statusList,
                        perPage: args.perPage,
                        page: args.page
                    }
                );
                return {
                    content: [{ type: "text", text: JSON.stringify(pipelines, null, 2) }],
                };
            }

            case "generate_pipeline_yaml": {
                try {
                    const args = types.CreatePipelineFromDescriptionSchema.parse(request.params.arguments);
                    
                    // 检查必需的参数
                    if (!args.buildLanguage) {
                        throw new Error("The build language parameter is missing.");
                    }
                    if (!args.buildTool) {
                        throw new Error("The build tool parameter is missing.");
                    }
                    
                    const yamlContent = await pipeline.generatePipelineYamlFunc({
                        buildLanguage: args.buildLanguage,
                        buildTool: args.buildTool,
                        deployTarget: args.deployTarget,
                        
                        // Repository configuration  
                        repoUrl: args.repoUrl,
                        branch: args.branch,
                        serviceName: args.serviceName,
                        serviceConnectionId: args.serviceConnectionId,
                        
                        // Version configuration
                        jdkVersion: args.jdkVersion,
                        mavenVersion: args.mavenVersion,
                        nodeVersion: args.nodeVersion,
                        pythonVersion: args.pythonVersion,
                        goVersion: args.goVersion,
                        
                        // Build configuration
                        buildCommand: args.buildCommand,
                        testCommand: args.testCommand,
                        
                        // Artifact upload configuration
                        uploadType: args.uploadType,
                        packagesServiceConnection: args.packagesServiceConnection,
                        artifactName: args.artifactName,
                        artifactVersion: args.artifactVersion,
                        packagesRepoId: args.packagesRepoId,
                        includePathInArtifact: args.includePathInArtifact,
                        
                        // VM deployment configuration
                        machineGroupId: args.machineGroupId,
                        executeUser: args.executeUser,
                        artifactDownloadPath: args.artifactDownloadPath,
                        deployCommand: args.deployCommand,
                        pauseStrategy: args.pauseStrategy,
                        batchNumber: args.batchNumber,
                        
                        // Kubernetes deployment configuration
                        kubernetesClusterId: args.kubernetesClusterId,
                        kubectlVersion: args.kubectlVersion,
                        namespace: args.namespace,
                        yamlPath: args.yamlPath,
                        dockerImage: args.dockerImage,
                    });
                    
                    return {
                        content: [{ type: "text", text: yamlContent }],
                    };
                } catch (error) {
                    if (error instanceof Error && error.message.includes("build language parameter is missing")) {
                        throw error; // 重新抛出我们自定义的错误
                    }
                    if (error instanceof Error && error.message.includes("build tool parameter is missing")) {
                        throw error; // 重新抛出我们自定义的错误
                    }
                    
                    // 处理YAML生成过程中的错误
                    if (error instanceof Error) {
                        throw new Error(`YAML generation failed: ${error.message}`);
                    }
                    throw error;
                }
            }

            case "create_pipeline_from_description": {
                try {
                    const args = types.CreatePipelineFromDescriptionSchema.parse(request.params.arguments);
                    
                    // 检查必需的参数
                    if (!args.name) {
                        throw new Error("The Pipeline name cannot be empty.");
                    }
                    if (!args.buildLanguage) {
                        throw new Error("The build language parameter is missing.");
                    }
                    if (!args.buildTool) {
                        throw new Error("The build tool parameter is missing.");
                    }
                    
                    const result = await pipeline.createPipelineWithOptionsFunc(
                        args.organizationId,
                        {
                            name: args.name,
                            repoUrl: args.repoUrl,
                            branch: args.branch,
                            serviceConnectionId: args.serviceConnectionId,
                            
                            // 技术栈参数
                            buildLanguage: args.buildLanguage,
                            buildTool: args.buildTool,
                            deployTarget: args.deployTarget,
                            
                            // 版本相关参数
                            jdkVersion: args.jdkVersion,
                            mavenVersion: args.mavenVersion,
                            nodeVersion: args.nodeVersion,
                            pythonVersion: args.pythonVersion,
                            goVersion: args.goVersion,
                            kubectlVersion: args.kubectlVersion,
                            
                            // 构建物上传相关参数
                            uploadType: args.uploadType,
                            artifactName: args.artifactName,
                            artifactVersion: args.artifactVersion,
                            packagesServiceConnection:  args.packagesServiceConnection,
                            packagesRepoId: args.packagesRepoId,
                            includePathInArtifact: args.includePathInArtifact,
                            
                            // 部署相关参数
                            executeUser: args.executeUser,
                            artifactDownloadPath: args.artifactDownloadPath,
                            machineGroupId: args.machineGroupId,
                            pauseStrategy: args.pauseStrategy,
                            batchNumber: args.batchNumber,
                            kubernetesClusterId: args.kubernetesClusterId,
                            yamlPath: args.yamlPath,
                            namespace: args.namespace,
                            dockerImage: args.dockerImage,
                            
                            // 自定义命令
                            buildCommand: args.buildCommand,
                            testCommand: args.testCommand,
                            deployCommand: args.deployCommand,
                        }
                    );
                    return {
                        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
                    };
                } catch (error) {
                    if (error instanceof Error && error.message.includes("Pipeline name cannot be empty")) {
                        throw error;
                    }
                    if (error instanceof Error && error.message.includes("build language parameter is missing")) {
                        throw error;
                    }
                    if (error instanceof Error && error.message.includes("build language tool is missing")) {
                        throw error;
                    }
                    
                    // 处理流水线创建过程中的其他错误
                    if (error instanceof Error) {
                        throw new Error(`Create pipeline failed: ${error.message}\n Suggestion: Please check whether the organization ID, repository configuration, or other parameters are correct, and if generated YAML to check whether YAML content is invalid.`);
                    }
                    throw error;
                }
            }

            case "smart_list_pipelines": {
                // Parse arguments using the schema defined in the tool registration
                const args = z.object({
                    organizationId: z.string(),
                    timeReference: z.string().optional(),
                    pipelineName: z.string().optional(),
                    statusList: z.string().optional(),
                    perPage: z.number().int().optional(),
                    page: z.number().int().optional()
                }).parse(request.params.arguments);
                
                // Call the smart list function
                const pipelines = await pipeline.smartListPipelinesFunc(
                    args.organizationId,
                    args.timeReference,
                    {
                        pipelineName: args.pipelineName,
                        statusList: args.statusList,
                        perPage: args.perPage,
                        page: args.page
                    }
                );
                
                return {
                    content: [{ type: "text", text: JSON.stringify(pipelines, null, 2) }],
                };
            }

            case "create_pipeline_run": {
                const args = types.CreatePipelineRunSchema.parse(request.params.arguments);
                const runId = await pipeline.createPipelineRunFunc(
                    args.organizationId,
                    args.pipelineId,
                    {
                        params: args.params,
                        description: args.description,
                        branches: args.branches,
                        branchMode: args.branchMode,
                        releaseBranch: args.releaseBranch,
                        createReleaseBranch: args.createReleaseBranch,
                        environmentVariables: args.environmentVariables,
                        repositories: args.repositories
                    }
                );
                return {
                    content: [{ type: "text", text: JSON.stringify(runId, null, 2) }],
                };
            }

            case "get_latest_pipeline_run": {
                const args = types.GetLatestPipelineRunSchema.parse(request.params.arguments);
                const pipelineRun = await pipeline.getLatestPipelineRunFunc(
                    args.organizationId,
                    args.pipelineId
                );
                return {
                    content: [{ type: "text", text: JSON.stringify(pipelineRun, null, 2) }],
                };
            }

            case "get_pipeline_run": {
                const args = types.GetPipelineRunSchema.parse(request.params.arguments);
                const pipelineRun = await pipeline.getPipelineRunFunc(
                    args.organizationId,
                    args.pipelineId,
                    args.pipelineRunId
                );
                return {
                    content: [{ type: "text", text: JSON.stringify(pipelineRun, null, 2) }],
                };
            }

            case "list_pipeline_runs": {
                const args = types.ListPipelineRunsSchema.parse(request.params.arguments);
                const pipelineRuns = await pipeline.listPipelineRunsFunc(
                    args.organizationId,
                    args.pipelineId,
                    {
                        perPage: args.perPage,
                        page: args.page,
                        startTime: args.startTime,
                        endTime: args.endTime,
                        status: args.status,
                        triggerMode: args.triggerMode
                    }
                );
                return {
                    content: [{ type: "text", text: JSON.stringify(pipelineRuns, null, 2) }],
                };
            }

            case "list_pipeline_jobs_by_category": {
                const args = types.ListPipelineJobsByCategorySchema.parse(request.params.arguments);
                const jobs = await pipelineJob.listPipelineJobsByCategoryFunc(
                    args.organizationId,
                    args.pipelineId,
                    args.category
                );
                return {
                    content: [{ type: "text", text: JSON.stringify(jobs, null, 2) }],
                };
            }

            case "list_pipeline_job_historys": {
                const args = types.ListPipelineJobHistorysSchema.parse(request.params.arguments);
                const jobHistorys = await pipelineJob.listPipelineJobHistorysFunc(
                    args.organizationId,
                    args.pipelineId,
                    args.category,
                    args.identifier,
                    args.page,
                    args.perPage
                );
                return {
                    content: [{ type: "text", text: JSON.stringify(jobHistorys, null, 2) }],
                };
            }

            case "execute_pipeline_job_run": {
                const args = types.ExecutePipelineJobRunSchema.parse(request.params.arguments);
                const result = await pipelineJob.executePipelineJobRunFunc(
                    args.organizationId,
                    args.pipelineId,
                    args.pipelineRunId,
                    args.jobId
                );
                return {
                    content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
                };
            }

            case "get_pipeline_job_run_log": {
                const args = types.GetPipelineJobRunLogSchema.parse(request.params.arguments);
                const log = await pipelineJob.getPipelineJobRunLogFunc(
                    args.organizationId,
                    args.pipelineId,
                    args.pipelineRunId,
                    args.jobId
                );
                return {
                    content: [{ type: "text", text: JSON.stringify(log, null, 2) }],
                };
            }

            // Package Repository Operations
            case "list_package_repositories": {
                const args = types.ListPackageRepositoriesSchema.parse(request.params.arguments);
                const packageRepoList = await packageRepositories.listPackageRepositoriesFunc(
                    args.organizationId,
                    args.repoTypes ?? undefined,
                    args.repoCategories ?? undefined,
                    args.perPage,
                    args.page
                );
                return {
                    content: [{ type: "text", text: JSON.stringify(packageRepoList, null, 2) }],
                };
            }

            // Package Artifact Operations
            case "list_artifacts": {
                const args = types.ListArtifactsSchema.parse(request.params.arguments);
                const artifactsList = await artifacts.listArtifactsFunc(
                    args.organizationId,
                    args.repoId,
                    args.repoType,
                    args.page,
                    args.perPage,
                    args.search ?? undefined,
                    args.orderBy,
                    args.sort
                );
                return {
                    content: [{ type: "text", text: JSON.stringify(artifactsList, null, 2) }],
                };
            }
            
            case "get_artifact": {
                const args = types.GetArtifactSchema.parse(request.params.arguments);
                const artifact = await artifacts.getArtifactFunc(
                    args.organizationId,
                    args.repoId,
                    args.id,
                    args.repoType
                );
                return {
                    content: [{ type: "text", text: JSON.stringify(artifact, null, 2) }],
                };
            }

            // Service Connection Operations
            case "list_service_connections": {
                const args = types.ListServiceConnectionsSchema.parse(request.params.arguments);
                const serviceConnections = await serviceConnection.listServiceConnectionsFunc(
                    args.organizationId,
                    args.serviceConnectionType
                );
                return {
                    content: [{ type: "text", text: JSON.stringify(serviceConnections, null, 2) }],
                };
            }

            default:
                throw new Error(`Unknown tool: ${request.params.name}`);
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            throw new Error(`Invalid input: ${JSON.stringify(error.errors)}`);
        }
        if (isYunxiaoError(error)) {
            throw new Error(formatYunxiaoError(error));
        }
        throw error;
    }
});

config();

async function runServer() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Yunxiao MCP Server running on stdio");
}

runServer().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});