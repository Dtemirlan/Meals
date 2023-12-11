import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home';
import Admin from './pages/Admin';
import AddEditMeal from './components/AddEditMeal.tsx';
import { Meal } from './types.ts';

const App: React.FC = () => {
    const [meals, setMeals] = useState<Meal[]>([]);

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const response = await axios.get('/meals');
                setMeals(response.data);
            } catch (error) {}
        };

        fetchMeals();
    }, []);

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={<Home meals={meals} />}
                />
                <Route path="/admin" element={<Admin />} />
                <Route
                    path="/add"
                    element={<AddEditMeal isEditing={false} onCancelEdit={() => <Navigate to="/" />} />}
                />
                <Route
                    path="/edit/:mealId"
                    element={<AddEditMeal isEditing={true} onCancelEdit={() => <Navigate to="/" />} />}
                />
            </Routes>
        </Router>
    );
};

export default App;
