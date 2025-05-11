
> 注：当前项目为 Serverless Devs 应用，由于应用中会存在需要初始化才可运行的变量（例如应用部署地区、函数名等等），所以**不推荐**直接 Clone 本仓库到本地进行部署或直接复制 s.yaml 使用，**强烈推荐**通过 `s init ${模版名称}` 的方法或应用中心进行初始化，详情可参考[部署 & 体验](#部署--体验) 。

# start-fcai-mcp-openapi 帮助文档

<description>

OpenAPI Spec 转化为 MCP Server

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
   
- :fire: 通过 [云原生应用开发平台 CAP](https://cap.console.aliyun.com/template-detail?template=start-fcai-mcp-openapi) ，[![Deploy with Severless Devs](https://img.alicdn.com/imgextra/i1/O1CN01w5RFbX1v45s8TIXPz_!!6000000006118-55-tps-95-28.svg)](https://cap.console.aliyun.com/template-detail?template=start-fcai-mcp-openapi) 该应用。
   
</appcenter>
<deploy>
    
   
</deploy>

## 案例介绍

<appdetail id="flushContent">

这是一个将 OpenAPI Spec 转化为 MCP Server 实例的模板。能够将您的 OpenAPI 转化为一个 MCP Server 实例并运行在 FunctionAI 上。

</appdetail>







## 使用流程

<usedetail id="flushContent">

1. 在 OpenApi 规范 输入框输入你的服务的 OpenAPI 3.0 Spec。可以从 Apifox，Postman 等软件一键导出。

![](https://img.alicdn.com/imgextra/i2/O1CN01k5ZJ1R1ZNrjS067GO_!!6000000003183-2-tps-2656-754.png)

2. 在 OpenApi 安全配置 输入框输入你的服务Auth配置。

![](https://img.alicdn.com/imgextra/i4/O1CN01A7siQs27d9tQckoBU_!!6000000007819-2-tps-2532-770.png)

部署完成拿到 URL 后，准备好支持 SSE 的 MCP Client，通过 SSETransport 进行连接。接入大模型后，即可直接调用服务:

![](https://img.alicdn.com/imgextra/i4/O1CN01uFBwZM1dLoQ44Fq3o_!!6000000003720-2-tps-2166-802.png)

</usedetail>

## 二次开发指南

<development id="flushContent">

暂无

</development>






