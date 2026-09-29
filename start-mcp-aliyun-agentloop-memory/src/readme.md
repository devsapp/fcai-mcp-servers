
> 注：当前项目为 Serverless Devs 应用，由于应用中会存在需要初始化才可运行的变量（例如应用部署地区、函数名等等），所以**不推荐**直接 Clone 本仓库到本地进行部署或直接复制 s.yaml 使用，**强烈推荐**通过 `s init ${模版名称}` 的方法或应用中心进行初始化，详情可参考[部署 & 体验](#部署--体验) 。

# mcp-agentloop-memory 帮助文档

<description>

AgentLoop Memory MCP Server

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
   
- :fire: 通过 [云原生应用开发平台 CAP](https://functionai.console.aliyun.com/template-detail?template=mcp-agentloop-memory) ，[![Deploy with Severless Devs](https://img.alicdn.com/imgextra/i1/O1CN01w5RFbX1v45s8TIXPz_!!6000000006118-55-tps-95-28.svg)](https://functionai.console.aliyun.com/template-detail?template=mcp-agentloop-memory) 该应用。
   
</appcenter>
<deploy>
    
   
</deploy>

## 案例介绍

<appdetail id="flushContent">

### alibabacloud-agentloop-memory-mcp-server

阿里云 AgentLoop MemoryStore 的 MCP Server 实现，为 AI Agent 提供长期记忆管理能力，支持通过 MCP 协议（SSE 传输）进行记忆的增删改查和语义搜索。

#### AgentLoop MemoryStore

[AgentLoop MemoryStore](https://www.alibabacloud.com/) 是阿里云提供的全托管 AI Agent 长期记忆服务。它为 AI Agent 提供智能记忆层，使其能够跨会话记住用户偏好、持续学习并实现个性化交互，适用于智能客服、个人助理、教育辅导等场景。

**核心特性：**

- **多维度记忆**：自动从对话中提取用户偏好、事实陈述、会话摘要等结构化记忆，支持自定义提取策略
- **分层检索**：L1 混合检索 → L2 Rerank 精排 → L3 Agentic Search，兼顾召回广度与精度
- **异步提取**：记忆处理异步执行，不阻塞 Agent 主流程，支持弹性扩缩容
- **全托管**：无需搭建向量数据库或维护存储实例，开通即用
- **可观测**：内置监控大盘，覆盖检索延迟、Token 消耗、存储量等核心指标

本案例将 AgentLoop MemoryStore 封装为标准 [MCP](https://modelcontextprotocol.io/) Server，支持 Cursor、Claude Desktop 等 MCP 客户端直接接入。


#### 安装

```bash
pip install alibabacloud-agentloop-memory-mcp-server
```

#### 快速开始

##### 1. 配置环境变量

```bash
export ALIBABA_CLOUD_ACCESS_KEY_ID=your_access_key_id
export ALIBABA_CLOUD_ACCESS_KEY_SECRET=your_access_key_secret
export ALIBABA_CLOUD_REGION_ID=cn-hangzhou
export ALIBABA_CLOUD_WORKSPACE=your_workspace_name
export ALIBABA_CLOUD_MEMORY_STORE=your_memory_store_name
```

##### 2. 启动服务

```bash
# 使用 python -m 启动
python -m mcp_server_agentloop_memory

# 或使用命令行入口
alibabacloud-agentloop-memory-mcp-server

# 指定参数启动
python -m mcp_server_agentloop_memory \
  --access-key-id <your_ak_id> \
  --access-key-secret <your_ak_secret> \
  --region-id cn-hangzhou \
  --workspace <workspace_name> \
  --memory-store <memory_store_name> \
  --port 8080
```

##### 3. 连接 MCP Client

服务启动后，MCP Client 通过 SSE 连接：

```
GET http://localhost:8080/mcp/{client_name}/sse/{user_id}
```

- `client_name`：客户端标识（如 `cursor`、`my-agent`），映射为 `agent_id`
- `user_id`：用户标识，用于隔离不同用户的记忆数据

#### CLI 参数

| 参数 | 环境变量 | 默认值 | 说明 |
|------|---------|--------|------|
| `--access-key-id` | `ALIBABA_CLOUD_ACCESS_KEY_ID` | - | 阿里云 AccessKey ID |
| `--access-key-secret` | `ALIBABA_CLOUD_ACCESS_KEY_SECRET` | - | 阿里云 AccessKey Secret |
| `--region-id` | `ALIBABA_CLOUD_REGION_ID` | `cn-hangzhou` | 阿里云区域 |
| `--workspace` | `ALIBABA_CLOUD_WORKSPACE` | - | Workspace 名称 |
| `--memory-store` | `ALIBABA_CLOUD_MEMORY_STORE` | - | Memory Store 名称 |
| `--host` | - | `0.0.0.0` | 监听地址 |
| `--port` | - | `8080` | 监听端口 |
| `--log-level` | - | `INFO` | 日志级别 |

#### MCP Tools

| 工具名 | 参数 | 说明 |
|--------|------|------|
| `add_memories` | `text: str` | 添加记忆。当用户分享个人信息、偏好或要求记住某些内容时调用 |
| `search_memory` | `query: str` | 语义搜索记忆。用户提问时自动调用，返回按相关度排序的记忆 |
| `list_memories` | 无 | 列出当前用户的所有记忆 |
| `delete_memories` | `memory_ids: list[str]` | 按 ID 删除指定记忆 |
| `delete_all_memories` | 无 | 删除当前用户的所有记忆 |

#### 权限要求

需要阿里云 RAM 用户具有 AgentLoop MemoryStore 相关 API 的访问权限。获取和管理 AccessKey 请参考[阿里云 AccessKey 管理](https://help.aliyun.com/document_detail/53045.html)。

#### 开发

```bash
# 安装开发依赖
pip install -e ".[dev]"

# 运行测试（需要配置环境变量）
pytest tests/ -v
```




</appdetail>







## 使用流程

<usedetail id="flushContent">

部署完成拿到 URL 后，准备好支持 SSE 的 MCP Client，通过 SSETransport 进行连接。

</usedetail>

## 二次开发指南

<development id="flushContent">
</development>






