'''
Author: Mr.Car
Date: 2025-03-21 14:28:32
'''
import pinyin
from typing import Dict

class CityNameConverter:
    """City name converter for handling Chinese and English city names
    
    城市名称转换器"""
    
    def __init__(self):
        """Initialize basic city mapping
        
        初始化基础城市映射"""
        self._city_map: Dict[str, str] = {
            "苏州": "suzhou",
            "北京": "beijing",
            "上海": "shanghai",
            "广州": "guangzhou",
            "深圳": "shenzhen",
        }
    
    def to_english(self, city: str) -> str:
        """
        Convert city name to English
        
        Args:
            city: City name (Chinese or English)
            
        Returns:
            str: English city name

        将城市名转换为英文
        
        Args:
            city: 城市名称（中文或英文）
            
        Returns:
            str: 英文城市名
        """
        # 如果已经在映射表中，直接返回
        if city in self._city_map:
            return self._city_map[city]
            
        # 如果输入是英文，直接返回
        if all(ord(c) < 128 for c in city):
            return city.lower()
            
        # 尝试转换为拼音（去掉声调和空格）
        try:
            # 移除特殊字符
            city = ''.join(c for c in city if c.isalnum() or c.isspace())
            py = pinyin.get(city, format="strip")
            return py.lower().replace(" ", "")
        except Exception:
            # 如果转换失败，返回原始输入
            return city 