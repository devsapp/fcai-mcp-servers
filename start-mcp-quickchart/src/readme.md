
> 注：当前项目为 Serverless Devs 应用，由于应用中会存在需要初始化才可运行的变量（例如应用部署地区、函数名等等），所以**不推荐**直接 Clone 本仓库到本地进行部署或直接复制 s.yaml 使用，**强烈推荐**通过 `s init ${模版名称}` 的方法或应用中心进行初始化，详情可参考[部署 & 体验](#部署--体验) 。

# fcai-start-mcp-quickchart 帮助文档

<description>

quickchart-server MCP Server

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
   
- :fire: 通过 [云原生应用开发平台 CAP](https://cap.console.aliyun.com/template-detail?template=fcai-start-mcp-quickchart) ，[![Deploy with Severless Devs](https://img.alicdn.com/imgextra/i1/O1CN01w5RFbX1v45s8TIXPz_!!6000000006118-55-tps-95-28.svg)](https://cap.console.aliyun.com/template-detail?template=fcai-start-mcp-quickchart) 该应用。
   
</appcenter>
<deploy>
    
   
</deploy>

## 案例介绍

<appdetail id="flushContent">

# quickchart-server MCP Server

A Model Context Protocol server for generating charts using QuickChart.io

This is a TypeScript-based MCP server that provides chart generation capabilities. It allows you to create various types of charts through MCP tools.

## Overview

This server integrates with QuickChart.io's URL-based chart generation service to create chart images using Chart.js configurations. Users can generate various types of charts by providing data and styling parameters, which the server converts into chart URLs or downloadable images.

## Features

### Tools
- `generate_chart` - Generate a chart URL using QuickChart.io
  - Supports multiple chart types: bar, line, pie, doughnut, radar, polarArea, scatter, bubble, radialGauge, speedometer
  - Customizable with labels, datasets, colors, and additional options
  - Returns a URL to the generated chart

- `download_chart` - Download a chart image to a local file
  - Takes chart configuration and output path as parameters
  - Saves the chart image to the specified location
![image](https://github.com/user-attachments/assets/c6864098-dd9a-48ff-b53a-d897427748f7)

![image](https://github.com/user-attachments/assets/c008adbb-55ec-4432-bfe7-5644a0fccfae)


## Supported Chart Types
- Bar charts: For comparing values across categories
- Line charts: For showing trends over time
- Pie charts: For displaying proportional data
- Doughnut charts: Similar to pie charts with a hollow center
- Radar charts: For showing multivariate data
- Polar Area charts: For displaying proportional data with fixed-angle segments
- Scatter plots: For showing data point distributions
- Bubble charts: For three-dimensional data visualization
- Radial Gauge: For displaying single values within a range
- Speedometer: For speedometer-style value display

## Usage

### Chart Configuration
The server uses Chart.js configuration format. Here's a basic example:

```javascript
{
  "type": "bar",
  "data": {
    "labels": ["January", "February", "March"],
    "datasets": [{
      "label": "Sales",
      "data": [65, 59, 80],
      "backgroundColor": "rgb(75, 192, 192)"
    }]
  },
  "options": {
    "title": {
      "display": true,
      "text": "Monthly Sales"
    }
  }
}
```

### URL Generation
The server converts your configuration into a QuickChart URL:
```
https://quickchart.io/chart?c={...encoded configuration...}
```

## Development

Install dependencies:
```bash
npm install
```

Build the server:
```bash
npm run build
```

## Installation

### Installing

 ```bash
 npm install @gongrzhe/quickchart-mcp-server
 ```

### Installing via Smithery
 
 To install QuickChart Server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@GongRzhe/Quickchart-MCP-Server):
 
 ```bash
 npx -y @smithery/cli install @gongrzhe/quickchart-mcp-server --client claude
 ```

To use with Claude Desktop, add the server config:

On MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
On Windows: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "quickchart-server": {
      "command": "node",
      "args": ["/path/to/quickchart-server/build/index.js"]
    }
  }
}
```

or

```json
{
  "mcpServers": {
    "quickchart-server": {
      "command": "npx",
      "args": [
        "-y",
        "@gongrzhe/quickchart-mcp-server"
      ]
    }
  }
}
```


## Documentation References
- [QuickChart Documentation](https://quickchart.io/documentation/)
- [Chart Types Reference](https://quickchart.io/documentation/chart-types/)

## 📜 License

This project is licensed under the MIT License.

</appdetail>







## 使用流程

<usedetail id="flushContent">

部署完成拿到 URL 后，准备好支持 SSE 的 MCP Client，通过 SSETransport 进行连接。

</usedetail>









