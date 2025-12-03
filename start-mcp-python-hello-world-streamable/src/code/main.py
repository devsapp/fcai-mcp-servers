import contextlib
from mcp.server.fastmcp import FastMCP
from starlette.applications import Starlette
from starlette.applications import Starlette
from starlette.routing import Mount

mcp = FastMCP(name="python-sse-hello-world", stateless_http=False)

@mcp.tool()
async def hello() -> str:
    """Return string 'Hello World!'"""
    print("hello tool called")
    return f"Hello World!"


@contextlib.asynccontextmanager
async def lifespan(app: Starlette):
    async with contextlib.AsyncExitStack() as stack:
        await stack.enter_async_context(mcp.session_manager.run())
        yield

app = Starlette(
    routes=[
        Mount('/', app=mcp.streamable_http_app()),
    ],
    lifespan=lifespan,
)
