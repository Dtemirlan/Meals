import React, { useEffect, useState } from 'react';
import axios from '../axiosApi';
import MealList from '../components/MealList.tsx';
import AddEditMeal from '../components/AddEditMeal.tsx';
import {Meal} from '../types';

const Home: React.FC = () => {
    const [meals, setMeals] = useState<Meal[]>([]);
    const [isEditing, setIsEditing] = useState<boolean>(false);

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

    const handleAddNew = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    return (
        <div>
            <h2>Home Page</h2>
            {isEditing ? (
                <AddEditMeal isEditing={isEditing} onCancelEdit={handleCancelEdit} />
            ) : (
                <div>
                    <MealList meals={meals} />
                    <button type="button" className="btn btn-primary" onClick={handleAddNew}>
                        Add new meal
                    </button>
                </div>
            )}
        </div>
    );
};

export default Home;
