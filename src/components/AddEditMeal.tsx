import React, { useState, useEffect } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import axios from '../axiosApi';

interface AddEditMealProps  {
    isEditing?: boolean;
}

const AddEditMeal: React.FC<AddEditMealProps> = ({ isEditing }) => {
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');
    const [calories, setCalories] = useState('');
    const navigate = useNavigate();
    const { mealId } = useParams();

    useEffect(() => {
        if (isEditing && mealId) {
            const fetchMeal = async () => {
                try {
                    const response = await axios.get(`/meals/${mealId}.json`);
                    if (response.data) {
                        const { time, description, calories } = response.data;
                        setTime(time);
                        setDescription(description);
                        setCalories(calories.toString());
                    }
                } catch (error) {
                    console.error('Error fetching meal:', error);
                }
            };

            fetchMeal();
        }
    }, [isEditing, mealId]);

    const handleSave = async () => {
        const mealData = {
            time,
            description,
            calories: parseInt(calories, 10),
        };

        try {
            if (isEditing) {
                await axios.put(`/meals/${mealId}.json`, mealData);
            } else {
                await axios.post('/meals.json', mealData);
            }

            navigate('/');
        } catch (error) {
            console.error('Error saving meal:', error);
        }
    };

    return (
        <div>
            <h2>{isEditing ? 'Edit Meal' : 'Add New Meal'}</h2>
            <form>
                {/* Ваши поля ввода (select, input, textarea) */}
                <button type="button" onClick={handleSave}>
                    Save
                </button>
            </form>
        </div>
    );
};

export default AddEditMeal;
