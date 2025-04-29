'''
Author: Mr.Car
Date: 2025-03-21 14:28:32
'''
from dataclasses import dataclass
from typing import List

@dataclass
class WeatherData:
    """Real-time weather data model
    
    实时天气数据模型"""
    description: str
    temperature: float
    humidity: int
    wind_speed: float
    city: str

    def format_message(self) -> str:
        """Format weather information message
        
        格式化天气信息消息"""
        return f"当前{self.city}的天气：{self.description}，温度{self.temperature}°C，湿度{self.humidity}%，风速{self.wind_speed}米/秒"

@dataclass
class ForecastData:
    """Weather forecast data model
    
    天气预报数据模型"""
    date: str
    description: str
    temp_min: float
    temp_max: float
    humidity: int
    wind_speed: float
    city: str

    def format_message(self) -> str:
        """Format weather forecast message
        
        格式化天气预报消息"""
        return f"{self.date} {self.city}的天气预报：{self.description}，温度{self.temp_min}°C至{self.temp_max}°C，湿度{self.humidity}%，风速{self.wind_speed}米/秒"

@dataclass
class WeatherForecast:
    """Weather forecast collection
    
    天气预报集合"""
    forecasts: List[ForecastData]

    def to_dict(self) -> dict:
        """Convert to dictionary format
        
        转换为字典格式"""
        return {
            "forecasts": [
                {
                    "date": forecast.date,
                    "description": forecast.description,
                    "temp_min": forecast.temp_min,
                    "temp_max": forecast.temp_max,
                    "humidity": forecast.humidity,
                    "wind_speed": forecast.wind_speed,
                    "city": forecast.city
                } for forecast in self.forecasts
            ]
        } 