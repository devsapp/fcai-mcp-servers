
> 注：当前项目为 Serverless Devs 应用，由于应用中会存在需要初始化才可运行的变量（例如应用部署地区、函数名等等），所以**不推荐**直接 Clone 本仓库到本地进行部署或直接复制 s.yaml 使用，**强烈推荐**通过 `s init ${模版名称}` 的方法或应用中心进行初始化，详情可参考[部署 & 体验](#部署--体验) 。

# fcai-start-mcp-openweather 帮助文档

<description>

OpenWeather MCP Server 模版

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
   
- :fire: 通过 [云原生应用开发平台 CAP](https://cap.console.aliyun.com/template-detail?template=fcai-start-mcp-openweather) ，[![Deploy with Severless Devs](https://img.alicdn.com/imgextra/i1/O1CN01w5RFbX1v45s8TIXPz_!!6000000006118-55-tps-95-28.svg)](https://cap.console.aliyun.com/template-detail?template=fcai-start-mcp-openweather) 该应用。
   
</appcenter>
<deploy>
    
   
</deploy>

## 案例介绍

<appdetail id="flushContent">

## 特性

- **极简**: 一句话查询天气
- **智能**: 支持中英文自然语言交互
- **全球**: 支持所有主要城市
- **即插即用**: 完美集成 Cursor
- **高性能**: 异步处理，响应迅速
- **美观**: 清晰直观的天气展示

## 快速开始

### 1. 获取 API Key

> 在开始之前，请先 [获取 OpenWeather API Key](https://home.openweathermap.org/api_keys)

### 2. 一键安装（推荐）

使用 Smithery 一键安装和配置：

```bash
npx -y @smithery/cli@latest install @MrCare/mcp_tool --client cursor --config "{\"openweathermapApiKey\":\"your_api_key_here\",\"port\":8000}"
```

> 如需安装 WindSurf 和 Cine 版本，请访问我们的 [Smithery 仓库](https://smithery.ai/server/@MrCare/mcp_tool)。

### 3. 手动安装

#### 3.1 克隆并安装

```bash
git clone https://github.com/yourusername/weather-server.git && cd weather-server && pip install -e .
```

#### 3.2 配置 API Key

**方法一：使用配置文件（推荐）**

复制示例配置文件并修改：
```bash
cp env.example .env
```
然后编辑 `.env` 文件，将 `your_api_key_here` 替换为你的 API Key。

**方法二：使用环境变量**

macOS/Linux:
```bash
export OPENWEATHERMAP_API_KEY="your_api_key"
```

Windows:
```cmd
set OPENWEATHERMAP_API_KEY=your_api_key
```

#### 3.3 启用工具

编辑 `~/.cursor/mcp.json` (Windows: `%USERPROFILE%\.cursor\mcp.json`):
```json
{
    "weather_fastmcp": {
        "command": "python",
        "args": ["-m", "weather_server.server"]
    }
}
```

重启 Cursor 即可使用！

## 使用示例

在 Cursor 中直接输入：
```
东京天气怎么样？
伦敦明天会下雨吗？
纽约的天气预报
巴黎今天温度多少？
```

就这么简单！

## 参数说明

如需更精确的查询，可以指定以下参数：

| 参数 | 说明 | 默认值 |
|-----------|-------------|---------|
| city | 城市名称（支持中英文） | 必填 |
| days | 预报天数（1-5天） | 5 |
| units | 温度单位 (metric: 摄氏度, imperial: 华氏度) | metric |
| lang | 返回语言 (zh_cn: 中文, en: 英文) | zh_cn |

</appdetail>







## 使用流程

<usedetail id="flushContent">

部署完成拿到 URL 后，准备好支持 SSE 的 MCP Client，通过 SSETransport 进行连接。

</usedetail>









