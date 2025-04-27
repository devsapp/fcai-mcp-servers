# AMap Map MCP Server

MCP Server for the AMap Map API.

## Setup

### API Key
Get a AMap Maps API key：
https://lbs.amap.com/api/webservice/create-project-and-key.

### NPX

```json
{
    "mcpServers": {
        "amap-maps": {
            "command": "npx",
            "args": [
                "-y",
                "@amap/amap-maps-mcp-server"
            ],
            "env": {
                "AMAP_MAPS_API_KEY": ""
            }
        }
    }
}
```

