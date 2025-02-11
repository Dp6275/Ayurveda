from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import mysql.connector
import random

app = FastAPI()

# Enable CORS for React frontend (http://localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database connection function
def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="2005",
        database="vithackathon_db"
    )

# Pydantic model for request
class UserHealthData(BaseModel):
    user_id: int

# Pydantic model for response
class MealPlan(BaseModel):
    breakfast: str
    lunch: str
    dinner: str

@app.post("/generate_diet_plan", response_model=MealPlan)
async def generate_diet_plan(health_data: UserHealthData):
    user_id = health_data.user_id
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    # Fetch user details
    cursor.execute("SELECT * FROM users WHERE user_id = %s", (user_id,))
    user = cursor.fetchone()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Fetch health conditions
    cursor.execute("SELECT * FROM health_conditions WHERE user_id = %s", (user_id,))
    health_conditions = cursor.fetchall()

    # Fetch food classification
    cursor.execute("SELECT * FROM food_classification")
    food_classification = cursor.fetchall()

    # Fetch nutritional breakdown
    cursor.execute("SELECT * FROM nutritional_breakdown")
    nutritional_data = cursor.fetchall()

    conn.close()

    # Generate personalized diet plan
    meal_plan = generate_personalized_diet_plan(user, health_conditions, food_classification, nutritional_data)
    return meal_plan

def generate_personalized_diet_plan(user, health_conditions, food_classification, nutritional_data):
    meal_plan = MealPlan(breakfast="", lunch="", dinner="")

    # Adjust diet based on health conditions
    for condition in health_conditions:
        if condition['condition_name'] == 'Diabetes':
            meal_plan.lunch = "Low-carb, high-fiber foods"
            meal_plan.dinner = "Avoid sugary foods, focus on protein"
        elif condition['condition_name'] == 'Hypertension':
            meal_plan.dinner = "Low-sodium meals like grilled chicken & quinoa"

    # Choose food based on body type
    if user['body_type'] == 'Ectomorph':
        meal_plan.breakfast = choose_food_based_on_body_type('Ectomorph', food_classification)
    elif user['body_type'] == 'Mesomorph':
        meal_plan.breakfast = choose_food_based_on_body_type('Mesomorph', food_classification)
    elif user['body_type'] == 'Endomorph':
        meal_plan.breakfast = choose_food_based_on_body_type('Endomorph', food_classification)

    # Add nutritional balance
    meal_plan.breakfast += " - " + get_nutritional_balance('breakfast', nutritional_data)
    meal_plan.lunch += " - " + get_nutritional_balance('lunch', nutritional_data)
    meal_plan.dinner += " - " + get_nutritional_balance('dinner', nutritional_data)

    return meal_plan

def choose_food_based_on_body_type(body_type, food_classification):
    foods = [food['food_name'] for food in food_classification if food['body_type'] == body_type]
    return random.choice(foods) if foods else "No recommended food"

def get_nutritional_balance(meal, nutritional_data):
    nutrition = [nutrient['nutrient'] for nutrient in nutritional_data if nutrient['meal_type'] == meal]
    return ", ".join(nutrition) if nutrition else "No data"

