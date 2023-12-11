import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MealList from '../src/components/MealList.tsx';
import AddEditMeal from '../src/components/AddEditMeal.tsx';

const App: React.FC = () => {
    const handleDelete = async (mealId: string) => {
        try {
            console.log(`Deleting meal with ID: ${mealId}`);
        } catch (error) {
            console.error('Error deleting meal:', error);
        }
    };

    return (
        <div>
            <h1>Calorie Tracker</h1>
            <Routes>
                <Route path="/" element={<MealList onDelete={handleDelete} />} />
                <Route path="/add" element={<AddEditMeal isEditing={false} />} />
                <Route path="/edit/:mealId" element={<AddEditMeal isEditing={true} />} />
            </Routes>
        </div>
    );
};

export default App;
