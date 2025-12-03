import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import express from "express";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";


// Create a new server instance every time a new connection is made to ensure concurrency
const createServer = () => {
  // Create server instance
  const server = new McpServer({
    name: "nodejs-sse-hello-world",
    version: "1.0.0",
  });
  
  // Implement your tools here
  server.tool(
    "hello_world",
    "Return string 'hello world!'",
    {
      // Define input parameters using zod. example: 
      // prefix: z.string().describe('prefix').optional(),
    },
    async () => {
      console.log("Hello World tool called");
      return {
        content: [{
          type: "text",
          text: 'hello world!',
        }]
      }
    },
  );
  return server;
}

const app = express();

app.post('/mcp', async (req, res) => {
  console.log("streamableHttp connection opened");
  console.log("Request Headers:", req?.headers); // 按需输出特定属性
  console.log("Request Query:", req?.query);
  const server = createServer();
  const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
      enableJsonResponse: true
  });

  res.on('close', () => {
      transport.close();
  });

  await server.server.connect(transport);
  await transport.handleRequest(req, res, req.body);
});

app.listen(8080, () => {
  console.log('MCP Server running on port 8080');
});