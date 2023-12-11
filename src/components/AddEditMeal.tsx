import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../axiosApi';
import {Meal} from '../types';

interface AddEditMealProps {
    isEditing: boolean;
    onCancelEdit: () => void;
}

const AddEditMeal: React.FC<AddEditMealProps> = ({ isEditing, onCancelEdit }) => {
    const navigate = useNavigate();
    const { mealId } = useParams();
    const [time, setTime] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [calories, setCalories] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            if (isEditing && mealId) {
                try {
                    const response = await axios.get(`/meals/${mealId}`);
                    const mealToEdit: Meal = response.data;
                    setTime(mealToEdit.time);
                    setDescription(mealToEdit.description);
                    setCalories(mealToEdit.calories);
                } catch (error) {
                    console.error('Error fetching meal:', error);
                }
            }
        };

        fetchData();
    }, [isEditing, mealId]);

    const handleSave = async () => {
        try {
            if (isEditing && mealId) {
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
                    <input
                        type="text"
                        className="form-control"
                        id="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
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
                <button type="button" className="btn btn-secondary" onClick={onCancelEdit}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default AddEditMeal;
