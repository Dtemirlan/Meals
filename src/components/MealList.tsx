import React, { useEffect, useState } from 'react';
import axios from '../axiosApi';

interface Meal {
    id: string;
    time: string;
    description: string;
    calories: number;
}

interface MealListProps {
    onDelete: (mealId: string) => Promise<void>;
}

const MealList: React.FC<MealListProps> = ({ onDelete }) => {
    const [meals, setMeals] = useState<Meal[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/meals');
                setMeals(response.data);
            } catch (error) {
                console.error('Error fetching meals:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Meal List</h2>
            <ul>
                {meals.map((meal) => (
                    <li key={meal.id}>
                        <div>
                            <strong>{meal.time}</strong> - {meal.description} ({meal.calories} kcal)
                        </div>
                        <div>
                            <button onClick={() => onDelete(meal.id)}>Delete</button>
                            <a href={`/edit/${meal.id}`}>Edit</a>
                        </div>
                    </li>
                ))}
            </ul>
            <div>Total Calories: {meals.reduce((total, meal) => total + meal.calories, 0)}</div>
        </div>
    );
};

export default MealList;
