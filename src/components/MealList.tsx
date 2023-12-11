import React from 'react';

interface Meal {
    id: string;
    time: string;
    description: string;
    calories: number;
}

interface MealListProps {
    meals: Meal[];
    onDelete: (mealId: string) => Promise<void>;
}

const MealList: React.FC<MealListProps> = ({ meals, onDelete }) => {
    return (
        <div>
            <h2>Meals List</h2>
            <ul>
                {meals.map((meal) => (
                    <li key={meal.id}>
                        <div>
                            <strong>{meal.time}</strong> - {meal.description} ({meal.calories} kcal)
                        </div>
                        <button onClick={() => onDelete(meal.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <p>Total Calories: {meals.reduce((total, meal) => total + meal.calories, 0)}</p>
        </div>
    );
};

export default MealList;
