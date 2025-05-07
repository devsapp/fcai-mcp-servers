
> 注：当前项目为 Serverless Devs 应用，由于应用中会存在需要初始化才可运行的变量（例如应用部署地区、函数名等等），所以**不推荐**直接 Clone 本仓库到本地进行部署或直接复制 s.yaml 使用，**强烈推荐**通过 `s init ${模版名称}` 的方法或应用中心进行初始化，详情可参考[部署 & 体验](#部署--体验) 。

# fcai-start-mcp-alibaba-cloud-ops 帮助文档

<description>

Alibaba Cloud ops MCP Server 模板

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
   
- :fire: 通过 [云原生应用开发平台 CAP](https://cap.console.aliyun.com/template-detail?template=fcai-start-mcp-alibaba-cloud-ops) ，[![Deploy with Severless Devs](https://img.alicdn.com/imgextra/i1/O1CN01w5RFbX1v45s8TIXPz_!!6000000006118-55-tps-95-28.svg)](https://cap.console.aliyun.com/template-detail?template=fcai-start-mcp-alibaba-cloud-ops) 该应用。
   
</appcenter>
<deploy>
    
   
</deploy>

## 案例介绍

<appdetail id="flushContent">

### 工具列表

| **产品** | **工具** | **功能** | **实现方式** | **状态** |
| --- | --- | --- | --- | --- |
| ECS | RunCommand | 运行命令 | OOS | Done |
|  | StartInstances | 启动实例 | OOS | Done |
|  | StopInstances | 停止实例 | OOS | Done |
|  | RebootInstances | 重启实例 | OOS | Done |
|  | DescribeInstances | 查看实例 | API | Done |
|  | DescribeRegions | 查看地域 | API | Done |
|  | DescribeZones | 查看可用区 | API | Done |
|  | DescribeAvailableResource | 查看资源库存 | API | Done |
|  | DescribeImages | 查看镜像 | API | Done |
|  | DescribeSecurityGroups | 查看安全组 | API | Done |
|  | RunInstances | 创建实例 | OOS | Done |
|  | DeleteInstances | 删除实例 | API | Done |
|  | ResetPassword | 修改密码 | OOS | Done |
|  | ReplaceSystemDisk | 更换操作系统 | OOS | Done |
| VPC | DescribeVpcs | 查看VPC | API | Done |
|  | DescribeVSwitches | 查看VSwitch | API | Done |
| RDS | DescribeDBInstances | 查询数据库实例列表 | API | Done |
|  | StartDBInstances | 启动RDS实例 | OOS | Done |
|  | StopDBInstances | 暂停RDS实例 | OOS | Done |
|  | RestartDBInstances | 重启RDS实例 | OOS | Done |
| OSS | ListBuckets | 查看存储空间 | API | Done |
|  | PutBucket | 创建存储空间 | API | Done |
|  | DeleteBucket | 删除存储空间 | API | Done |
|  | ListObjects | 查看存储空间中的文件信息 | API | Done |
| CloudMonitor | GetCpuUsageData | 获取ECS实例的CPU使用率数据 | API | Done |
|  | GetCpuLoadavgData | 获取CPU一分钟平均负载指标数据 | API | Done |
|  | GetCpuloadavg5mData | 获取CPU五分钟平均负载指标数据 | API | Done |
|  | GetCpuloadavg15mData | 获取CPU十五分钟平均负载指标数据 | API | Done |
|  | GetMemUsedData | 获取内存使用量指标数据 | API | Done |
|  | GetMemUsageData | 获取内存利用率指标数据 | API | Done |
|  | GetDiskUsageData | 获取磁盘利用率指标数据 | API | Done |
|  | GetDiskTotalData | 获取磁盘分区总容量指标数据 | API | Done |
|  | GetDiskUsedData | 获取磁盘分区使用量指标数据 | API | Done |


#### Configuration

使用 [VS Code](https://code.visualstudio.com/) + [Cline](https://cline.bot/) 配置MCP Server

To use alibaba-cloud-ops-mcp-server MCP Server with any other MCP Client, you can manually add this configuration and restart for changes to take effect:


```json
{
  "mcpServers": {
    "alibaba-cloud-ops-mcp-server": {
      "timeout": 600,
      "command": "uvx",
      "args": [
        "alibaba-cloud-ops-mcp-server@latest"
      ],
      "env": {
        "ALIBABA_CLOUD_ACCESS_KEY_ID": "Your Access Key ID",
        "ALIBABA_CLOUD_ACCESS_KEY_SECRET": "Your Access Key SECRET"
      }
    }
  }
}

</appdetail>







## 使用流程

<usedetail id="flushContent">

部署完成拿到 URL 后，准备好支持 SSE 的 MCP Client，通过 SSETransport 进行连接。

</usedetail>









