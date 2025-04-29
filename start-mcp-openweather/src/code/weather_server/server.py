'''
Author: Mr.Car
Date: 2025-03-20 20:18:33
'''
from fastmcp import FastMCP
import httpx
import os
from dotenv import load_dotenv

from .models import WeatherData, ForecastData, WeatherForecast
from .utils import CityNameConverter

# 加载环境变量
load_dotenv()

# 初始化工具类
city_converter = CityNameConverter()

# 初始化 FastMCP 服务器
server = FastMCP()

@server.tool()
async def get_weather(
    city: str,
    units: str = "metric",
    lang: str = "zh_cn"
) -> WeatherData:
    """
    Get weather information for a specified city
    
    Args:
        city: City name (supports Chinese or English, e.g., Suzhou, suzhou)
        units: Temperature unit (metric: Celsius, imperial: Fahrenheit)
        lang: Response language (zh_cn: Chinese, en: English)
    
    Returns:
        WeatherData: Object containing weather information

    获取指定城市的天气信息
    
    Args:
        city: 城市名称（支持中文或英文，如：苏州、suzhou）
        units: 温度单位 (metric: 摄氏度, imperial: 华氏度)
        lang: 返回语言 (zh_cn: 中文, en: 英文)
    
    Returns:
        WeatherData: 包含天气信息的对象
    """
    # 转换城市名称
    english_city = city_converter.to_english(city)
    
    # 获取 API Key
    api_key = os.getenv("OPENWEATHERMAP_API_KEY")
    if not api_key:
        raise ValueError("缺少 OPENWEATHERMAP_API_KEY 环境变量")

    # 设置请求参数
    params = {
        "q": english_city,
        "appid": api_key,
        "units": units,
        "lang": lang
    }

    try:
        # 发送请求
        async with httpx.AsyncClient() as client:
            response = await client.get(
                "http://api.openweathermap.org/data/2.5/weather",
                params=params,
                timeout=10.0
            )
            response.raise_for_status()
            data = response.json()

            # 返回天气数据
            return WeatherData(
                description=data["weather"][0]["description"],
                temperature=data["main"]["temp"],
                humidity=data["main"]["humidity"],
                wind_speed=data["wind"]["speed"],
                city=city  # 保留原始输入的城市名
            )
            
    except httpx.TimeoutException:
        raise Exception("请求超时，请稍后重试")
    except httpx.HTTPStatusError as e:
        if e.response.status_code == 404:
            raise Exception(f"未找到城市 '{city}' ({english_city}) 的天气信息")
        raise Exception(f"HTTP错误: {e.response.status_code} - {e.response.text}")
    except KeyError as e:
        raise Exception(f"数据解析错误：缺少必要字段 {str(e)}")
    except Exception as e:
        raise Exception(f"获取天气信息时发生错误：{str(e)}")

@server.tool()
async def get_weather_forecast(
    city: str,
    days: int = 5,
    units: str = "metric",
    lang: str = "zh_cn"
) -> dict:
    """
    Get weather forecast information for a specified city
    
    Args:
        city: City name (supports Chinese or English, e.g., Suzhou, suzhou)
        days: Number of forecast days (up to 5 days)
        units: Temperature unit (metric: Celsius, imperial: Fahrenheit)
        lang: Response language (zh_cn: Chinese, en: English)
    
    Returns:
        dict: Dictionary containing weather forecast information

    获取指定城市的天气预报信息
    
    Args:
        city: 城市名称（支持中文或英文，如：苏州、suzhou）
        days: 预报天数（最多5天）
        units: 温度单位 (metric: 摄氏度, imperial: 华氏度)
        lang: 返回语言 (zh_cn: 中文, en: 英文)
    
    Returns:
        dict: 包含天气预报信息的字典
    """
    # 转换城市名称
    english_city = city_converter.to_english(city)
    
    # 获取 API Key
    api_key = os.getenv("OPENWEATHERMAP_API_KEY")
    if not api_key:
        raise ValueError("缺少 OPENWEATHERMAP_API_KEY 环境变量")

    # 设置请求参数
    params = {
        "q": english_city,
        "appid": api_key,
        "units": units,
        "lang": lang,
        "cnt": min(days * 8, 40)  # 每天8个时间点，最多5天
    }

    try:
        # 发送请求
        async with httpx.AsyncClient() as client:
            response = await client.get(
                "http://api.openweathermap.org/data/2.5/forecast",
                params=params,
                timeout=10.0
            )
            response.raise_for_status()
            data = response.json()

            # 处理预报数据，按天聚合
            forecasts = {}
            for item in data["list"]:
                date = item["dt_txt"].split()[0]
                if date not in forecasts:
                    forecasts[date] = {
                        "temp_min": float("inf"),
                        "temp_max": float("-inf"),
                        "descriptions": set(),
                        "humidity": [],
                        "wind_speed": []
                    }
                
                daily = forecasts[date]
                daily["temp_min"] = min(daily["temp_min"], item["main"]["temp"])
                daily["temp_max"] = max(daily["temp_max"], item["main"]["temp"])
                daily["descriptions"].add(item["weather"][0]["description"])
                daily["humidity"].append(item["main"]["humidity"])
                daily["wind_speed"].append(item["wind"]["speed"])

            # 转换为ForecastData对象列表
            result = []
            for date, daily in list(forecasts.items())[:days]:
                result.append(ForecastData(
                    date=date,
                    description="/".join(daily["descriptions"]),
                    temp_min=round(daily["temp_min"], 2),
                    temp_max=round(daily["temp_max"], 2),
                    humidity=round(sum(daily["humidity"]) / len(daily["humidity"])),
                    wind_speed=round(sum(daily["wind_speed"]) / len(daily["wind_speed"]), 2),
                    city=city
                ))
            
            # 返回预报数据
            return WeatherForecast(forecasts=result).to_dict()
            
    except httpx.TimeoutException:
        raise Exception("请求超时，请稍后重试")
    except httpx.HTTPStatusError as e:
        if e.response.status_code == 404:
            raise Exception(f"未找到城市 '{city}' 的天气信息")
        raise Exception(f"HTTP错误: {e.response.status_code} - {e.response.text}")
    except KeyError as e:
        raise Exception(f"数据解析错误：缺少必要字段 {str(e)}")
    except Exception as e:
        raise Exception(f"获取天气预报信息时发生错误：{str(e)}")

# 运行服务器
if __name__ == "__main__":
    server.run()