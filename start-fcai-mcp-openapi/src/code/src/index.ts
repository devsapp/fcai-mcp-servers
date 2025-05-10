import { z } from "zod";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { OpenApiMCPSeverConverter } from "@serverless-devs/openapi-mcp-converter";

// Create a new server instance every time a new connection is made to ensure concurrency
import fs from "fs";
import path from "path";
const createServer = () => {
  let openApiSecurity;
  const __dirname_cjs = __dirname;

  const openApiSpec = JSON.parse(
    fs.readFileSync(path.join(__dirname_cjs, "openapi.json"), "utf8")
  );
  // 安全配置读取同理
  try {
    openApiSecurity = JSON.parse(
      fs.readFileSync(path.join(__dirname_cjs, "security.json"), "utf8")
    );
  } catch (error) {
    openApiSecurity = undefined;
  }
  const converter = new OpenApiMCPSeverConverter(openApiSpec, {
    timeout: 1000000,
    security: openApiSecurity,
  });
  return converter.getServer();
};
// Create a new server instance
const server = createServer();
// Create a new stdio transport instance
const transport = new StdioServerTransport();
// Start the server
server
  .connect(transport)
  .then(() => {
    console.log('{"message": "Server started"}');
  })
  .catch((err) => {
    console.error("Error starting server:", err);
  });
