
> 注：当前项目为 Serverless Devs 应用，由于应用中会存在需要初始化才可运行的变量（例如应用部署地区、函数名等等），所以**不推荐**直接 Clone 本仓库到本地进行部署或直接复制 s.yaml 使用，**强烈推荐**通过 `s init ${模版名称}` 的方法或应用中心进行初始化，详情可参考[部署 & 体验](#部署--体验) 。

# fcai-start-mcp-todoist 帮助文档

<description>

Todoist MCP Server

</description>


## 资源准备

使用该项目，您需要有开通以下服务并拥有对应权限：

<service>



| 服务/业务 |  权限  | 相关文档 |
| --- |  --- | --- |
| 函数计算 |  AliyunFCFullAccess | [帮助文档](https://help.aliyun.com/product/2508973.html) [计费文档](https://help.aliyun.com/document_detail/2512928.html) |

</service>

<remark>



</remark>

<disclaimers>



</disclaimers>

## 部署 & 体验

<appcenter>
   
- :fire: 通过 [云原生应用开发平台 CAP](https://cap.console.aliyun.com/template-detail?template=fcai-start-mcp-todoist) ，[![Deploy with Severless Devs](https://img.alicdn.com/imgextra/i1/O1CN01w5RFbX1v45s8TIXPz_!!6000000006118-55-tps-95-28.svg)](https://cap.console.aliyun.com/template-detail?template=fcai-start-mcp-todoist) 该应用。
   
</appcenter>
<deploy>
    
   
</deploy>

## 案例介绍

<appdetail id="flushContent">

## Todoist MCP Server
[![smithery badge](https://smithery.ai/badge/@abhiz123/todoist-mcp-server)](https://smithery.ai/server/@abhiz123/todoist-mcp-server)

An MCP (Model Context Protocol) server implementation that integrates Claude with Todoist, enabling natural language task management. This server allows Claude to interact with your Todoist tasks using everyday language.

<a href="https://glama.ai/mcp/servers/fhaif4fv1w">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/fhaif4fv1w/badge" alt="Todoist Server MCP server" />
</a>

### Features

* **Natural Language Task Management**: Create, update, complete, and delete tasks using everyday language
* **Smart Task Search**: Find tasks using partial name matches
* **Flexible Filtering**: Filter tasks by due date, priority, and other attributes
* **Rich Task Details**: Support for descriptions, due dates, and priority levels
* **Intuitive Error Handling**: Clear feedback for better user experience

### Installation

#### Installing via Smithery

```bash
npx -y @smithery/cli install @abhiz123/todoist-mcp-server --client claude
```

#### Manual Installation
```bash
npm install -g @abhiz123/todoist-mcp-server
```

### Tools

#### todoist_create_task
Create new tasks with various attributes:
* Required: content (task title)
* Optional: description, due date, priority level (1-4)
* Example: "Create task 'Team Meeting' with description 'Weekly sync' due tomorrow"

#### todoist_get_tasks
Retrieve and filter tasks:
* Filter by due date, priority, or project
* Natural language date filtering
* Optional result limit
* Example: "Show high priority tasks due this week"

#### todoist_update_task
Update existing tasks using natural language search:
* Find tasks by partial name match
* Update any task attribute (content, description, due date, priority)
* Example: "Update meeting task to be due next Monday"

#### todoist_complete_task
Mark tasks as complete using natural language search:
* Find tasks by partial name match
* Confirm completion status
* Example: "Mark the documentation task as complete"

#### todoist_delete_task
Remove tasks using natural language search:
* Find and delete tasks by name
* Confirmation messages
* Example: "Delete the PR review task"

### Setup

#### Getting a Todoist API Token
1. Log in to your Todoist account
2. Navigate to Settings → Integrations
3. Find your API token under "Developer"

#### Usage with Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "todoist": {
      "command": "npx",
      "args": ["-y", "@abhiz123/todoist-mcp-server"],
      "env": {
        "TODOIST_API_TOKEN": "your_api_token_here"
      }
    }
  }
}
```

### Example Usage

#### Creating Tasks
```
"Create task 'Team Meeting'"
"Add task 'Review PR' due tomorrow at 2pm"
"Create high priority task 'Fix bug' with description 'Critical performance issue'"
```

#### Getting Tasks
```
"Show all my tasks"
"List tasks due today"
"Get high priority tasks"
"Show tasks due this week"
```

#### Updating Tasks
```
"Update documentation task to be due next week"
"Change priority of bug fix task to urgent"
"Add description to team meeting task"
```

#### Completing Tasks
```
"Mark the PR review task as complete"
"Complete the documentation task"
```

#### Deleting Tasks
```
"Delete the PR review task"
"Remove meeting prep task"
```


</appdetail>







## 使用流程

<usedetail id="flushContent">

部署完成拿到 URL 后，准备好支持 SSE 的 MCP Client，通过 SSETransport 进行连接。

</usedetail>









