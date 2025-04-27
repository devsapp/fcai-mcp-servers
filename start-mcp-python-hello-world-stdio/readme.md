
> 注：当前项目为 Serverless Devs 应用，由于应用中会存在需要初始化才可运行的变量（例如应用部署地区、函数名等等），所以**不推荐**直接 Clone 本仓库到本地进行部署或直接复制 s.yaml 使用，**强烈推荐**通过 `s init ${模版名称}` 的方法或应用中心进行初始化，详情可参考[部署 & 体验](#部署--体验) 。

# start-mcp-python-hello-world-stdio 帮助文档

<description>

基于 Python 的 FC MCP STDIO Server 案例

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
   
- :fire: 通过 [云原生应用开发平台 CAP](https://cap.console.aliyun.com/template-detail?template=start-mcp-python-hello-world-stdio) ，[![Deploy with Severless Devs](https://img.alicdn.com/imgextra/i1/O1CN01w5RFbX1v45s8TIXPz_!!6000000006118-55-tps-95-28.svg)](https://cap.console.aliyun.com/template-detail?template=start-mcp-python-hello-world-stdio) 该应用。
   
</appcenter>
<deploy>
    
   
</deploy>

## 案例介绍

<appdetail id="flushContent">

基于 FastMCP 构建的 Serverless MCP STDIO 服务端应用

## 功能特性

- 提供示例工具端点 `hello` 返回 "Hello World!"
- 支持阿里云函数计算部署

</appdetail>







## 使用流程

<usedetail id="flushContent">

### 部署

点击“一键部署”按钮即可。默认使用了 `supergateway` 进行 SSE 代理，可使用支持 SSE 的 Client 进行连接。

</usedetail>

## 二次开发指南

<development id="flushContent">

### 环境要求

- Python ≥3.10
- pip 包管理工具

### 安装依赖

```bash
pip install -r requirements.txt
```

### 本地运行

```bash
python3 main.py
```

</development>






