import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
import joblib

# Load the CDC dataset (assuming it's a CSV file)
df = pd.read_csv('cdc_dataset.csv')

# Preprocessing (example: cleaning and selecting the relevant columns)
X = df[['age', 'cholesterol', 'blood_pressure']]  # Input features
y = df['heart_disease']  # Target variable (1 = risk, 0 = no risk)

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a logistic regression model
model = LogisticRegression()
model.fit(X_train, y_train)

# Save the trained model
joblib.dump(model, 'heart_disease_model.pkl')
print("Model saved as heart_disease_model.pkl")

import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np

# FastAPI app initialization
app = FastAPI()

# Load the trained model
model = joblib.load('heart_disease_model.pkl')

# Data model for incoming request
class HeartRiskInput(BaseModel):
    age: int
    cholesterol: float
    blood_pressure: float

@app.post("/predict_heart_risk")
async def predict_heart_risk(input: HeartRiskInput):
    input_data = np.array([[input.age, input.cholesterol, input.blood_pressure]])
    prediction = model.predict(input_data)
    risk_prob = model.predict_proba(input_data)[0][1]  # Probability of heart disease

    return {"risk": float(risk_prob * 100), "prediction": int(prediction)}

# Run FastAPI server
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
