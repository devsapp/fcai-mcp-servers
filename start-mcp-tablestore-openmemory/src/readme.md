
> 注：当前项目为 Serverless Devs 应用，由于应用中会存在需要初始化才可运行的变量（例如应用部署地区、函数名等等），所以**不推荐**直接 Clone 本仓库到本地进行部署或直接复制 s.yaml 使用，**强烈推荐**通过 `s init ${模版名称}` 的方法或应用中心进行初始化，详情可参考[部署 & 体验](#部署--体验) 。

# start-mcp-tablestore-openmemory 帮助文档

<description>

语言模型 Tablestore OPenmemory MCP Server

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

# Tablestore OpenMemory MCP : 跨会话、跨模型的智能记忆解决方案

## 1. Mem0 简介

[Mem0](https://mem0.ai/) 是一种为大型语言模型（LLM）设计的开源智能记忆层，旨在通过持续学习用户交互信息，实现跨会话的个性化与上下文连续性。其核心是构建一个动态更新的记忆系统，使AI能像人类一样"记住"用户偏好、历史行为等。其核心机制是：

1. 通过 LLM 从最新对话中动态提取关键事实或偏好并生成候选记忆。
2. 借助向量数据库（如 Chroma、Qdrant 等向量数据库）检索相似旧记忆，并由 LLM 决策对候选记忆执行新增、更新、删除或忽略等操作，保持记忆库精炼一致。
3. 对外提供简介的 Python SDK 和托管/自托管两种部署方式，易于嵌入各类聊天机器人、教育助手等个性化AI应用。

其关键流程，如上图所示，Mem0 在拿到对话信息后，会利用 LLM 对关键性的事实信息进行提取（New extracted memories），随后利用向量数据库的检索能力，获取相关记忆（Top's similar memories），之后将新旧记忆一同提交给大模型进行分析，生成针对不同记忆的操作（ADD，UPDATE，DELETE，NOOP），接着执行相关操作，实现对向量数据库的更新。

经由以上过程，可以让AI在多轮、多会话场景中记住用户偏好、历史交互及相关元数据，方便在后续对话过程中，通过向量检索，持续输出更加个性化、连贯且成本更低的响应。

## 2. 应用场景

由于 [Mem0](https://mem0.ai/) 可以在交互过程中，记忆用户的偏好、历史互动等个性化信息，所以可以方便的构建一些更加个性化的应用，例如：个性化学习助手、游戏AI、虚拟伴侣等，具体如下图所示。

## 3. Tablestore OpenMemory MCP服务

### 3.1 服务简介

> [模型上下文协议（Model Context Protocol，MCP）](https://modelcontextprotocol.io/introduction)是一个开放协议，支持大语言模型（LLM）应用程序与外部数据源及工具之间的无缝集成。 无论是开发AI驱动的集成开发环境（IDE）、增强聊天界面功能，还是创建定制化AI工作流，MCP均提供了一种标准化方案， 可将LLMs与其所需的关键背景信息高效连接。

为了提供更好的用户体验，我们在 [Mem0](https://mem0.ai/) 的 openmemory-mcp 基础上，进行改造，提供一套基于阿里云表格存储的 Mem0 MCP 服务，该服务可以在 sse 和 stdio 两种模式下运行，同时提供大量用户可自行配置的参数，例如：Mem0 使用的大语言模型、MCP 工具的描述性文本、使用的 Tablestore 实例信息等。

该服务共包含四个 MCP 工具：

1. add_memories: 添加用户记忆。
2. search_memories: 检索用户记忆。
3. list_memories: 列出用户所有记忆。
4. delete_all_memories: 删除用户所有记忆。

利用这些工具可以将对记忆的操作融入与大模型的对话过程，降低 Mem0 使用门槛。

### 3.2 服务演示

为了体现Tablestore OpenMemory MCP服务的能力，我们将 AI 客户端 [Cline](https://cline.bot/) 作为 MCP 客户端，进行效果展示。演示流程以程序员代码偏好为例，共包含三个部分，分别为代码偏好添加，代码偏好检索和代码偏好更新，具体流程及预期如下图所示：

#### 3.2.1 代码偏好添加

首先，通过对话，要求模型记忆我们的编码偏好：

此时，会触发 Mem0 的 add 功能，Mem0 自动利用 LLM 进行候选记忆提取，再生成相关操作序列（由于此时数据库中没有数据，生成操作均为 ADD）：

这时，可以发现用户相关信息被添加进入 Tablestore 实例：

#### 3.2.2 代码偏好检索

随后，询问以下内容，进行代码偏好检索（为了防止大模型从对话上下文中得知我们的相关信息，我们重新启动一个session）：

可以看到，模型成功检索到相关记忆信息"常量全部采用大写字母加下划线进行命名"，相似度分数约为0.86。同时，模型能够正确回答我的代码偏好相关信息：

#### 3.2.3 代码偏好更新

现在，我们尝试更改代码偏好信息，要求模型记忆"喜欢使用小写字母加下划线命名变量"，Mem0 会自动化的检索相关内容并进行更新：

此时，触发了代码偏好更新，同时，Tablestore 实例产生变化：

## 4. "个性化旅行规划助理" 效果演示

> 任何其他需要"长期用户记忆+即时智能推荐"的产品均可利用此能力进行产品设计。

本节将通过一个实际例子"个性化旅行规划助理"，对 Tablestore OpenMemory MCP 服务的个性化支持能力进行演示，同时，由于记忆被托管于阿里云表格存储（Tablestore），使得记忆从应用和模型中分离，我们可以随意的切换应用、模型对相同的记忆进行访问，本节同时会对这一能力进行展示。

### 4.1 演示流程

演示流程主要由两部分组成，分别为个性信息添加与旅行方案生成，如下图所示：

1. 首先在 AI 客户端 [Cline](https://cline.bot/) 中，使用阿里云百炼上的 qwen-coder-plus 作为语言生成模型，添加用户个性信息后，
2. 在另一个 AI 客户端 [CherryStudio](https://www.cherry-ai.com/) 中，切换为 qwen-max 大模型，进行个性化的旅行方案生成，验证我们的 Memory 可以跨会话跨模型进行方便的存储和提取。

### 4.2 演示效果

首先在 AI 客户端 [Cline](https://cline.bot/) 中，使用 **qwen-coder-plus** 作为语言生成模型，添加用户个性信息：

可以看到，正确生成相关操作序列，将用户的个性化信息，喜欢吃辣的东西、现在住在上海和爱看科幻电影添加进入 Tablestore 实例：

随后，切换应用及模型，在** **AI 客户端 [CherryStudio](https://www.cherry-ai.com/)  中，利用 **qwen-max** 进行周末外出游玩计划制定：

可以看到，模型正确的访问相关记忆信息，制定了一份依赖于用户的个性化方案，充分考虑到了用户住在上海，嗜辣以及爱看科幻电影，将其它地方的记忆使用了起来，做到了跨会话跨模型进行方便的存储和提取。

## 5. 如何运行 MCP 服务

本 MCP 服务可以通过 uvx 指令快速启动，本章将介绍如何运行该 MCP 服务。

### 5.1 安装 uv

安装 uv 有两种方式可以选择：

1. 使用现有的 python3 安装 uv，在命令行输入如下指令：
```shell
pip3 install uv
```

2. 使用源码安装：
```shell
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### 5.2 配置环境变量

本 MCP 服务的参数需要通过环境变量进行配置，具体变量设置见下方表格：

| 变量名 | 必填 | 含义 | 默认值 |
| --- | --- | --- | --- |
| SERVER_HOST | 否 | MCP server 的 host | 0.0.0.0 |
| SERVER_PORT | 否 | MCP server 的 port | 8765 |
| TABLESTORE_INSTANCE_NAME | 是(yes) | 实例名 | - |
| TABLESTORE_ENDPOINT | 是(yes) | 实例访问地址 | - |
| TABLESTORE_ACCESS_KEY_ID | 是(yes) | 秘钥 ID | - |
| TABLESTORE_ACCESS_KEY_SECRET | 是(yes) | 秘钥 SECRET | - |
| TABLESTORE_STS_TOKEN | 否 | STS Token | None |
| TABLESTORE_VECTOR_DIMENSION | 否 | 向量维度 | 1536 |
| OPENAI_API_KEY | 是(yes) | 百炼API KEY | - |
| OPENAI_BASE_URL | 是(yes) | 兼容 OpenAI 的大模型的 URL。如果使用阿里云百炼，可以使用： https://dashscope.aliyuncs.com/compatible-mode/v1 | - |
| LLM_MODEL | 否 | 大语言模型的名字 | qwen-plus |
| EMBEDDER_MODEL | 否 | 编码模型的名字 | text-embedding-v4 |
| TOOL_ADD_MEMORIES_DESCRIPTION | 否 | 添加记忆的MCP TOOL描述文字 | 参考settings.py |
| TOOL_SEARCH_MEMORIES_DESCRIPTION | 否 | 检索记忆的MCP TOOL描述文字 | 参考settings.py |
| TOOL_LIST_MEMORIES_DESCRIPTION | 否 | 显示所有记忆的MCP TOOL描述文字 | 参考settings.py |
| TOOL_DELETE_ALL_MEMORIES_DESCRIPTION | 否 | 删除所有记忆的MCP TOOL描述文字 | 参考settings.py |
| MCP_STDIO_USER_ID | 否 | stdio模式下使用的用户id | stdio_default_user |
| MCP_STDIO_CLIENT_NAME | 否 | stdio模式下使用的客户端名 | stdio_default_client |

其中，需要注意 LLM_MODEL（大语言模型名字）的设置，该字段将决定 Mem0 能否顺利运行。因大模型的返回具有不确定性，若模型选择不当，可能导致程序内部，部分结果无法正确解析，出现报错，目前测试发现 qwen-plus、qwen-max-0125 、qwen-turbo、qwen-long 兼容 Mem0 框架，qwen-max、qwq-plus 等不兼容 Mem0 框架。

### 5.3 使用uvx运行mcp服务 

使用 `uvx` 运行的工具会在临时的隔离环境中安装和运行。`uvx` 命令可以在不安装工具的情况下直接运行工具。

我们的服务支持 sse 和 stdio 两种模式启动。

#### 5.3.1 sse 模式启动

首先，在命令行输入 sse 模式启动指令：
```shell
export OPENAI_API_KEY="<你的百炼_api_key>"
export OPENAI_BASE_URL="https://dashscope.aliyuncs.com/compatible-mode/v1"
export TABLESTORE_ENDPOINT="<your_tablestore_endpoint>"
export TABLESTORE_INSTANCE_NAME="<your_tablestore_instance_name>"
export TABLESTORE_ACCESS_KEY_ID="<your_tablestore_access_key_id>"
export TABLESTORE_ACCESS_KEY_SECRET="<your_tablestore_access_key_secret>"
uvx tablestore-openmemory-mcp --transport=sse
```

在命令行键入指令后，会输出以下信息：

显示，服务启动在 0.0.0.0:8765，这时我们可以在 AI 客户端 [Cline](https://cline.bot/)  中按照以下格式配置服务相关信息：
```json
"tablestore-openmemory-sse": {
  "autoApprove": [
  "search_memories",
  "delete_all_memories",
  "list_memories",
  "add_memories"
  ],
  "disabled": true,
  "timeout": 60,
  "type": "sse",
  "url": "http://localhost:8765/mcp/{client_name}/sse/{user_id}"
}
```

`url` 中可以自行随意指定 `client_name` 和 `user_id` 调整 Mem0 操作对象，可以做到不同场景和不同用户的隔离。若不需要自动触发工具调用，可以去掉 `autoApprove` 字段。

#### 5.3.2 stdio 模式启动

我们可以通过在命令行中输入如下参数进行启动：
```shell
export OPENAI_API_KEY="<你的百炼_api_key>"
export OPENAI_BASE_URL="https://dashscope.aliyuncs.com/compatible-mode/v1"
export TABLESTORE_ENDPOINT="<your_tablestore_endpoint>"
export TABLESTORE_INSTANCE_NAME="<your_tablestore_instance_name>"
export TABLESTORE_ACCESS_KEY_ID="<your_tablestore_access_key_id>"
export TABLESTORE_ACCESS_KEY_SECRET="<your_tablestore_access_key_secret>"
uvx tablestore-openmemory-mcp --transport=stdio
```

同时，stdio 模式可以直接在 cline 中进行配置，AI 客户端 [Cline](https://cline.bot/)  会自动启动基于标准输入输出流的服务，具体配置如下：

```json
"tablestore-openmemory-stdio": {
  "autoApprove": [
    "search_memories",
    "delete_all_memories",
    "list_memories",
    "add_memories"
  ],
  "disabled": false,
  "timeout": 60,
  "type": "stdio",
  "command": "uvx",
  "args": [
    "tablestore-openmemory-mcp",
    "--transport",
    "stdio"
  ],
  "env": {
    "OPENAI_API_KEY": "<你的百炼_api_key>",
    "OPENAI_BASE_URL": "https://dashscope.aliyuncs.com/compatible-mode/v1",
    "TABLESTORE_ENDPOINT": "<your_tablestore_endpoint>",
    "TABLESTORE_INSTANCE_NAME": "<your_tablestore_instance_name>",
    "TABLESTORE_ACCESS_KEY_ID": "<your_tablestore_access_key_id>",
    "TABLESTORE_ACCESS_KEY_SECRET": "<your_tablestore_access_key_secret>",
  }
}
```

若需要提供一些额外配置，需要在 `env` 字段根据5.2节中表格进行设置。若不需要自动触发工具调用，可以去掉 `autoApprove` 字段。

## 6. 总结

Tablestore OpenMemory MCP 服务基于 Mem0，结合阿里云表格存储，提供标准化的模型上下文协议（MCP）接口，支持多种记忆操作工具（如添加、检索、删除记忆），便于集成到各类 AI 应用中，支持用户级、会话级和代理级的长期与短期上下文记忆管理，提升AI 在多轮对话中的个性化与连贯性。

最后，欢迎加入我们的钉钉开源群 (钉钉群号： 36165029092)，与我们一起探讨 Agent Memory 相关问题。

</disclaimers>

## 部署 & 体验

<appcenter>
   
- :fire: 通过 [云原生应用开发平台 CAP](https://cap.console.aliyun.com/template-detail?template=mcp-tablestore-openmemory) ，[![Deploy with Severless Devs](https://img.alicdn.com/imgextra/i1/O1CN01w5RFbX1v45s8TIXPz_!!6000000006118-55-tps-95-28.svg)](https://cap.console.aliyun.com/template-detail?template=mcp-tablestore-openmemory) 该应用。
   
</appcenter>
<deploy>
    
   
</deploy>

## 案例介绍

<appdetail id="flushContent">

</appdetail>







## 使用流程

<usedetail id="flushContent">

部署完成拿到 URL 后，准备好支持 SSE 的 MCP Client，通过 SSETransport 进行连接。

</usedetail>









