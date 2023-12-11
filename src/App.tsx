import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddEditMeal from './components/AddEditMeal';
import MealList from './components/MealList';

const App: React.FC = () => {
    const exampleMeals = [
        { id: '1', time: 'Breakfast', description: 'Scrambled eggs', calories: 300 },
        { id: '2', time: 'Lunch', description: 'Chicken salad', calories: 500 },
    ];

    const handleDelete = async (mealId: string) => {
        console.log(`Deleting meal with id: ${mealId}`);
    };

    return (
        <div>
            <h1>Calorie Tracker</h1>
            <Routes>
                <Route
                    path="/"
                    element={<MealList meals={exampleMeals} onDelete={handleDelete} />}
                />
                <Route path="/add" element={<AddEditMeal />} />
                <Route path="/edit/:mealId" element={<AddEditMeal isEditing />} />
            </Routes>
        </div>
    );
};

export default App;
