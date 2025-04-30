
> 注：当前项目为 Serverless Devs 应用，由于应用中会存在需要初始化才可运行的变量（例如应用部署地区、函数名等等），所以**不推荐**直接 Clone 本仓库到本地进行部署或直接复制 s.yaml 使用，**强烈推荐**通过 `s init ${模版名称}` 的方法或应用中心进行初始化，详情可参考[部署 & 体验](#部署--体验) 。

# fcai-start-mcp-edgeone-pages 帮助文档

<description>

Time MCP Server 模版

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
   
- :fire: 通过 [云原生应用开发平台 CAP](https://cap.console.aliyun.com/template-detail?template=fcai-start-mcp-edgeone-pages) ，[![Deploy with Severless Devs](https://img.alicdn.com/imgextra/i1/O1CN01w5RFbX1v45s8TIXPz_!!6000000006118-55-tps-95-28.svg)](https://cap.console.aliyun.com/template-detail?template=fcai-start-mcp-edgeone-pages) 该应用。
   
</appcenter>
<deploy>
    
   
</deploy>

## 案例介绍

<appdetail id="flushContent">

# EdgeOne Pages MCP

An MCP service for deploying HTML content to EdgeOne Pages and obtaining a publicly accessible URL.

<a href="https://glama.ai/mcp/servers/@TencentEdgeOne/edgeone-pages-mcp">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@TencentEdgeOne/edgeone-pages-mcp/badge" alt="EdgeOne Pages MCP server" />
</a>

## Demo

![](https://cloudcache.tencent-cloud.com/qcloud/ui/static/static_source_business/04ff9814-bcd3-442c-a2d0-eefd4ee1b13c.gif)

## Configure MCP

### stdio MCP Server

Suitable for most MCP applications

```json
{
  "mcpServers": {
    "edgeone-pages-mcp-server": {
      "command": "npx",
      "args": ["edgeone-pages-mcp"]
    }
  }
}
```

### Streamable HTTP MCP Server

Available in applications supporting Streamable HTTP MCP Server

```json
{
  "mcpServers": {
    "edgeone-pages-mcp-server": {
      "url": "https://mcp-on-edge.edgeone.site/mcp-server"
    }
  }
}
```

## Architecture

![EdgeOne Pages MCP Architecture](https://img.alicdn.com/imgextra/i3/O1CN01pj5qxs1Q7zSUuSMQ5_!!6000000001930-2-tps-731-339.png)

The architecture diagram illustrates the workflow:
1. Large Language Model generates HTML content
2. Content is sent to the EdgeOne Pages MCP Server
3. MCP Server deploys the content to EdgeOne Pages Edge Functions
4. Content is stored in EdgeOne KV Store for fast edge access
5. MCP Server returns a public URL
6. Users can access the deployed content via browser with fast edge delivery

## Features

* MCP protocol for rapid deployment of HTML content to EdgeOne Pages
* Automatic generation of publicly accessible URLs

## Implementation

This MCP service integrates with EdgeOne Pages Functions to deploy static HTML content. The implementation uses:

1. **EdgeOne Pages Functions** - A serverless computing platform that allows execution of JavaScript/TypeScript code at the edge.

2. **Key Implementation Details** :
   - Uses EdgeOne Pages KV store to store and serve the HTML content
   - Automatically generates a public URL for each deployment
   - Handles API errors with appropriate error messages

3. **How it works** :
   - The MCP server accepts HTML content through the `deploy-html` tool
   - It connects to EdgeOne Pages API to get the base URL
   - Deploys the HTML content using the EdgeOne Pages KV API
   - Returns a publicly accessible URL to the deployed content

4. **Usage Example** :
   - Provide HTML content to the MCP service
   - Receive a public URL that can be accessed immediately

For more information, see the [EdgeOne Pages Functions documentation](https://edgeone.ai/document/162227908259442688) and [EdgeOne Pages KV Storage Guide](https://edgeone.ai/document/162227803822321664).

## License

MIT

</appdetail>







## 使用流程

<usedetail id="flushContent">

部署完成拿到 URL 后，准备好支持 SSE 的 MCP Client，通过 SSETransport 进行连接。

</usedetail>




## 注意事项

<matters id="flushContent">
</matters>



