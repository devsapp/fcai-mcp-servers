import { z } from "zod";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { OpenApiMCPSeverConverter } from "@serverless-devs/openapi-mcp-converter";

// Create a new server instance every time a new connection is made to ensure concurrency
const createServer = () => {
  // Create server instance
  const spec = process.env.OpenApiSpec;
  if (!spec) {
    throw new Error("OPENAPI_SPEC is not set");
  }
  const security = process.env.Security;
  const openApiSpec = JSON.parse(spec);
  const openApiSecurity = security ? JSON.parse(security) : undefined;
  const converter = new OpenApiMCPSeverConverter(openApiSpec, {
    timeout: 1000000,
    security: openApiSecurity,
  });
  const server = converter.getServer();
  return server;
};
// Create a new server instance
const server = createServer();
// Create a new stdio transport instance
const transport = new StdioServerTransport();
// Start the server
server
  .connect(transport)
  .then(() => {
    console.log("{\"message\": \"Server started\"}");
  })
  .catch((err) => {
    console.error("Error starting server:", err);
  });
