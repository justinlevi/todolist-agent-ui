import React, { ChangeEvent } from "react";
import { Input } from "./Input";
import { Button } from "./Button";

import { useTodoManagement } from "../hooks/useTodoManagement";

type TodoManagementReturn = ReturnType<typeof useTodoManagement>;

interface TodoInputProps
  extends Pick<TodoManagementReturn, "newTodo" | "setNewTodo" | "addTodo"> {
  isLoading: boolean;
}

export const TodoInput: React.FC<TodoInputProps> = ({
  newTodo,
  setNewTodo,
  addTodo,
  isLoading,
}) => {
  return (
    <div className="flex mb-4">
      <Input
        type="text"
        value={newTodo}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setNewTodo(e.target.value)
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") addTodo(newTodo);
        }}
        placeholder="Add a new task"
        className="flex-grow mr-2"
        aria-label="Add a new task"
        disabled={isLoading}
      />
      <Button
        onClick={() => addTodo(newTodo)}
        disabled={isLoading}
        className="px-4 py-2 font-bold text-white transition-colors bg-blue-500 rounded hover:bg-blue-400"
      >
        SUBMIT
      </Button>
    </div>
  );
};