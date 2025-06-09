
> 注：当前项目为 Serverless Devs 应用，由于应用中会存在需要初始化才可运行的变量（例如应用部署地区、函数名等等），所以**不推荐**直接 Clone 本仓库到本地进行部署或直接复制 s.yaml 使用，**强烈推荐**通过 `s init ${模版名称}` 的方法或应用中心进行初始化，详情可参考[部署 & 体验](#部署--体验) 。

# start-fc-mcp-server 帮助文档

<description>

阿里云 FC MCP 服务

</description>


## 资源准备

使用该项目，您需要有开通以下服务并拥有对应权限：

<service>



| 服务/业务 |  权限  | 相关文档 |
| --- |  --- | --- |
| 函数计算 |  AliyunFCFullAccess | [帮助文档](https://help.aliyun.com/product/2508973.html) [计费文档](https://help.aliyun.com/document_detail/2512928.html) |
| 

</service>

<remark>



</remark>

<disclaimers>



</disclaimers>

## 部署 & 体验

<appcenter>
   
- :fire: 通过 [云原生应用开发平台 CAP](https://cap.console.aliyun.com/template-detail?template=start-mcp-aliyun-fc) ，[![Deploy with Severless Devs](https://img.alicdn.com/imgextra/i1/O1CN01w5RFbX1v45s8TIXPz_!!6000000006118-55-tps-95-28.svg)](https://cap.console.aliyun.com/template-detail?template=start-mcp-aliyun-fc) 该应用。
   
</appcenter>
<deploy>
    
   
</deploy>

## 案例介绍

<appdetail id="flushContent">

# FC MCP Server

模型上下文协议 (MCP) 服务器，为 AI 提供工具，使其能够通过标准化接口与FC OpenAPI进行交互。此实现基于阿里云 Open API与Serverless Devs工具，使 AI 代理能够无缝地执行云资源操作。

## 配置

### 模式 1：使用本地文件

#### 下载

从 Github 下载：

```bash
git clone https://github.com/aliyun/alibabacloud-fc-mcp-server.git
```

#### MCP 集成

在 MCP 客户端配置文件中添加以下配置：
```json
{
  "mcpServers": {
    "alibabacloud-fc-mcp-server": {
      "command": "npx",
      "args": ["alibabacloud-fc-mcp-server"],
      "env": {
        "ALIBABA_CLOUD_ACCESS_KEY_ID": "your_alibaba_cloud_access_key_id",
        "ALIBABA_CLOUD_ACCESS_KEY_SECRET": "your_alibaba_cloud_access_key_secret"
      }
    }
  }
}
```

### 模式 2：使用源代码构建

#### 安装

使用以下包安装 MCP 服务器：

```bash
npm install alibabacloud-fc-mcp-server
```

#### MCP 集成

在 MCP 客户端配置文件中添加以下配置：

```json
{
  "mcpServers": {
    "alibabacloud-fc-mcp-server": {
      "command": "npx",
      "args": ["alibabacloud-fc-mcp-server"],
      "env": {
        "ALIBABA_CLOUD_ACCESS_KEY_ID": "your_alibaba_cloud_access_key_id",
        "ALIBABA_CLOUD_ACCESS_KEY_SECRET": "your_alibaba_cloud_access_key_secret"
      }
    }
  }
}
```

## 组件

### 工具
FC MCP Server 包含的工具详见此链接：[FC MCP Tools](https://github.com/aliyun/alibabacloud-fc-mcp-server?tab=readme-ov-file#tools)

</appdetail>


## 使用流程

<usedetail id="flushContent">

部署完成拿到 URL 后，准备好支持 SSE 的 MCP Client，通过 SSETransport 进行连接。

</usedetail>