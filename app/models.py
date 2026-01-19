from sqlalchemy import Column, Integer, String, Float, Date
from datetime import date
from .database import Base

class FoodEntry(Base):
    __tablename__ = "food_entries"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    calories = Column(Float)
    protein = Column(Float)
    carbs = Column(Float)
    fat = Column(Float)
    quantity = Column(Float)  # en grammes
    date = Column(Date, default=date.today)