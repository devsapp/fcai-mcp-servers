from mcp.server.fastmcp import FastMCP

mcp = FastMCP("My App")

@mcp.tool()
async def hello() -> str:
    """Return string 'Hello World!'"""
    print("hello tool called")
    return f"Hello World!"

if __name__ == "__main__":
    print("STDIO server started")
    mcp.run()

