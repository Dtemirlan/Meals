import React from 'react';
import {Meal} from "../types.ts";

interface MealListProps {
    meals: Meal[];
    onDelete: (mealId: string) => Promise<void>;
}

const MealList: React.FC<MealListProps> = ({ meals, onDelete }) => {
    console.log('Meals in MealList:', meals);

    return (
        <ul>
            {meals.map((meal) => (
                <li key={meal.id}>
                    <div>
                        <strong>{meal.time}</strong>
                        <p>{meal.description}</p>
                        <p>Calories: {meal.calories}</p>
                        <button onClick={() => onDelete(meal.id)}>Delete</button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default MealList;
