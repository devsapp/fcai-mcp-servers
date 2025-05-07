
> 注：当前项目为 Serverless Devs 应用，由于应用中会存在需要初始化才可运行的变量（例如应用部署地区、函数名等等），所以**不推荐**直接 Clone 本仓库到本地进行部署或直接复制 s.yaml 使用，**强烈推荐**通过 `s init ${模版名称}` 的方法或应用中心进行初始化，详情可参考[部署 & 体验](#部署--体验) 。

# fcai-start-mcp-bing-search 帮助文档

<description>

GitHub 官方提供的MCP Server

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
   
- :fire: 通过 [云原生应用开发平台 CAP](https://cap.console.aliyun.com/template-detail?template=fcai-start-mcp-bing-search) ，[![Deploy with Severless Devs](https://img.alicdn.com/imgextra/i1/O1CN01w5RFbX1v45s8TIXPz_!!6000000006118-55-tps-95-28.svg)](https://cap.console.aliyun.com/template-detail?template=fcai-start-mcp-bing-search) 该应用。
   
</appcenter>
<deploy>
    
   
</deploy>

## 案例介绍

<appdetail id="flushContent">

## Bing Search MCP Server

A Model Context Protocol (MCP) server for Microsoft Bing Search API integration, allowing AI assistants to perform web, news, and image searches.

### Features

- Web search for general information
- News search for recent events and timely information
- Image search for visual content
- Rate limiting to prevent API abuse
- Comprehensive error handling

### Requirements

- Python 3.10 or higher
- Microsoft Bing Search API key
- MCP-compatible client (e.g., Claude Desktop, Cursor)

### Configuration

Set the required environment variables:

```bash
export BING_API_KEY="your-bing-api-key"
export BING_API_URL="https://api.bing.microsoft.com/"  # Optional
```

For Windows:
```cmd
set BING_API_KEY=your-bing-api-key
set BING_API_URL=https://api.bing.microsoft.com/
```

### Usage

#### Configuring with Claude for Desktop

Add the following to your Claude Desktop configuration file (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS or `%APPDATA%\Claude\claude_desktop_config.json` on Windows):

```json
{
  "mcpServers": {
    "bing-search": {
      "command": "uvx",
      "args": [
        "/path/to/your/bing-search-mcp"
      ],
      "env": {
        "BING_API_KEY": "your-bing-api-key"
      }
    }
  }
}
```

### Available Tools

#### 1. bing_web_search
General web search for information, websites, and content.

```python
bing_web_search(query: str, count: int = 10, offset: int = 0, market: str = "en-US")
```

#### 2. bing_news_search
Search for news articles and current events.

```python
bing_news_search(query: str, count: int = 10, market: str = "en-US", freshness: str = "Day")
```

#### 3. bing_image_search
Search for images.

```python
bing_image_search(query: str, count: int = 10, market: str = "en-US")
```

### Getting a Bing API Key

1. Visit [Microsoft Azure Portal](https://portal.azure.com/)
2. Create or sign in to your Azure account
3. Create a new Bing Search resource
4. Go to the resource and find your API key in the "Keys and Endpoint" section


</appdetail>







## 使用流程

<usedetail id="flushContent">

部署完成拿到 URL 后，准备好支持 SSE 的 MCP Client，通过 SSETransport 进行连接。

</usedetail>









