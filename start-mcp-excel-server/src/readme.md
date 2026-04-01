> 注：当前项目为 Serverless Devs 应用，由于应用中会存在需要初始化才可运行的变量（例如应用部署地区、函数名等等），所以**不推荐**直接 Clone 本仓库到本地进行部署或直接复制 s.yaml 使用，**强烈推荐**通过 `s init ${模版名称}` 的方法或应用中心进行初始化，详情可参考[部署 & 体验](#部署--体验) 。

# excel-mcp-server 帮助文档

<description>

Excel MCP Server 模板

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
   
- :fire: 通过 [云原生应用开发平台 CAP](https://cap.console.aliyun.com/template-detail?template=excel-mcp-server) ，[![Deploy with Severless Devs](https://img.alicdn.com/imgextra/i1/O1CN01w5RFbX1v45s8TIXPz_!!6000000006118-55-tps-95-28.svg)](https://cap.console.aliyun.com/template-detail?template=excel-mcp-server) 该应用。

</appcenter>
<deploy>
    
   
</deploy>

## 案例介绍

<appdetail id="flushContent">

# Excel MCP Server

Excel Model Context Protocol (MCP) 服务器，为 AI 提供工具，使其能够通过标准化接口与 Excel 文件进行交互。此实现基于 [haris-musa/excel-mcp-server](https://github.com/haris-musa/excel-mcp-server)，使 AI 代理能够无缝地执行 Excel 文件操作。

## 特征
- **📊 Excel 操作**：创建、读取、更新工作簿和工作表
- **📈数据处理**：公式、格式设置、图表、数据透视表和 Excel 表格
- **🔍数据验证**：内置数据范围、公式和数据完整性验证
- **🎨格式设置**：字体样式、颜色、边框、对齐方式和条件格式
- **📋表格操作**：创建和管理具有自定义样式的 Excel 表格
- **📊图表创建**：生成各种图表类型（折线图、柱状图、饼图、散点图等）
- **🔄数据透视表**：创建动态数据透视表进行数据分析
- **🔧工作表管理**：轻松复制、重命名和删除工作表
- **三重传输支持**：stdio、SSE（已弃用）和流式 HTTP
- **🌐远程和本地**：既可本地使用，也可作为远程服务使用

## 用法

### 模式 1：Stdio 运输（供本地使用）

```bash
uvx excel-mcp-server stdio
```

```json
{
   "mcpServers": {
      "excel": {
         "command": "uvx",
         "args": ["excel-mcp-server", "stdio"]
      }
   }
}
```

### 模式 2：SSE 传输（服务器发送事件 - 已弃用）

```bash
uvx excel-mcp-server sse
```

SSE 传输连接：
```json
{
   "mcpServers": {
      "excel": {
         "url": "http://localhost:8000/sse",
      }
   }
}
```

### 模式 3：可流式HTTP传输（推荐用于远程连接）

```bash
uvx excel-mcp-server streamable-http
```

可流式HTTP传输连接：
```json
{
   "mcpServers": {
      "excel": {
         "url": "http://localhost:8000/mcp",
      }
   }
}
```

## 环境变量和文件路径处理

### SSE 和可流式 HTTP 传输

使用SSE 或 Streamable HTTP 协议运行服务器时，必须在服务器端设置EXCEL_FILES_PATH环境变量。该变量指示服务器在哪里读取和写入 Excel 文件。

- 如果未设置，则默认值为 `./excel_files`。

您还可以设置`FASTMCP_PORT`环境变量来控制服务器监听的端口（`8017`如果未设置，则默认为 0）。

- 示例（Windows PowerShell）：
  ```powershell
  $env:EXCEL_FILES_PATH="E:\MyExcelFiles"
  $env:FASTMCP_PORT="8007"
  uvx excel-mcp-server streamable-http
  ```

- 示例（Linux/macOS）：
  ```bash
  EXCEL_FILES_PATH=/path/to/excel_files FASTMCP_PORT=8007 uvx excel-mcp-server streamable-http
  ```

### Stdio 传输

使用标准 I/O 协议时，每次工具调用都会提供文件路径，因此无需在服务器端进行设置EXCEL_FILES_PATH。服务器将使用客户端发送的路径执行每次操作。

## 组件

### 可用工具

服务器提供了一套全面的 Excel 操作工具。有关所有可用工具的完整文档，请参阅 [TOOLS.md](https://github.com/haris-musa/excel-mcp-server/blob/main/TOOLS.md) 文件。

### 星际历史

[![Star History Chart](https://api.star-history.com/svg?repos=haris-musa/excel-mcp-server&type=Date)](https://www.star-history.com/#haris-musa/excel-mcp-server&Date)

</appdetail>

## 使用流程

<usedetail id="flushContent">

部署完成拿到 URL 后，准备好支持 SSE 的 MCP Client，通过 SSETransport 进行连接。

</usedetail>

## 二次开发指南

<development id="flushContent">

如需对 Excel MCP Server 进行二次开发，请参考原始项目文档：
[https://github.com/haris-musa/excel-mcp-server](https://github.com/haris-musa/excel-mcp-server)

</development>