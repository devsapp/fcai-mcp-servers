
> 注：当前项目为 Serverless Devs 应用，由于应用中会存在需要初始化才可运行的变量（例如应用部署地区、函数名等等），所以**不推荐**直接 Clone 本仓库到本地进行部署或直接复制 s.yaml 使用，**强烈推荐**通过 `s init ${模版名称}` 的方法或应用中心进行初始化，详情可参考[部署 & 体验](#部署--体验) 。

# start-mcp-markitdown 帮助文档

<description>

Markitdown MCP Server 模版

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
   
- :fire: 通过 [云原生应用开发平台 CAP](https://functionai.console.aliyun.com/template-detail?template=start-mcp-markitdown) ，[![Deploy with Severless Devs](https://img.alicdn.com/imgextra/i1/O1CN01w5RFbX1v45s8TIXPz_!!6000000006118-55-tps-95-28.svg)](https://functionai.console.aliyun.com/template-detail?template=start-mcp-markitdown) 该应用。
   
</appcenter>
<deploy>
    
   
</deploy>

## 案例介绍

<appdetail id="flushContent">

# MarkItDown

[![PyPI](https://img.shields.io/pypi/v/markitdown.svg)](https://pypi.org/project/markitdown/)
![PyPI - Downloads](https://img.shields.io/pypi/dd/markitdown)
[![Built by AutoGen Team](https://img.shields.io/badge/Built%20by-AutoGen%20Team-blue)](https://github.com/microsoft/autogen)

> [!TIP]
> MarkItDown 现在提供 MCP（模型上下文协议）服务器，用于与 Claude Desktop 等 LLM 应用程序集成。详见 [markitdown-mcp](https://github.com/microsoft/markitdown/tree/main/packages/markitdown-mcp)。

> [!IMPORTANT]
> 0.0.1 到 0.1.0 版本的重大变更：
> * 依赖项现在按可选功能组组织（详见下文）。使用 `pip install 'markitdown[all]'` 可保持向后兼容。
> * convert_stream() 现在需要二进制文件类对象（如以二进制模式打开的文件或 io.BytesIO 对象）。之前版本也接受文本文件类对象（如 io.StringIO）。
> * DocumentConverter 类接口改为从文件类流读取，不再创建临时文件。插件或自定义 DocumentConverter 的维护者可能需要更新代码。如果仅使用 MarkItDown 类或 CLI（如下列示例），则无需更改。

MarkItDown 是一个轻量级 Python 工具，用于将各类文件转换为 Markdown 格式，适用于 LLM 和相关文本分析管道。其定位类似于 [textract](https://github.com/deanmalmgren/textract)，但重点是保留重要的文档结构和内容作为 Markdown（包括：标题、列表、表格、链接等）。虽然输出通常具有合理的可读性和人类友好性，但它主要设计为由文本分析工具消费——可能不是高保真文档转换的最佳选择，尤其是用于人类阅读的文档。

目前，MarkItDown 支持以下文件类型：
- PDF
- PowerPoint
- Word
- Excel
- 图像（EXIF 元数据和 OCR）
- 音频（EXIF 元数据和语音转录）
- HTML
- 文本格式（CSV、JSON、XML）
- ZIP 文件（遍历内容）
- YouTube Url
- EPub
- ... 更多！
### 为什么选择 Markdown？
Markdown 接近纯文本，标记最少，但能有效表达文档结构。主流 LLM（如 OpenAI 的 GPT-4o）原生支持 Markdown，并常在响应中自动使用。这表明它们已在大量 Markdown 格式文本上训练，理解良好。作为附带的好处，Markdown 规范也非常高效地利用了令牌。
## 安装
要安装 MarkItDown，要使用pip：```pip install 'markitdown[all]```。或者，您可以从源代码安装：
```bash
git clone git@github.com:microsoft/markitdown.git
cd markitdown
pip install -e 'packages/markitdown[all]' 
```
## 使用方法
### 命令行
```bash 
markitdown path-to-file.pdf > document.md
```
### 或者使用 ```-o```指定输出文件：
```bash 
markitdown path-to-file.pdf -o document.md
```
### 您还可以通过管道传递内容：
```bash 
cat path-to-file.pdf | markitdown
```
#### 可选依赖
MarkItDown 提供按需激活文件格式的依赖项。上文使用 `[all]` 安装了所有依赖，也可单独安装：
```bash
pip install 'markitdown[pdf, docx, pptx]'
```
当前可选依赖组：
* `[all]` 安装所有依赖
* `[pptx]` PowerPoint 支持
* `[docx]` Word 支持
* `[xlsx]` Excel 支持
* `[xls]` 旧版 Excel 支持
* `[pdf]` PDF 支持
* `[outlook]` Outlook 邮件支持
* `[az-doc-intel]` Azure 文档智能支持
* `[audio-transcription]` 音频转录支持（wav/mp3）
* `[youtube-transcription]` YouTube 转录支持
#### 插件
MarkItDown 支持第三方插件（默认禁用）。列出已安装插件：
```bash
markitdown --list-plugins
```
启用插件：
```bash
markitdown --use-plugins 文件路径.pdf
```
搜索 GitHub 标签 `#markitdown-plugin` 查找可用插件。开发指南见 `packages/markitdown-sample-plugin`。
#### Azure 文档智能
使用 Microsoft 文档智能转换：
```bash
markitdown 文件路径.pdf -o 文档.md -d -e "<文档智能终结点>"
```
Azure 文档智能资源设置指南[见此](https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/how-to-guides/create-document-intelligence-resource?view=doc-intel-4.0.0)。
### Python API
基础用法：
```python
from markitdown import MarkItDown
md = MarkItDown(enable_plugins=False)  # True 启用插件
result = md.convert("test.xlsx")
print(result.text_content)
```

文档智能转换：
```python
from markitdown import MarkItDown
md = MarkItDown(docintel_endpoint="<文档智能终结点>")
result = md.convert("test.pdf")
print(result.text_content)
```
要使用大型语言模型进行图像描述，请提供 llm_client 和 llm_model：
```python
from markitdown import MarkItDown
from openai import OpenAI
client = OpenAI()
md = MarkItDown(llm_client=client, llm_model="gpt-4o")
result = md.convert("example.jpg")
print(result.text_content)
```
#### Docker
```sh
docker build -t markitdown:latest .
docker run --rm -i markitdown:latest < ~/您的文件.pdf > 输出.md
```
### 贡献指南
欢迎贡献和建议！参与需签署贡献者许可协议（CLA）。详情访问 https://cla.opensource.microsoft.com。
提交 PR 时，CLA 机器人会自动检测是否需要提供 CLA。本项目遵循 [Microsoft 开源行为准则](https://opensource.microsoft.com/codeofconduct/)。问题请联系 opencode@microsoft.com。
#### 贡献方式
可协助解决 issue 或审查 PR。所有 issue/PR 均欢迎，特别标记如下：
<div align="center">

|            | 所有                                                          | 特别需要社区协助                                                                                                      |
| ---------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Issues** | [所有 Issues](https://github.com/microsoft/markitdown/issues) | [待贡献 Issues](https://github.com/microsoft/markitdown/issues?q=is%3Aissue+is%3Aopen+label%3A%22open+for+contribution%22) |
| **PRs**    | [所有 PRs](https://github.com/microsoft/markitdown/pulls)     | [待审查 PRs](https://github.com/microsoft/markitdown/pulls?q=is%3Apr+is%3Aopen+label%3A%22open+for+reviewing%22)              |
</div>

#### 运行测试

1. 进入 MarkItDown 目录：

```sh
cd packages/markitdown
```

2. 安装 `hatch` 并运行测试：

```sh
pip install hatch  # 其他安装方式：https://hatch.pypa.io/dev/install/
hatch shell
hatch test
```
3. 提交 PR 前运行检查：
```sh
pre-commit run --all-files
```
#### 第三方插件

欢迎创建共享第三方插件，详见 `packages/markitdown-sample-plugin`。

### 商标声明
本项目可能包含项目、产品或服务的商标/标识。Microsoft 商标/标识的使用需遵循 [Microsoft 商标和品牌指南](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general)。修改版本中使用 Microsoft 商标/标识不得造成混淆或暗示 Microsoft 赞助。第三方商标/标识的使用遵循其各自政策。

</appdetail>







## 使用流程

<usedetail id="flushContent">

部署完成拿到 URL 后，准备好支持 SSE 的 MCP Client，通过 SSETransport 进行连接。

</usedetail>

## 二次开发指南

<development id="flushContent">
</development>






