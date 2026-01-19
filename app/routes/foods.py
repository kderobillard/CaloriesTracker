from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import date

from app.database import SessionLocal, engine
from app import models, schemas
models.Base.metadata.create_all(bind=engine)

router = APIRouter(prefix="/foods", tags=["foods"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/add", response_model=schemas.FoodEntryCreate)
def add_food(entry: schemas.FoodEntryCreate, db: Session = Depends(get_db)):
    db_entry = models.FoodEntry(
        name=entry.name,
        calories=entry.calories * (entry.quantity / 100),
        protein=entry.protein * (entry.quantity / 100),
        carbs=entry.carbs * (entry.quantity / 100),
        fat=entry.fat * (entry.quantity / 100),
        quantity=entry.quantity
    )
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)
    return entry

@router.get("/daily-summary")
def daily_summary(db: Session = Depends(get_db), summary_date: date = Query(default=date.today())):
    totals = db.query(
        func.sum(models.FoodEntry.calories),
        func.sum(models.FoodEntry.protein),
        func.sum(models.FoodEntry.carbs),
        func.sum(models.FoodEntry.fat)
    ).filter(models.FoodEntry.date == summary_date).first()

    return {
        "date": summary_date,
        "total_calories": totals[0] or 0,
        "total_protein": totals[1] or 0,
        "total_carbs": totals[2] or 0,
        "total_fat": totals[3] or 0
    }