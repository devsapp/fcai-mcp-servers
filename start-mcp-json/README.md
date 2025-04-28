
> 注：当前项目为 Serverless Devs 应用，由于应用中会存在需要初始化才可运行的变量（例如应用部署地区、函数名等等），所以**不推荐**直接 Clone 本仓库到本地进行部署或直接复制 s.yaml 使用，**强烈推荐**通过 `s init ${模版名称}` 的方法或应用中心进行初始化，详情可参考[部署 & 体验](#部署--体验) 。

# start-mcp-json 帮助文档

<description>

JSON MCP Server

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
   
- :fire: 通过 [云原生应用开发平台 CAP](https://cap.console.aliyun.com/template-detail?template=start-mcp-json) ，[![Deploy with Severless Devs](https://img.alicdn.com/imgextra/i1/O1CN01w5RFbX1v45s8TIXPz_!!6000000006118-55-tps-95-28.svg)](https://cap.console.aliyun.com/template-detail?template=start-mcp-json) 该应用。
   
</appcenter>
<deploy>
    
   
</deploy>

## 案例介绍

<appdetail id="flushContent">

# JSON MCP Server (@gongrzhe/server-json-mcp@1.0.3)

A JSON Model Context Protocol (MCP) server implementation for querying and manipulating JSON data. This server enables LLMs to interact with JSON data through a set of standardized tools.


## Installation & Usage

```bash
# Using npx with specific version (recommended)
npx @gongrzhe/server-json-mcp@1.0.3

# Install specific version globally
npm install -g @gongrzhe/server-json-mcp@1.0.3

# Run after global installation
server-json-mcp
```

## Components

### Tools

- **query**
  - Query JSON data using JSONPath syntax with extended operations
  - Input:
    - `url` (string): URL of the JSON data source
    - `jsonPath` (string): JSONPath expression with optional operations

- **filter**
  - Filter JSON data using conditions
  - Input:
    - `url` (string): URL of the JSON data source
    - `jsonPath` (string): Base JSONPath expression
    - `condition` (string): Filter condition

### Supported Operations

#### Array Operations
- **Slicing**: `$[0:5]`, `$[-3:]`, `$[1:4]`
- **Sorting**: `$.sort(price)`, `$.sort(-price)`
- **Distinct**: `$.distinct()`
- **Transformations**: 
  - Map: `$.map(fieldName)`
  - Flatten: `$.flatten()`
  - Union: `$.union([1,2,3])`
  - Intersection: `$.intersection([1,2,3])`

#### String Operations
- **Case**: `$.toLowerCase()`, `$.toUpperCase()`
- **Tests**: `$.startsWith('test')`, `$.endsWith('test')`
- **Search**: `$.contains('test')`, `$.matches('pattern')`

#### Numeric Operations
- **Math**: `$.math(+10)`, `$.pow2()`
- **Rounding**: `$.round()`, `$.floor()`, `$.ceil()`
- **Functions**: `$.abs()`, `$.sqrt()`

#### Date Operations
- **Format**: `$.format('YYYY-MM-DD')`
- **Check**: `$.isToday()`
- **Modify**: `$.add(1, 'days')`

#### Aggregation Operations
- **Group**: `$.groupBy(category)`
- **Stats**: `$.sum(price)`, `$.avg(price)`, `$.min(price)`, `$.max(price)`

## Configuration

### Usage with Claude Desktop

To use this server with the Claude Desktop app, add the following configuration to your `claude_desktop_config.json`:

```json
{
  "json": {
    "command": "npx",
    "args": [
      "@gongrzhe/server-json-mcp@1.0.3"
    ]
  }
}
```

Alternatively, you can use the node command directly if you have the package installed:

```json
{
  "json": {
    "command": "node",
    "args": [
      "path/to/build/index.js"
    ]
  }
}
```

## Development

### Building from Source

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the project:
   ```bash
   npm run build
   ```

## Notes

1. All JSONPath expressions start with `$` representing the root object
2. Array indices are zero-based
3. String values in operations should be wrapped in quotes
4. Date operations support 'days', 'months', and 'years' units
5. Numeric operations support basic arithmetic operators (+, -, *, /)

## License

MIT

</appdetail>







## 使用流程

<usedetail id="flushContent">

部署完成拿到 URL 后，准备好支持 SSE 的 MCP Client，通过 SSETransport 进行连接。

</usedetail>









