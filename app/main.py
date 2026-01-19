from fastapi import FastAPI
from app.routes import foods

app = FastAPI(title="Calories Tracker API")

app.include_router(foods.router)