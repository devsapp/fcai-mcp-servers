
> 注：当前项目为 Serverless Devs 应用，由于应用中会存在需要初始化才可运行的变量（例如应用部署地区、函数名等等），所以**不推荐**直接 Clone 本仓库到本地进行部署或直接复制 s.yaml 使用，**强烈推荐**通过 `s init ${模版名称}` 的方法或应用中心进行初始化，详情可参考[部署 & 体验](#部署--体验) 。

# fcai-start-mcp-tongxiao 帮助文档

<description>

通晓 MCP Server 模版

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
   
- :fire: 通过 [云原生应用开发平台 CAP](https://cap.console.aliyun.com/template-detail?template=fcai-start-mcp-tongxiao) ，[![Deploy with Severless Devs](https://img.alicdn.com/imgextra/i1/O1CN01w5RFbX1v45s8TIXPz_!!6000000006118-55-tps-95-28.svg)](https://cap.console.aliyun.com/template-detail?template=fcai-start-mcp-tongxiao) 该应用。
   
</appcenter>
<deploy>
    
   
</deploy>

## 案例介绍

<appdetail id="flushContent">

## Tools

- common_search - 标准搜索接口提供增强的网络开放域的实时搜索能力，通过大模型优化与多数据源融合的技术，查询干净、准确、多样、高质量的结果。
    - query - 搜索关键词（长度：>=2 and <=100）

## NPX

获取通晓API key: https://ipaas.console.aliyun.com/api-key

```json
{
     "mcpServers" : {
         "tongxiao-common-search" : {
             "command" : " npx " ,
             "args" : [
                 " -y " ,
                 " @tongxiao/common-search-mcp-server "
            ]，
            “env”：{
                 “TONGXIAO_API_KEY”：“ ”
            }
        }
    }
}
```

</appdetail>







## 使用流程

<usedetail id="flushContent">

部署完成拿到 URL 后，准备好支持 SSE 的 MCP Client，通过 SSETransport 进行连接。

</usedetail>









