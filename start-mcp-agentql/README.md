
> 注：当前项目为 Serverless Devs 应用，由于应用中会存在需要初始化才可运行的变量（例如应用部署地区、函数名等等），所以**不推荐**直接 Clone 本仓库到本地进行部署或直接复制 s.yaml 使用，**强烈推荐**通过 `s init ${模版名称}` 的方法或应用中心进行初始化，详情可参考[部署 & 体验](#部署--体验) 。

# fcai-start-mcp-agentql 帮助文档

<description>

agentql MCP Server

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
   
- :fire: 通过 [云原生应用开发平台 CAP](https://cap.console.aliyun.com/template-detail?template=fcai-start-mcp-agentql) ，[![Deploy with Severless Devs](https://img.alicdn.com/imgextra/i1/O1CN01w5RFbX1v45s8TIXPz_!!6000000006118-55-tps-95-28.svg)](https://cap.console.aliyun.com/template-detail?template=fcai-start-mcp-agentql) 该应用。
   
</appcenter>
<deploy>
    
   
</deploy>

## 案例介绍

<appdetail id="flushContent">

# AgentQL MCP Server

This is a Model Context Protocol (MCP) server that integrates [AgentQL](https://agentql.com)'s data extraction capabilities.

## Features

### Tools

- `extract-web-data` - extract structured data from a given 'url', using 'prompt' as a description of actual data and its fields to extract.

## Installation

To use AgentQL MCP Server to extract data from web pages, you need to install it via npm, get an API key from our [Dev Portal](https://dev.agentql.com), and configure it in your favorite app that supports MCP.

### Install the package

```bash
npm install -g agentql-mcp
```

### Configure Claude

- Open Claude Desktop **Settings** via `⌘`+`,` (don't confuse with Claude Account Settings)
- Go to **Developer** sidebar section
- Click **Edit Config** and open `claude_desktop_config.json` file
- Add `agentql` server inside `mcpServers` dictionary in the config file
- Restart the app

```json title="claude_desktop_config.json"
{
  "mcpServers": {
    "agentql": {
      "command": "npx",
      "args": ["-y", "agentql-mcp"],
      "env": {
        "AGENTQL_API_KEY": "YOUR_API_KEY"
      }
    }
  }
}
```

Read more about MCP configuration in Claude [here](https://modelcontextprotocol.io/quickstart/user).

### Configure Cursor

- Open **Cursor Settings**
- Go to **MCP > MCP Servers**
- Click **+ Add new MCP Server**
- Enter the following:
  - Name: "agentql" (or your preferred name)
  - Type: "command"
  - Command: `env AGENTQL_API_KEY=YOUR_API_KEY npx -y agentql-mcp`

Read more about MCP configuration in Cursor [here](https://docs.cursor.com/context/model-context-protocol).

### Configure Windsurf

- Open **Windsurf: MCP Configuration Panel**
- Click **Add custom server+**
- Alternatively you can open `~/.codeium/windsurf/mcp_config.json` directly
- Add `agentql` server inside `mcpServers` dictionary in the config file

```json title="mcp_config.json"
{
  "mcpServers": {
    "agentql": {
      "command": "npx",
      "args": ["-y", "agentql-mcp"],
      "env": {
        "AGENTQL_API_KEY": "YOUR_API_KEY"
      }
    }
  }
}
```

Read more about MCP configuration in Windsurf [here](https://docs.codeium.com/windsurf/mcp).

### Validate MCP integration

Give your agent a task that will require extracting data from the web. For example:

```text
Extract the list of videos from the page https://www.youtube.com/results?search_query=agentql, every video should have a title, an author name, a number of views and a url to the video. Make sure to exclude ads items. Format this as a markdown table.
```

> [!TIP]
> In case your agent complains that it can't open urls or load content from the web instead of using AgentQL, try adding "use tools" or "use agentql tool" hint.

## Development

Install dependencies:

```bash
npm install
```

Build the server:

```bash
npm run build
```

For development with auto-rebuild:

```bash
npm run watch
```

If you want to try out development version, you can use the following config instead of the default one:

```json
{
  "mcpServers": {
    "agentql": {
      "command": "/path/to/agentql-mcp/dist/index.js",
      "env": {
        "AGENTQL_API_KEY": "YOUR_API_KEY"
      }
    }
  }
}
```

> [!NOTE]
> Don't forget to remove the default AgentQL MCP server config to not confuse Claude with two similar servers.

## Debugging

Since MCP servers communicate over stdio, debugging can be challenging. We recommend using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector), which is available as a package script:

```bash
npm run inspector
```

The Inspector will provide a URL to access debugging tools in your browser.

</appdetail>







## 使用流程

<usedetail id="flushContent">

部署完成拿到 URL 后，准备好支持 SSE 的 MCP Client，通过 SSETransport 进行连接。

</usedetail>

## 二次开发指南

<development id="flushContent">
</development>






