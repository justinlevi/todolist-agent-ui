import { useState } from "react";

export const useTodoList = () => {
  const [expandedTodos, setExpandedTodos] = useState<number[]>([]);

  const toggleExpand = (id: number) => {
    setExpandedTodos((prev) =>
      prev.includes(id) ? prev.filter((todoId) => todoId !== id) : [...prev, id]
    );
  };

  return {
    expandedTodos,
    toggleExpand,
  };
};
