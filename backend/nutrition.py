import os
import numpy as np
import joblib
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.models import load_model
from database import fetch_user_data

def generate_nutrition_plan(user_id):
    model_path = os.path.join(os.path.dirname(__file__), "nutrition_model.h5")
    encoder_path = os.path.join(os.path.dirname(__file__), "label_encoders.pkl")

    if not os.path.exists(model_path) or not os.path.exists(encoder_path):
        return {"error": "Model or encoders not found"}

    # Load the model and encoders
    model = keras.models.load_model(model_path)
    label_encoders = joblib.load(encoder_path)

    # Fetch user data from the database
    user_data = fetch_user_data(user_id)
    if not user_data:
        return {"error": "User data not found"}

    user, health_conditions, food_classification, nutritional_data, body_food_response, indian_food_composition = user_data

    if not food_classification:
        return {"error": "Food classification data missing"}

    # Prepare features for the model
    user_features = []
    for food in food_classification:
        user_features.append([food["body_type"], food["food_name"], food["nutrient"], food["value"]])

    X = np.array(user_features, dtype=object)

    # Transform categorical data using label encoders
    for i in range(4):
        X[:, i] = label_encoders[i].transform(X[:, i].tolist())

    X = np.array(X, dtype=np.float32)

    # Make predictions
    predictions = model.predict(X)
    recommended_indices = np.argmax(predictions, axis=1)
    recommended_foods = [food_classification[i]["food_name"] for i in recommended_indices]

    return {"recommended_foods": recommended_foods}
