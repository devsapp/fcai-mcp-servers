
> 注：当前项目为 Serverless Devs 应用，由于应用中会存在需要初始化才可运行的变量（例如应用部署地区、函数名等等），所以**不推荐**直接 Clone 本仓库到本地进行部署或直接复制 s.yaml 使用，**强烈推荐**通过 `s init ${模版名称}` 的方法或应用中心进行初始化，详情可参考[部署 & 体验](../start-mcp-aliyun-observability/readme.md#部署--体验) 。

# aliyun-observability2-mcp-server 帮助文档

<description>

阿里云可观测服务2.0 Observable MCP Server

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
   
- :fire: 通过 [云原生应用开发平台 CAP](https://cap.console.aliyun.com/template-detail?template=aliyun-observability-mcp-server) ，[![Deploy with Severless Devs](https://img.alicdn.com/imgextra/i1/O1CN01w5RFbX1v45s8TIXPz_!!6000000006118-55-tps-95-28.svg)](https://cap.console.aliyun.com/template-detail?template=aliyun-observability-mcp-server) 该应用。
   
</appcenter>
<deploy>
    
   
</deploy>

## 案例介绍

<appdetail id="flushContent">

### 简介

阿里云可观测 MCP服务，提供了一系列访问阿里云可观测各产品的工具能力，覆盖产品包含阿里云日志服务SLS、阿里云应用实时监控服务ARMS、阿里云云监控等，任意支持 MCP 协议的智能体助手都可快速接入。支持的产品如下:


### 工具列表

#### PaaS工具集（可观测2.0）

##### 实体管理工具 (entity)
| 工具名称 | 用途 | 关键参数 | 最佳实践 |  
|---------|------|---------|---------|  
| `umodel_get_entities` | 获取指定实体集的实体列表 | `workspace`：工作空间名称（必需）<br>`domain`：实体域（必需）<br>`entity_set_name`：实体类型（必需）<br>`regionId`：阿里云区域ID（必需） | - 用于探索可用的实体资源<br>- 支持精确查询指定实体 |
| `umodel_get_neighbor_entities` | 获取实体的邻居节点 | `workspace`：工作空间名称（必需）<br>`domain`：实体域（必需）<br>`entity_set_name`：实体类型（必需）<br>`entity_ids`：实体ID列表（必需）<br>`regionId`：阿里云区域ID（必需） | - 探索服务依赖关系<br>- 构建拓扑图 |
| `umodel_search_entities` | 搜索匹配条件的实体 | `workspace`：工作空间名称（必需）<br>`domain`：实体域（必需）<br>`entity_set_name`：实体类型（必需）<br>`search_conditions`：搜索条件<br>`regionId`：阿里云区域ID（必需） | - 支持复杂查询条件<br>- 灵活实体发现 |

##### 数据集管理工具 (dataset)  
| 工具名称 | 用途 | 关键参数 | 最佳实践 |
|---------|------|---------|---------|
| `umodel_list_data_set` | 列出指定类型的数据集 | `workspace`：工作空间名称（必需）<br>`domain`：实体域（必需）<br>`entity_set_name`：实体类型（必需）<br>`data_set_types`：数据集类型（可选）<br>`regionId`：阿里云区域ID（必需） | - 发现可用的数据集<br>- 了解数据结构和字段 |
| `umodel_search_entity_set` | 搜索实体集 | `workspace`：工作空间名称（必需）<br>`search_text`：搜索关键词（必需）<br>`regionId`：阿里云区域ID（必需） | - 通过关键词发现实体集<br>- 支持模糊搜索 |
| `umodel_list_related_entity_set` | 列出相关联的实体集 | `workspace`：工作空间名称（必需）<br>`domain`：实体域（必需）<br>`entity_set_name`：实体类型（必需）<br>`regionId`：阿里云区域ID（必需） | - 了解实体集间的关联关系<br>- 探索数据依赖 |

##### 数据查询工具 (data)
| 工具名称 | 用途 | 关键参数 | 最佳实践 |
|---------|------|---------|---------|  
| `umodel_get_metrics` | 获取实体的时序指标数据 | `workspace`：工作空间名称（必需）<br>`domain`：实体域（必需）<br>`entity_set_name`：实体类型（必需）<br>`metric_domain_name`：指标域名称（必需）<br>`metric`：指标名称（必需）<br>`regionId`：阿里云区域ID（必需） | - 支持range/instant查询<br>- 可指定时间范围和聚合方式 |
| `umodel_get_golden_metrics` | 获取黄金指标数据 | `workspace`：工作空间名称（必需）<br>`domain`：实体域（必需）<br>`entity_set_name`：实体类型（必需）<br>`regionId`：阿里云区域ID（必需） | - 快速获取关键性能指标<br>- 包含延迟、吞吐量、错误率等 |
| `umodel_get_relation_metrics` | 获取实体间关系级别的指标 | `workspace`：工作空间名称（必需）<br>`src_domain`：源实体域（必需）<br>`src_entity_set_name`：源实体类型（必需）<br>`src_entity_ids`：源实体ID列表（必需）<br>`relation_type`：关系类型（必需）<br>`direction`：关系方向（必需）<br>`regionId`：阿里云区域ID（必需） | - 分析微服务调用关系<br>- 支持服务依赖分析 |
| `umodel_get_logs` | 获取实体相关的日志数据 | `workspace`：工作空间名称（必需）<br>`domain`：实体域（必需）<br>`entity_set_name`：实体类型（必需）<br>`log_set_name`：日志集名称（必需）<br>`log_set_domain`：日志集域（必需）<br>`regionId`：阿里云区域ID（必需） | - 用于故障诊断<br>- 支持性能分析 |
| `umodel_get_events` | 获取实体的事件数据 | `workspace`：工作空间名称（必需）<br>`domain`：实体域（必需）<br>`entity_set_name`：实体类型（必需）<br>`event_set_domain`：事件集域（必需）<br>`event_set_name`：事件集名称（必需）<br>`regionId`：阿里云区域ID（必需） | - 用于异常事件分析<br>- 支持告警事件追踪 |
| `umodel_get_traces` | 获取指定trace ID的详细数据 | `workspace`：工作空间名称（必需）<br>`domain`：实体域（必需）<br>`entity_set_name`：实体类型（必需）<br>`trace_set_domain`：链路集域（必需）<br>`trace_set_name`：链路集名称（必需）<br>`trace_ids`：链路ID列表（必需）<br>`regionId`：阿里云区域ID（必需） | - 深入分析调用链<br>- 包含完整span信息 |
| `umodel_search_traces` | 基于条件搜索调用链 | `workspace`：工作空间名称（必需）<br>`domain`：实体域（必需）<br>`entity_set_name`：实体类型（必需）<br>`trace_set_domain`：链路集域（必需）<br>`trace_set_name`：链路集名称（必需）<br>`regionId`：阿里云区域ID（必需） | - 支持按持续时间、错误状态过滤<br>- 返回链路摘要信息 |
| `umodel_get_profiles` | 获取性能剖析数据 | `workspace`：工作空间名称（必需）<br>`domain`：实体域（必需）<br>`entity_set_name`：实体类型（必需）<br>`profile_set_domain`：性能剖析集域（必需）<br>`profile_set_name`：性能剖析集名称（必需）<br>`entity_ids`：实体ID列表（必需）<br>`regionId`：阿里云区域ID（必需） | - 用于性能瓶颈分析<br>- 包含CPU、内存使用情况 |

#### Shared工具集（共享工具）

##### 工作空间和域管理
| 工具名称 | 用途 | 关键参数 | 最佳实践 |
|---------|------|---------|---------|
| `introduction` | 获取服务介绍和使用说明 | 无需参数 | - 首次接入时了解服务能力<br>- 作为 LLM Agent 的自我介绍工具 |
| `list_workspace` | 获取可用工作空间列表 | `regionId`：阿里云区域ID（必需） | - 在使用其他工具前先获取工作空间<br>- 支持跨区域工作空间查询 |
| `list_domains` | 获取工作空间中的所有实体域 | `workspace`：工作空间名称（必需）<br>`regionId`：阿里云区域ID（必需） | - 在查询实体前先了解可用的域<br>- 了解数据分类情况 |

#### IaaS工具集（V1兼容）

##### SLS和CMS原生API工具
| 工具名称 | 用途 | 关键参数 | 最佳实践 |  
|---------|------|---------|---------|  
| `cms_text_to_promql` | 将自然语言转换为PromQL查询 | `text`：自然语言问题（必需）<br>`project`：项目名称（必需）<br>`metricStore`：指标存储名称（必需）<br>`regionId`：阿里云区域ID（必需） | - 智能生成PromQL语句<br>- 简化查询操作 |
| `sls_text_to_sql` | 将自然语言转换为SQL查询 | `text`：自然语言问题（必需）<br>`project`：SLS项目名称（必需）<br>`logStore`：日志存储名称（必需）<br>`regionId`：阿里云区域ID（必需） | - 智能生成SLS SQL查询<br>- 支持自然语言交互 |
| `sls_execute_sql` | 执行SLS SQL查询 | `project`：SLS项目名称（必需）<br>`logStore`：日志存储名称（必需）<br>`query`：SQL查询语句（必需）<br>`from_time`：查询开始时间（必需）<br>`to_time`：查询结束时间（必需）<br>`regionId`：阿里云区域ID（必需） | - 直接执行SQL查询<br>- 使用适当时间范围优化性能 |
| `cms_execute_promql` | 执行PromQL查询 | `project`：项目名称（必需）<br>`metricStore`：指标存储名称（必需）<br>`query`：PromQL查询语句（必需）<br>`start_time`：查询开始时间（必需）<br>`end_time`：查询结束时间（必需）<br>`regionId`：阿里云区域ID（必需） | - 查询云监控指标数据<br>- 支持标准PromQL语法 |
| `sls_list_projects` | 列出SLS项目 | `projectName`：项目名称（可选，模糊搜索）<br>`regionId`：阿里云区域ID（必需） | - 发现可用的SLS项目<br>- 支持模糊搜索 |
| `sls_execute_spl` | 执行原生SPL查询 | `query`：SPL查询语句（必需）<br>`regionId`：阿里云区域ID（必需） | - 执行复杂的SLS查询<br>- 支持高级分析功能 |
| `sls_list_logstores` | 列出指定项目的日志存储 | `project`：SLS项目名称（必需）<br>`regionId`：阿里云区域ID（必需） | - 发现项目中的日志存储<br>- 了解数据分布 |

## Installation

### Using uv (recommended)

When using [`uv`](https://docs.astral.sh/uv/) no specific installation is needed. We will
use [`uvx`](https://docs.astral.sh/uv/guides/tools/) to directly run *mcp-server-time*.

### Using PIP

Alternatively you can install `mcp-server-time` via pip:

```bash
pip install mcp-server-time
```

After installation, you can run it as a script using:

```bash
python -m mcp_server_time
```

## Configuration

### Configure for Claude.app

Add to your Claude settings:

<details>
<summary>Using uvx</summary>

```json
"mcpServers": {
  "time": {
    "command": "uvx",
    "args": ["mcp-server-time"]
  }
}
```
</details>

<details>
<summary>Using docker</summary>

```json
"mcpServers": {
  "time": {
    "command": "docker",
    "args": ["run", "-i", "--rm", "mcp/time"]
  }
}
```
</details>

<details>
<summary>Using pip installation</summary>

```json
"mcpServers": {
  "time": {
    "command": "python",
    "args": ["-m", "mcp_server_time"]
  }
}
```
</details>

### Configure for Zed

Add to your Zed settings.json:

<details>
<summary>Using uvx</summary>

```json
"context_servers": [
  "mcp-server-time": {
    "command": "uvx",
    "args": ["mcp-server-time"]
  }
],
```
</details>

<details>
<summary>Using pip installation</summary>

```json
"context_servers": {
  "mcp-server-time": {
    "command": "python",
    "args": ["-m", "mcp_server_time"]
  }
},
```
</details>

### Customization - System Timezone

By default, the server automatically detects your system's timezone. You can override this by adding the argument `--local-timezone` to the `args` list in the configuration.

Example:
```json
{
  "command": "python",
  "args": ["-m", "mcp_server_time", "--local-timezone=America/New_York"]
}
```

## Example Interactions

1. Get current time:
```json
{
  "name": "get_current_time",
  "arguments": {
    "timezone": "Europe/Warsaw"
  }
}
```
Response:
```json
{
  "timezone": "Europe/Warsaw",
  "datetime": "2024-01-01T13:00:00+01:00",
  "is_dst": false
}
```

2. Convert time between timezones:
```json
{
  "name": "convert_time",
  "arguments": {
    "source_timezone": "America/New_York",
    "time": "16:30",
    "target_timezone": "Asia/Tokyo"
  }
}
```
Response:
```json
{
  "source": {
    "timezone": "America/New_York",
    "datetime": "2024-01-01T12:30:00-05:00",
    "is_dst": false
  },
  "target": {
    "timezone": "Asia/Tokyo",
    "datetime": "2024-01-01T12:30:00+09:00",
    "is_dst": false
  },
  "time_difference": "+13.0h",
}
```

## Debugging

You can use the MCP inspector to debug the server. For uvx installations:

```bash
npx @modelcontextprotocol/inspector uvx mcp-server-time
```

Or if you've installed the package in a specific directory or are developing on it:

```bash
cd path/to/servers/src/time
npx @modelcontextprotocol/inspector uv run mcp-server-time
```

## Examples of Questions for Claude

1. "What time is it now?" (will use system timezone)
2. "What time is it in Tokyo?"
3. "When it's 4 PM in New York, what time is it in London?"
4. "Convert 9:30 AM Tokyo time to New York time"

## Build

Docker build:

```bash
cd src/time
docker build -t mcp/time .
```

## Contributing

We encourage contributions to help expand and improve mcp-server-time. Whether you want to add new time-related tools, enhance existing functionality, or improve documentation, your input is valuable.

For examples of other MCP servers and implementation patterns, see:
https://github.com/modelcontextprotocol/servers

Pull requests are welcome! Feel free to contribute new ideas, bug fixes, or enhancements to make mcp-server-time even more powerful and useful.

## License

mcp-server-time is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.

</appdetail>







## 使用流程

<usedetail id="flushContent">

部署完成拿到 URL 后，准备好支持 SSE 的 MCP Client，通过 SSETransport 进行连接。

</usedetail>









