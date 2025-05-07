
> 注：当前项目为 Serverless Devs 应用，由于应用中会存在需要初始化才可运行的变量（例如应用部署地区、函数名等等），所以**不推荐**直接 Clone 本仓库到本地进行部署或直接复制 s.yaml 使用，**强烈推荐**通过 `s init ${模版名称}` 的方法或应用中心进行初始化，详情可参考[部署 & 体验](#部署--体验) 。

# fcai-start-mcp-ledger-mate 帮助文档

<description>

Ledger Mate MCP Server 模版

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
   
- :fire: 通过 [云原生应用开发平台 CAP](https://cap.console.aliyun.com/template-detail?template=fcai-start-mcp-ledger-mate) ，[![Deploy with Severless Devs](https://img.alicdn.com/imgextra/i1/O1CN01w5RFbX1v45s8TIXPz_!!6000000006118-55-tps-95-28.svg)](https://cap.console.aliyun.com/template-detail?template=fcai-start-mcp-ledger-mate) 该应用。
   
</appcenter>
<deploy>
    
   
</deploy>

## 案例介绍

<appdetail id="flushContent">

小记，是一款基于AI的个人智能记账工具，通过自然语言交互实现「一句话极速记账、查账」。
你只需说"早餐25元咖啡，支付宝付款"或"工资到账银行卡18000元"，系统将自动解析金额、分类、支付方式并记录到账本中。 而且支持🔥MCP客户端使用。

您需要前往微信打开小程序《爱小记》，登录后在「设置-复制密钥」获取 Acccess Key。

![](https://img.alicdn.com/imgextra/i1/O1CN012ZuaCN23Az3yGZCcv_!!6000000007216-2-tps-768-754.png)

### Tools

- bill_query -查询账单的支出、收入和转账记录、汇总、统计账单等任何需求。

- bill_delete - 删除已存在的账单记录。返回删除的记录条数。

- bill_update - 修改已存在的账单记录。不过暂时不支持修改，我们建议先删除再重新添加。

- bill_add - 添加一笔或多笔支出、收入或转账的账单记录。

</appdetail>







## 使用流程

<usedetail id="flushContent">

部署完成拿到 URL 后，准备好支持 SSE 的 MCP Client，通过 SSETransport 进行连接。

</usedetail>









