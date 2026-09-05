from pydantic import BaseModel

class FoodEntryCreate(BaseModel):
    name: str
    calories: float
    protein: float
    carbs: float
    fat: float
    quantity: float