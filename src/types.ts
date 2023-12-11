interface Meal {
    id: string;
    time: string;
    description: string;
    calories: number;
}

export interface MealListProps {
    meals: Meal[];
    onDelete: (mealId: string) => Promise<void>;
}

export interface Post {
    id: string;
    title: string;
    content: string;
}