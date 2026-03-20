
> 注：当前项目为 Serverless Devs 应用，由于应用中会存在需要初始化才可运行的变量（例如应用部署地区、函数名等等），所以**不推荐**直接 Clone 本仓库到本地进行部署或直接复制 s.yaml 使用，**强烈推荐**通过 `s init ${模版名称}` 的方法或应用中心进行初始化，详情可参考[部署 & 体验](#部署--体验) 。

# AgentRun 知识库 MCP Server 帮助文档

<description>

AgentRun 知识库 MCP Server 模版，提供知识库检索能力

</description>


## 资源准备

使用该项目，您需要有开通以下服务并拥有对应权限：

<service>



| 服务/业务 |  权限  | 相关文档 |
| --- |  --- | --- |
| 函数计算 |  AliyunFCFullAccess | [帮助文档](https://help.aliyun.com/product/2508973.html) [计费文档](https://help.aliyun.com/document_detail/2512928.html) |
| AgentRun |  AliyunAgentRunFullAccess | [帮助文档](https://help.aliyun.com/product/2842481.html) |
| 百炼 |  AliyunBailianDataFullAccess | [帮助文档](https://help.aliyun.com/product/2400256.html) |

</service>

<remark>



</remark>

<disclaimers>



</disclaimers>

## 部署 & 体验

<appcenter>
   
- :fire: 通过 [云原生应用开发平台 CAP](https://functionai.console.aliyun.com/template-detail?template=agentrun-knowledgebase-mcp) ，[![Deploy with Severless Devs](https://img.alicdn.com/imgextra/i1/O1CN01w5RFbX1v45s8TIXPz_!!6000000006118-55-tps-95-28.svg)](https://functionai.console.aliyun.com/template-detail?template=agentrun-knowledgebase-mcp) 该应用。
   
</appcenter>
<deploy>
    
   
</deploy>

## 案例介绍

<appdetail id="flushContent">

# AgentRun 知识库 MCP Server

## 1. 简介

AgentRun 知识库 MCP Server 是一个基于阿里云 AgentRun 知识库服务的 MCP（Model Context Protocol）服务器，提供标准化的知识库检索能力。通过该服务，您可以将 AgentRun 知识库无缝集成到支持 MCP 协议的 AI 客户端中，实现智能问答和知识检索功能。

### 1.1 什么是 AgentRun

[AgentRun](https://help.aliyun.com/product/2842481.html) 是阿里云提供的智能体运行时服务，支持知识库管理、向量检索等功能。用户可以通过 AgentRun 创建和管理知识库，上传文档并进行向量化处理，实现高效的语义检索。

### 1.2 什么是 MCP

[模型上下文协议（Model Context Protocol，MCP）](https://modelcontextprotocol.io/introduction) 是一个开放协议，支持大语言模型（LLM）应用程序与外部数据源及工具之间的无缝集成。无论是开发 AI 驱动的集成开发环境（IDE）、增强聊天界面功能，还是创建定制化 AI 工作流，MCP 均提供了一种标准化方案，可将 LLMs 与其所需的关键背景信息高效连接。

## 2. 功能特性

该 MCP Server 提供以下工具：

| 工具名称 | 功能描述 |
| --- | --- |
| search | 根据查询语句检索知识库，返回相关内容 |

### 2.1 search 工具

**功能**: 使用自然语言查询 AgentRun 知识库，获取相关的检索结果。

**参数**:
| 参数名 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- |
| query | string | 是 | 用于检索知识库的查询语句 |

**返回值**: 从知识库中检索到的相关内容。

## 3. 环境变量配置

| 变量名 | 必填 | 含义 | 默认值 |
| --- | --- | --- | --- |
| KNOWLEDGE_BASE_NAME | 是 | AgentRun 上注册的知识库名称 | - |

## 4. 使用场景

- **智能客服**: 将企业知识库接入 AI 客服系统，实现自动问答
- **文档助手**: 为技术文档、产品手册等提供智能检索能力
- **知识管理**: 构建企业内部知识检索平台
- **AI 编程助手**: 为开发工具提供代码库、API 文档检索能力

## 5. 快速开始

### 5.1 前置条件

1. 在阿里云 AgentRun 控制台创建知识库并上传文档
2. 记录知识库名称，用于配置环境变量
3. 确保已配置相应的 IAM 角色权限

### 5.2 部署服务

通过云原生应用开发平台 CAP 一键部署，部署时需要配置：
- **地域**: 选择部署地区
- **知识库名称**: 填写 AgentRun 上创建的知识库名称
- **服务角色**: 配置访问 AgentRun 知识库的 RAM 角色

### 5.3 连接使用

部署完成后，获取服务 URL，在支持 SSE 的 MCP 客户端中配置：

```json
{
  "agentrun-knowledgebase": {
    "type": "sse",
    "url": "https://your-service-url/sse"
  }
}
```

## 6. 示例

在 AI 客户端中，您可以通过自然语言调用 search 工具：

**用户**: 帮我查找关于产品退款政策的相关信息

**AI 助手**: (调用 search 工具，query="产品退款政策")

**返回结果**: 从知识库中检索到的退款政策相关内容...

</appdetail>







## 使用流程

<usedetail id="flushContent">

部署完成拿到 URL 后，准备好支持 SSE 的 MCP Client，通过 SSETransport 进行连接。

配置示例：
```json
{
  "agentrun-knowledgebase": {
    "type": "sse",
    "url": "https://your-service-url/sse"
  }
}
```

</usedetail>

## 二次开发指南

<development id="flushContent">

### 项目结构

```
src/
├── code/
│   ├── main.py           # MCP Server 主程序
│   └── requirements.txt  # Python 依赖
├── mcp-schema.json       # MCP 工具 Schema 定义
├── s.yaml                # Serverless Devs 配置
└── variable.yaml         # 环境变量配置
```

### 本地开发

1. 安装依赖：
```bash
cd src/code
pip install -r requirements.txt
```

2. 设置环境变量：
```bash
export KNOWLEDGE_BASE_NAME="your-knowledge-base-name"
```

3. 启动服务：
```bash
python -m uvicorn main:app --host 0.0.0.0 --port 8080
```

### 扩展开发

您可以在 `main.py` 中添加更多 MCP 工具，例如：

```python
@mcp.tool()
async def another_tool(param: str) -> str:
    """Tool description"""
    # 工具实现
    return result
```

</development>






