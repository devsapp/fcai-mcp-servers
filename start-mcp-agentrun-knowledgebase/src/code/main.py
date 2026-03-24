import logging
import os

from mcp.server.fastmcp import FastMCP
from starlette.applications import Starlette
from starlette.routing import Mount

from agentrun.knowledgebase import KnowledgeBase

# 创建 MCP 服务器实例
mcp = FastMCP("agentrun-knowledgebase", host="0.0.0.0")


@mcp.tool()
async def search(query: str) -> str:
    """
    Search the knowledge base with a query string.
    
    Args:
        query: The search query to retrieve relevant information from the knowledge base.
    
    Returns:
        The retrieved results from the knowledge base.
    """
    knowledgebase_name = os.getenv("KNOWLEDGE_BASE_NAME", "")
    if knowledgebase_name == "":
        return "You should set KNOWLEDGE_BASE_NAME in environment variables"
    
    try:
        retrieve_result = KnowledgeBase.get_by_name(knowledgebase_name).retrieve(query)
        logging.info(f"knowledgebase {knowledgebase_name} retrieve_result: {retrieve_result}")
        return str(retrieve_result)
    except Exception as e:
        logging.error(f"Error retrieving from knowledge base: {e}")
        return f"Error retrieving from knowledge base: {str(e)}"


# 创建 Starlette ASGI 应用，挂载 MCP SSE 端点
app = Starlette(
    routes=[
        Mount('/', app=mcp.sse_app()),
    ]
)
