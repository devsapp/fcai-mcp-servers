
> 注：当前项目为 Serverless Devs 应用，由于应用中会存在需要初始化才可运行的变量（例如应用部署地区、函数名等等），所以**不推荐**直接 Clone 本仓库到本地进行部署或直接复制 s.yaml 使用，**强烈推荐**通过 `s init ${模版名称}` 的方法或应用中心进行初始化，详情可参考[部署 & 体验](#部署--体验) 。

# aliyun-dms-mcp-server 帮助文档

<description>

阿里云DMS MCP 服务


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

- :fire: 通过 [云原生应用开发平台 CAP](https://cap.console.aliyun.com/template-detail?template=aliyun-dms-mcp-server) ，[![Deploy with Severless Devs](https://img.alicdn.com/imgextra/i1/O1CN01w5RFbX1v45s8TIXPz_!!6000000006118-55-tps-95-28.svg)](https://cap.console.aliyun.com/template-detail?template=aliyun-dms-mcp-server) 该应用。

</appcenter>
<deploy>

</deploy>

## 案例介绍

<appdetail id="flushContent">

# AlibabaCloud DMS MCP Server

**AI 首选的统一数据管理网关，支持30多种数据源**连接的多云通用数据MCP Server，一站式解决**跨源数据安全访问**。

- 支持阿里云全系：RDS、PolarDB、ADB系列、Lindorm系列、TableStore系列、Maxcompute系列。
- 支持主流数据库/数仓：MySQL、MariaDB、PostgreSQL、Oracle、SQLServer、Redis、MongoDB、StarRocks、Clickhouse、SelectDB、DB2、OceanBase、Gauss、BigQuery等。
  
<img src="https://dms-static.oss-cn-hangzhou.aliyuncs.com/mcp-readme/architecture-0508.jpg" alt="Architecture" width="60%">


---

## 核心特性
为AI提供统一的**数据接入层**与**元数据访问层**，通过标准化接口解决：  
- 数据源碎片化导致的MCP Server维护成本  
- 异构协议间的兼容性问题  
- 账号权限不受控、操作无审计带来的安全问题  

同时，通过MCP将获得以下特性：  
- **NL2SQL**：通过自然语言执行SQL，获得数据结果  
- **代码生成**：通过该服务获取schema信息，生成DAO代码或进行结构分析  
- **取数**：通过SQL自动路由准确数据源获得数据，为上层业务提供数据支持  
- **安全**：精细的访问控制和可审计性  

## 使用案例
1. 代码生成：通过DMS获取表的元数据信息，辅助准确生成DAO相关的代码
2. 问数：通过DMS的NL2SQL和取数工具，通过自然语言执行SQL获取取数结果

DMS&Lingma 生成DAO代码
<video controls width="640" height="360">
  <source src="https://cloud.video.taobao.com/vod/-Tj9eikaD8OkcWx-aMtfrvjQ76u4MxaUVEcQR4tCBSY.mp4" type="video/mp4">
</video>
## 使用案例
1. 代码生成：通过DMS获取表的元数据信息，辅助准确生成DAO相关的代码
2. 问数：通过DMS的NL2SQL和取数工具，通过自然语言执行SQL获取取数结果

DMS&Lingma 生成DAO代码
<video controls width="640" height="360">
  <source src="https://cloud.video.taobao.com/vod/-Tj9eikaD8OkcWx-aMtfrvjQ76u4MxaUVEcQR4tCBSY.mp4" type="video/mp4">
</video>

## 工具清单

### 元数据相关
#### addInstance：将实例添加到 DMS。如果实例已存在，则返回已有实例信息。

- **db_user** (字符串, 必需): 用于连接数据库的用户名。
- **db_password** (字符串, 必需): 用于连接数据库的密码。
- **instance_resource_id** (字符串, 可选): 实例的资源 ID，通常由云服务提供商分配。
- **host** (字符串, 可选): 实例的连接地址。
- **port** (字符串, 可选): 实例的连接端口号。
- **region** (字符串, 可选): 实例所在的区域（例如 "cn-hangzhou"）。

#### getInstance：根据 host 和 port 信息从 DMS 中获取实例详细信息。

- **host** (字符串, 必需): 实例的连接地址。
- **port** (字符串, 必需): 实例的连接端口号。
- **sid** (字符串, 可选): Oracle 类数据库所需，默认为 None。

#### searchDatabase：根据 schemaName 在 DMS 中搜索数据库。

- **search_key** (字符串, 必需): schemaName。
- **page_number** (整数, 可选): 要检索的页码（从 1 开始），默认为 1。
- **page_size** (整数, 可选): 每页的结果数量，最多 1000，默认为 200。

#### getDatabase：从 DMS 中获取特定数据库的详细信息。

- **host** (字符串, 必需): 实例的连接地址。
- **port** (字符串, 必需): 实例的连接端口号。
- **schema_name** (字符串, 必需): 数据库名。
- **sid** (字符串, 可选): Oracle 类数据库所需，默认为 None。

#### listTable：根据 databaseId 和 tableName 在 DMS 中搜索数据表。

- **database_id** (字符串, 必需): 用于限定搜索范围的数据库 ID（可通过 getDatabase 工具获取）。
- **search_name** (字符串, 必需): 作为搜索关键词的非空字符串，用于匹配表名。
- **page_number** (整数, 可选): 分页页码（默认：1）。
- **page_size** (整数, 可选): 每页结果数量（默认：200，最大：200）。

#### getTableDetailInfo：获取特定数据表的详细元数据信息，包括字段和索引详情。

- **table_guid** (字符串, 必需): 表的唯一标识符（格式：dmsTableId.schemaName.tableName），可通过 searchTable 或 listTable 工具获取。

---

### SQL 执行相关

#### executeScript：通过 DMS 执行 SQL 脚本并返回结果。

- **database_id** (字符串, 必需): DMS 数据库 ID，可通过 getDatabase 工具获取。
- **script** (字符串, 必需): 要执行的 SQL 脚本内容。

---

### NL2SQL 相关

#### nl2sql：将自然语言问题转换为可执行的 SQL 查询。

- **question** (字符串, 必需): 需要转换为 SQL 的自然语言问题。
- **database_id** (整数, 必需): DMS 数据库 ID，可通过 getDatabase 工具获取。
- **knowledge** (字符串, 可选): 用于辅助 SQL 生成的额外上下文或数据库知识。

---

## 支持的数据源
| DataSource/Tool       | **NL2SQL** *nlsql* | **Execute script** *executeScript* | **Show schema** *getTableDetailInfo* | **Access control** *default* | **Audit log** *default* |
|-----------------------|--------------------|------------------------------------|--------------------------------------|-----------------------------|------------------------|
| MySQL                 | ✅                  | ✅                                  | ✅                                    | ✅                           | ✅                      |
| MariaDB               | ✅                  | ✅                                  | ✅                                    | ✅                           | ✅                      |
| PostgreSQL            | ✅                  | ✅                                  | ✅                                    | ✅                           | ✅                      |
| Oracle                | ✅                  | ✅                                  | ✅                                    | ✅                           | ✅                      |
| SQLServer             | ✅                  | ✅                                  | ✅                                    | ✅                           | ✅                      |
| Redis                 | ✅                  | ✅                                  | ✅                                    | ✅                           | ✅                      |
| MongoDB               | ✅                  | ✅                                  | ✅                                    | ✅                           | ✅                      |
| StarRocks             | ✅                  | ✅                                  | ✅                                    | ✅                           | ✅                      |
| Clickhouse            | ✅                  | ✅                                  | ✅                                    | ✅                           | ✅                      |
| SelectDB              | ✅                  | ✅                                  | ✅                                    | ✅                           | ✅                      |
| DB2                   | ✅                  | ✅                                  | ✅                                    | ✅                           | ✅                      |
| OceanBase             | ✅                  | ✅                                  | ✅                                    | ✅                           | ✅                      |
| Gauss                 | ✅                  | ✅                                  | ✅                                    | ✅                           | ✅                      |
| BigQuery              | ✅                  | ✅                                  | ✅                                    | ✅                           | ✅                      |
| PolarDB               | ✅                  | ✅                                  | ✅                                    | ✅                           | ✅                      |
| PolarDB-X             | ✅                  | ✅                                  | ✅                                    | ✅                           | ✅                      |
| AnalyticDB            | ✅                  | ✅                                  | ✅                                    | ✅                           | ✅                      |
| Lindorm               | ✅                  | ✅                                  | ✅                                    | ✅                           | ✅                      |
| TableStore            | ✅                  | ✅                                  | ✅                                    | ✅                           | ✅                      |
| Maxcompute            | ✅                  | ✅                                  | ✅                                    | ✅                           | ✅                      |
| Hologres              | ✅                  | ✅                                  | ✅                                    | ✅                           | ✅                      |

---

## 快速开始



## Contact us

如果您有使用问题或建议, 请加入[Alibaba Cloud DMS MCP讨论组](https://h5.dingtalk.com/circle/joinCircle.html?corpId=dinga0bc5ccf937dad26bc961a6cb783455b&token=2f373e6778dcde124e1d3f22119a325b&groupCode=v1,k1,NqFGaQek4YfYPXVECdBUwn+OtL3y7IHStAJIO0no1qY=&from=group&ext=%7B%22channel%22%3A%22QR_GROUP_NORMAL%22%2C%22extension%22%3A%7B%22groupCode%22%3A%22v1%2Ck1%2CNqFGaQek4YfYPXVECdBUwn%2BOtL3y7IHStAJIO0no1qY%3D%22%2C%22groupFrom%22%3A%22group%22%7D%2C%22inviteId%22%3A2823675041%2C%22orgId%22%3A784037757%2C%22shareType%22%3A%22GROUP%22%7D&origin=11) (钉钉群号:129600002740) 进行讨论.

<img src="http://dms-static.oss-cn-hangzhou.aliyuncs.com/mcp-readme/ding-zh-cn.jpg" alt="DingTalk" width="60%">



## License
本项目采用Apache 2.0许可证

</appdetail>

## 使用流程

<usedetail id="flushContent">

### 步骤一   
通过[FunctionAI MCP市场](https://cap.console.aliyun.com/mcp/274) 部署完成后，在集成向导中复制MCP Client的连接配置，准备好支持 SSE 的 MCP Client，通过 SSETransport 进行连接。

<img src="https://img.alicdn.com/imgextra/i1/O1CN01i7EuVJ1SZ8ARiPSj1_!!6000000002260-0-tps-3414-1576.jpg" alt="MCP Server" width="80%">

<img src="https://img.alicdn.com/imgextra/i4/O1CN01vbDOML1LI02jGV936_!!6000000001275-2-tps-1888-1446.png" alt="MCP Client" width="80%">

### 步骤二
在通过 DMS 访问数据库实例之前，请先将实例添加至 DMS 中。可以通过以下两种方式进行实例添加：

方法一：使用 DMS MCP Server 提供的"addInstance"工具快速添加实例。
方法二：通过 [DMS 控制台](https://dms.aliyun.com/?spm=5176.28197581.d_mcp.1.64c25a9e1lLUHz) 添加实例，具体操作请参考使用文档：[云数据库录入](https://help.aliyun.com/zh/dms/getting-started/register-an-apsaradb-instance?spm=5176.28197581.d_mcp.2.64c25a9e1lLUHz&scm=20140722.H_178692._.OR_help-T_cn~zh-V_1)

### 步骤三
准备好数据库账号，账号要完成[安全托管](https://help.aliyun.com/zh/dms/product-overview/security-hosting?scm=20140722.S_help%40%40%E6%96%87%E6%A1%A3%40%402637012.S_BB1%40bl%2BRQW%40ag0%2BBB2%40ag0%2Bhot%2Bos0.ID_2637012-RL_%E5%AE%89%E5%85%A8%E6%89%98%E7%AE%A1-LOC_doc%7EUND%7Eab-OR_ser-PAR1_212a5d3d17482482327868236d8f90-V_4-P0_0-P1_0&spm=a2c4g.11186623.help-search.i50)


</usedetail>