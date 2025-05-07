
> 注：当前项目为 Serverless Devs 应用，由于应用中会存在需要初始化才可运行的变量（例如应用部署地区、函数名等等），所以**不推荐**直接 Clone 本仓库到本地进行部署或直接复制 s.yaml 使用，**强烈推荐**通过 `s init ${模版名称}` 的方法或应用中心进行初始化，详情可参考[部署 & 体验](#部署--体验) 。

# fcai-start-mcp-variflight 帮助文档

<description>

Variflight MCP Server 模版

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
   
- :fire: 通过 [云原生应用开发平台 CAP](https://cap.console.aliyun.com/template-detail?template=fcai-start-mcp-variflight) ，[![Deploy with Severless Devs](https://img.alicdn.com/imgextra/i1/O1CN01w5RFbX1v45s8TIXPz_!!6000000006118-55-tps-95-28.svg)](https://cap.console.aliyun.com/template-detail?template=fcai-start-mcp-variflight) 该应用。
   
</appcenter>
<deploy>
    
   
</deploy>

## 案例介绍

<appdetail id="flushContent">

## Variflight MCP Server

A Model Context Protocol (MCP) server implementation for VariFlight flight information services. This server provides various tools to query flight information, weather data, and flight comfort metrics.

## Variflight API Key

To use the Variflight MCP server, you need to have a Variflight API key. You can get it from [here](https://mcp.variflight.com).

### Installation

```json
{
    "mcpServers": {
        "variflight": {
            "command": "npx",
            "args": [
                "-y",
                "@variflight-ai/variflight-mcp"
            ],
            "env": {
                "VARIFLIGHT_API_KEY": "your_api_key_here"
            }
        }
    }
}
```

### Available Tools

#### 1. Search Flights by Departure and Arrival
Search flights between airports using IATA codes:
```typescript
searchFlightsByDepArr({
  dep: "PEK",  // Beijing
  arr: "SHA",  // Shanghai
  date: "2024-03-20"
})
```

#### 2. Search Flights by Number
Search flights using flight number:
```typescript
searchFlightsByNumber({
  fnum: "MU2157",
  date: "2024-03-20"
})
```

#### 3. Get Flight Transfer Information
Find transfer options between cities:
```typescript
getFlightTransferInfo({
  depcity: "BJS",
  arrcity: "LAX",
  depdate: "2024-03-20"
})
```

#### 4. Flight Happiness Index
Get detailed flight comfort metrics:
```typescript
flightHappinessIndex({
  fnum: "MU2157",
  date: "2024-03-20"
})
```

#### 5. Real-time Aircraft Location
Track aircraft location using registration number:
```typescript
getRealtimeLocationByAnum({
  anum: "B2021"
})
```

#### 6. Airport Weather Forecast
Get 3-day weather forecast for airports:
```typescript
getFutureWeatherByAirport({
  airport: "PEK"
})
```

#### 7. Search Flight Itineraries
Search for purchasable flight options and get the lowest prices:
```typescript
searchFlightItineraries({
  depCityCode: "BJS",  // Beijing
  arrCityCode: "SHA",  // Shanghai
  depDate: "2025-04-20"
})
```

</appdetail>







## 使用流程

<usedetail id="flushContent">

部署完成拿到 URL 后，准备好支持 SSE 的 MCP Client，通过 SSETransport 进行连接。

</usedetail>









