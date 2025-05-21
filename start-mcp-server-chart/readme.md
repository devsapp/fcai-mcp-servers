
> 注：当前项目为 Serverless Devs 应用，由于应用中会存在需要初始化才可运行的变量（例如应用部署地区、函数名等等），所以**不推荐**直接 Clone 本仓库到本地进行部署或直接复制 s.yaml 使用，**强烈推荐**通过 `s init ${模版名称}` 的方法或应用中心进行初始化，详情可参考[部署 & 体验](#部署--体验) 。

# fcai-start-mcp-server-chart 帮助文档

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
   
- :fire: 通过 [云原生应用开发平台 CAP](https://cap.console.aliyun.com/template-detail?template=fcai-start-mcp-server-chart) ，[![Deploy with Severless Devs](https://img.alicdn.com/imgextra/i1/O1CN01w5RFbX1v45s8TIXPz_!!6000000006118-55-tps-95-28.svg)](https://cap.console.aliyun.com/template-detail?template=fcai-start-mcp-server-chart) 该应用。
   
</appcenter>
<deploy>
    
   
</deploy>

## 案例介绍

<appdetail id="flushContent">

一个用于生成图表的 Model Context Protocol 服务器，使用 AntV。

这是一个基于 TypeScript 的 MCP 服务器，提供图表生成功能。它允许您通过 MCP 工具创建各种类型的图表。

### Tools

现在支持 15+ 种图表。

- generate_area_chart - 生成 area 图表，并返回图像 URL。

- generate_bar_chart - 生成 bar 图表，并返回图像 URL。

- generate_column_chart - 生成 column 图表，并返回图像 URL。

- generate_dual_axes_chart - 生成 dual-axes 图表，并返回图像 URL。

- generate_fishbone_diagram - 生成 fishbone-diagram 图表，并返回图像 URL。

- generate_flow_diagram - 生成 flow-diagram 图表，并返回图像 URL。

- generate_histogram_chart - 生成 histogram 图表，并返回图像 URL。

- generate_line_chart - 生成 line 图表，并返回图像 URL。

- generate_mind_map - 生成 mind-map 图表，并返回图像 URL。

- generate_network_graph - 生成 network-graph 图表，并返回图像 URL。

- generate_pie_chart - 生成 pie 图表，并返回图像 URL。

- generate_radar_chart - 生成 radar 图表，并返回图像 URL。

- generate_scatter_chart - 生成 scatter 图表，并返回图像 URL。

- generate_treemap_chart - 生成 treemap 图表，并返回图像 URL。

- generate_word_cloud_chart - 生成 word-cloud 图表，并返回图像 URL。

### 使用

添加服务器配置：

```
{
  "mcpServers": {
    "mcp-server-chart": {
      "command": "npx",
      "args": [
        "-y",
        "@antv/mcp-server-chart"
      ]
    }
  }
}
```

### 开发

安装依赖：

``` 
npm install 
```

构建服务器：

``` 
npm run build
```

启动 MCP 服务器：

```
bash npm run start
```

### 许可证

MIT@[AntV](https://github.com/antvis)。

</appdetail>







## 使用流程

<usedetail id="flushContent">

部署完成拿到 URL 后，准备好支持 SSE 的 MCP Client，通过 SSETransport 进行连接。

</usedetail>

## 二次开发指南

<development id="flushContent">
</development>






