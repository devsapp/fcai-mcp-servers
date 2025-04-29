
> 注：当前项目为 Serverless Devs 应用，由于应用中会存在需要初始化才可运行的变量（例如应用部署地区、函数名等等），所以**不推荐**直接 Clone 本仓库到本地进行部署或直接复制 s.yaml 使用，**强烈推荐**通过 `s init ${模版名称}` 的方法或应用中心进行初始化，详情可参考[部署 & 体验](#部署--体验) 。

# fcai-start-mcp-flomo 帮助文档

<description>

Flomo MCP Server

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
   
- :fire: 通过 [云原生应用开发平台 CAP](https://cap.console.aliyun.com/template-detail?template=fcai-start-mcp-flomo) ，[![Deploy with Severless Devs](https://img.alicdn.com/imgextra/i1/O1CN01w5RFbX1v45s8TIXPz_!!6000000006118-55-tps-95-28.svg)](https://cap.console.aliyun.com/template-detail?template=fcai-start-mcp-flomo) 该应用。
   
</appcenter>
<deploy>
    
   
</deploy>

## 案例介绍

<appdetail id="flushContent">

# Flomo MCP Server


https://github.com/xianminx/mcp-server-flomo

A Model Context Protocol (MCP) server that lets you create notes in Flomo directly through AI chat interactions in Cursor or Claude desktop. Write and organize your thoughts seamlessly through natural language commands.

## Usage

### Installing via Smithery

To install mcp-server-flomo for Claude Desktop automatically via [Smithery](https://smithery.ai/server/mcp-server-flomo/wss://mcp.smithery.ai:443):

```bash
npx -y @smithery/cli install mcp-server-flomo --client claude
```

### [mcp-get](https://mcp-get.com/) 

![mcp-get: mcp-server-flomo](https://img.shields.io/badge/mcp--get-mcp--server--flomo-blue)


```bash
npx @michaellatman/mcp-get@latest install mcp-server-flomo
```

### [mcp.so](https://mcp.so/server/mcp-server-flomo/xianminx)
https://mcp.so/protocol/mcp-server-flomo/wss://mcp.smithery.ai:443

### Manually configure

Configure Claude / Cursor / Windsurf / Cline / ChatWise / Cherry Studio etc.

```bash
FLOMO_API_URL=your_api_url_here npx mcp-server-flomo
```

Or configure for your MCP Host / Client. See https://mcp.so/protocol/mcp-server-flomo/wss://mcp.smithery.ai:443 for configuration detail.

Get your Flomo API URL from [Flomo API Settings](https://v.flomoapp.com/mine)

```json
{
  "mcpServers": {
    "mcp-server-flomo": {
      "command": "npx",
      "args": [
        "mcp-server-flomo"
      ],
      "env": {
        "FLOMO_API_URL": "your_api_url_here"
      }
    }
  }
}
```

Once the server is running, you can create notes in Flomo through natural language commands in your AI chat. Here are some examples:

```json
"How to publish a mcp server? Could you save the answer to flomo note after answering it"
```

This will save the Cursor AI Agent response to Flomo directly in the chat conversation!


<img src="https://raw.githubusercontent.com/xianminx/mcp-server-flomo/refs/heads/main/public/images/mcp-cursor-flomo.png" width="400">

The server will handle:

- Converting your natural language requests into Flomo API calls
- Proper formatting and submission of your notes
- Providing feedback on successful note creation

## Dev

1. Get your Flomo API URL from [Flomo API Settings](https://v.flomoapp.com/mine)

2. Install and configure:

   ```bash
   # Install dependencies
   npm install
   FLOMO_API_URL=your_api_url_here npx .
   ```

## Technical Details

- Built with TypeScript and the Model Context Protocol SDK
- Communicates with Flomo via their REST API
- Runs over stdio for seamless integration with AI tools

## License

This project is licensed under the MIT License—see the [LICENSE](LICENSE) file for details.

</appdetail>







## 使用流程

<usedetail id="flushContent">

部署完成拿到 URL 后，准备好支持 SSE 的 MCP Client，通过 SSETransport 进行连接。

</usedetail>

## 二次开发指南

<development id="flushContent">
</development>






