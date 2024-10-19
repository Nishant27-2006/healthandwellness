'use client';

import { useState } from 'react';
import './styles/globals.css';

export default function Home() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [bmi, setBmi] = useState(null);
  const [bmr, setBmr] = useState(null);
  const [hydration, setHydration] = useState(null);
  const [cholesterol, setCholesterol] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [heartRisk, setHeartRisk] = useState(null);
  const [sleepNeeded, setSleepNeeded] = useState(null);
  const [exerciseSuggestion, setExerciseSuggestion] = useState(null);
  const [calorieDeficit, setCalorieDeficit] = useState(null);
  const [feedback, setFeedback] = useState('');

  const calculateBmi = () => {
    const heightInMeters = parseFloat(height) / 100;
    const calculatedBmi = parseFloat(weight) / (heightInMeters * heightInMeters);
    setBmi(calculatedBmi.toFixed(2));

    let bmiFeedback = '';
    if (calculatedBmi < 18.5) {
      bmiFeedback = 'You are underweight. Consider increasing calorie intake and checking with a healthcare provider.';
    } else if (calculatedBmi >= 18.5 && calculatedBmi <= 24.9) {
      bmiFeedback = 'You are within a healthy BMI range. Keep maintaining a balanced diet and regular exercise.';
    } else if (calculatedBmi >= 25 && calculatedBmi <= 29.9) {
      bmiFeedback = 'You are overweight. Focus on weight management through healthy eating and increased physical activity.';
    } else {
      bmiFeedback = 'You are obese. Consider consulting a healthcare provider to manage your weight effectively.';
    }
    setFeedback(bmiFeedback);
  };

  const calculateBmr = () => {
    const bmrResult = 10 * parseFloat(weight) + 6.25 * parseFloat(height) - 5 * parseInt(age) + 5;
    setBmr(bmrResult.toFixed(2));

    setFeedback(`Your BMR is ${bmrResult} kcal/day. This is how many calories you burn just to function. Adjust your calorie intake accordingly.`);
  };

  const calculateHydration = () => {
    const waterIntake = (parseFloat(weight) * 35).toFixed(2);
    setHydration(waterIntake);
    setFeedback(`You should drink around ${waterIntake} ml of water daily.`);
  };

  const calculateHeartRisk = () => {
    const riskScore = (parseInt(age) >= 45 && parseFloat(cholesterol) > 200 && parseFloat(bloodPressure) > 120) ? 80 : 20;
    setHeartRisk(riskScore);

    let heartRiskFeedback = riskScore > 50 ? 'You have a higher risk of heart disease. Consider regular checkups and managing cholesterol.' : 'You have a lower risk of heart disease. Keep maintaining a healthy lifestyle.';
    setFeedback(heartRiskFeedback);
  };

  const calculateSleepNeeded = () => {
    const sleepHours = age <= 18 ? 8 : age <= 60 ? 7 : 6;
    setSleepNeeded(sleepHours);
    setFeedback(`You need about ${sleepHours} hours of sleep per night based on your age.`);
  };

  const calculateExerciseSuggestion = () => {
    const exerciseLevel = age < 30 ? 'high-intensity' : 'moderate-intensity';
    setExerciseSuggestion(exerciseLevel);
    setFeedback(`For your age, ${exerciseLevel} workouts are recommended.`);
  };

  const calculateCalorieDeficit = () => {
    const deficit = (parseFloat(weight) * 7700 / 500).toFixed(2);
    setCalorieDeficit(deficit);
    setFeedback(`To lose weight, you should aim for a daily calorie deficit of ${deficit} kcal.`);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="title">Comprehensive Health & Wellness Calculators</h1>
        <p className="subtitle">Get personalized feedback based on BMI, BMR, hydration, heart risk, and more.</p>
      </header>

      <div className="calculators-container">
        <section className="calculator-section">
          <h2 className="calculator-title">BMI Calculator</h2>
          <div className="input-group">
            <label className="label">Weight (kg):</label>
            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Enter weight in kg" className="input-field" />
          </div>
          <div className="input-group">
            <label className="label">Height (cm):</label>
            <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="Enter height in cm" className="input-field" />
          </div>
          <button onClick={calculateBmi} className="calculate-button">Calculate BMI</button>
          {bmi && <p className="result-text">Your BMI is: {bmi}</p>}
        </section>

        <section className="calculator-section">
          <h2 className="calculator-title">BMR Calculator</h2>
          <div className="input-group">
            <label className="label">Age:</label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Enter age" className="input-field" />
          </div>
          <button onClick={calculateBmr} className="calculate-button">Calculate BMR</button>
          {bmr && <p className="result-text">Your BMR is: {bmr} kcal/day</p>}
        </section>

        <section className="calculator-section">
          <h2 className="calculator-title">Hydration Calculator</h2>
          <button onClick={calculateHydration} className="calculate-button">Calculate Hydration</button>
          {hydration && <p className="result-text">Recommended water intake: {hydration} ml/day</p>}
        </section>

        <section className="calculator-section">
          <h2 className="calculator-title">Heart Disease Risk Calculator</h2>
          <div className="input-group">
            <label className="label">Cholesterol (mg/dL):</label>
            <input type="number" value={cholesterol} onChange={(e) => setCholesterol(e.target.value)} placeholder="Enter cholesterol level" className="input-field" />
          </div>
          <div className="input-group">
            <label className="label">Blood Pressure (mm Hg):</label>
            <input type="number" value={bloodPressure} onChange={(e) => setBloodPressure(e.target.value)} placeholder="Enter blood pressure" className="input-field" />
          </div>
          <button onClick={calculateHeartRisk} className="calculate-button">Calculate Heart Risk</button>
          {heartRisk && <p className="result-text">Your heart disease risk is: {heartRisk}%</p>}
        </section>

        <section className="calculator-section">
          <h2 className="calculator-title">Sleep Calculator</h2>
          <button onClick={calculateSleepNeeded} className="calculate-button">Calculate Sleep Needs</button>
          {sleepNeeded && <p className="result-text">You need around {sleepNeeded} hours of sleep per night.</p>}
        </section>

        <section className="calculator-section">
          <h2 className="calculator-title">Exercise Suggestion</h2>
          <button onClick={calculateExerciseSuggestion} className="calculate-button">Get Exercise Suggestion</button>
          {exerciseSuggestion && <p className="result-text">Suggested workout intensity: {exerciseSuggestion}</p>}
        </section>

        <section className="calculator-section">
          <h2 className="calculator-title">Calorie Deficit Calculator</h2>
          <button onClick={calculateCalorieDeficit} className="calculate-button">Calculate Deficit</button>
          {calorieDeficit && <p className="result-text">Your daily calorie deficit target is: {calorieDeficit} kcal/day</p>}
        </section>

        <p className="feedback-text">{feedback}</p>
      </div>

      <footer className="footer">
        &copy; 2024 Health & Wellness App. All rights reserved.
      </footer>
    </div>
  );
}
