
> 注：当前项目为 Serverless Devs 应用，由于应用中会存在需要初始化才可运行的变量（例如应用部署地区、函数名等等），所以**不推荐**直接 Clone 本仓库到本地进行部署或直接复制 s.yaml 使用，**强烈推荐**通过 `s init ${模版名称}` 的方法或应用中心进行初始化，详情可参考[部署 & 体验](#部署--体验) 。

# fcai-start-mcp-esign 帮助文档

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
   
- :fire: 通过 [云原生应用开发平台 CAP](https://cap.console.aliyun.com/template-detail?template=fcai-start-mcp-esign) ，[![Deploy with Severless Devs](https://img.alicdn.com/imgextra/i1/O1CN01w5RFbX1v45s8TIXPz_!!6000000006118-55-tps-95-28.svg)](https://cap.console.aliyun.com/template-detail?template=fcai-start-mcp-esign) 该应用。
   
</appcenter>
<deploy>
    
   
</deploy>

## 案例介绍

<appdetail id="flushContent">

# e签宝 MCP 工具

基于 Model Context Protocol (MCP) 的 e签宝电子签署工具，支持文件上传、签署流程创建、签署状态查询等功能。

### 功能特点

- 支持多种文件格式上传和自动转换为 PDF（支持本地文件路径和远程文件下载链接）:
  - PDF 文件（.pdf）
  - Word 文件（.docx, .doc, .rtf）
  - Excel 文件（.xlsx, .xls）
  - PowerPoint 文件（.pptx, .ppt）
  - WPS 文件（.wps, .et, .dps）
  - 图片文件（.jpeg, .jpg, .png, .bmp, .tiff, .tif, .gif）
  - HTML 文件（.html, .htm）

- 自动文件状态检查，确保文件处理完成

- 支持创建签署流程

- 支持查询签署流程详情

- 完整的日志记录

## 安装

```bash
npm install esign-mcp-server
```

## 配置

在 MCP 配置中添加以下环境变量：

```bash
{
  "esign-mcp": {
    "command": "npx",
    "args": ["-y", "esign-mcp-server@{version}"],
    "env": {
      "HOST": "选择对应环境：",
      "  - 测试环境：http://in-test-openapi.tsign.cn",
      "  - 沙箱环境：http://in-test-openapi.tsign.cn",
      "  - 正式环境：https://openapi.esign.cn",
      "APP_ID": "你的应用ID",
      "APP_SECRET": "你的应用密钥"
    }
  }
}
```

## 可用工具

1. create_sign_flow

创建签署流程，支持多种文件格式。

参数：

- `filePath`: 本地文件路径

- `fileName`: 文件名（必须包含正确的文件扩展名）

- `receiverPhone`: 签署人手机号

示例：

```bash
{
  "filePath": "/path/to/contract.pdf",
  "fileName": "合同.pdf",
  "receiverPhone": "13800138000"
}
```

2. query_sign_flow

查询签署流程详情。

参数：

- `flowId`: 签署流程ID

示例：

```bash
{
  "flowId": "12345678"
}
```

## 错误处理

工具会自动处理常见错误情况：

- 文件格式不支持

- 文件上传失败

- 文件转换失败

- 签署流程创建失败

所有错误都会记录在日志文件中，并返回详细的错误信息。

</appdetail>







## 使用流程

<usedetail id="flushContent">

部署完成拿到 URL 后，准备好支持 SSE 的 MCP Client，通过 SSETransport 进行连接。

</usedetail>




## 注意事项

<matters id="flushContent">

1. 文件大小限制：

- 总大小不超过 50MB

- 单页内容不超过 20MB

2. 文件名要求：

- 不能包含特殊字符：/ \ : * " < > | ？

- 不能包含 emoji 表情

- 扩展名必须与实际文件格式一致

3. 环境说明：

- 测试/沙箱环境：用于开发测试

- 正式环境：用于生产部署


</matters>



