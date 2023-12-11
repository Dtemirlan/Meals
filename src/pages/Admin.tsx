import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../axiosApi';
import MealList from '../components/MealList';

interface Meal {
    id: string;
    time: string;
    description: string;
    calories: number;
}

const Admin: React.FC = () => {
    const [meals, setMeals] = useState<Meal[]>([]);

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const response = await axios.get('/meals');
                setMeals(response.data);
            } catch (error) {
                console.error('Error fetching meals:', error);
            }
        };

        fetchMeals();
    }, []);

    const handleDelete = async (mealId: string) => {
        try {
            await axios.delete(`/meals/${mealId}`);
            const updatedMeals = meals.filter((meal) => meal.id !== mealId);
            setMeals(updatedMeals);
        } catch (error) {
            console.error('Error deleting meal:', error);
        }
    };

    return (
        <div>
            <h2>Admin Page</h2>
            <Link to="/admin/add">Add new meal</Link>
            <MealList meals={meals} onDelete={handleDelete} />
        </div>
    );
};

export default Admin;
