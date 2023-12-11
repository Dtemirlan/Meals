import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../axiosApi';

interface AddEditMealProps {
    isEditing: boolean;
}

const AddEditMeal: React.FC<AddEditMealProps> = ({ isEditing }) => {
    const [time, setTime] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [calories, setCalories] = useState<number>(0);
    const navigate = useNavigate();
    const { mealId } = useParams();

    useEffect(() => {
        if (isEditing && mealId) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`/meals/${mealId}`);
                    const meal = response.data;
                    setTime(meal.time);
                    setDescription(meal.description);
                    setCalories(meal.calories);
                } catch (error) {
                    console.error('Error fetching meal:', error);
                }
            };

            fetchData();
        }
    }, [isEditing, mealId]);

    const handleSave = async () => {
        try {
            if (isEditing) {
                await axios.put(`/meals/${mealId}`, { time, description, calories });
            } else {
                await axios.post('/meals', { time, description, calories });
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
                <div className="mb-3">
                    <label htmlFor="time" className="form-label">
                        Time
                    </label>
                    <select
                        id="time"
                        className="form-select"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    >
                        <option value="Breakfast">Breakfast</option>
                        <option value="Snack">Snack</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="calories" className="form-label">
                        Calories
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="calories"
                        value={calories}
                        onChange={(e) => setCalories(Number(e.target.value))}
                    />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleSave}>
                    Save
                </button>
            </form>
        </div>
    );
};

export default AddEditMeal;
