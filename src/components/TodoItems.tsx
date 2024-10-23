import { Todo } from "../types";
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";
import Input from "./Input";
import Button from "./Button";

import { useTodoManagement } from "../hooks/useTodoManagement";

type TodoManagementReturn = ReturnType<typeof useTodoManagement>;

interface TodoItemsProps
  extends Pick<
    TodoManagementReturn,
    | "todos"
    | "toggleTodo"
    | "deleteTodo"
    | "handleEditStart"
    | "handleEditEnd"
    | "editingTodoId"
    | "editedTitle"
    | "setEditedTitle"
  > {
  expandedTodos: number[];
  toggleExpand: (id: number) => void;
}

export const TodoItems: React.FC<TodoItemsProps> = ({
  todos,
  toggleTodo,
  deleteTodo,
  handleEditStart,
  handleEditEnd,
  editingTodoId,
  editedTitle,
  setEditedTitle,
  expandedTodos,
  toggleExpand,
}) => {
  const formatDate = (date: string) => new Date(date).toLocaleString();

  const findTodoById = (id: number): Todo | undefined => {
    return todos.find((todo) => todo.id === id);
  };

  return (
    <ul>
      {todos?.map((todo) => (
        <li key={todo.id} className="pb-4 mb-4 border-b">
          <div className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center flex-grow mr-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo)}
                className="mr-2"
                aria-label="Toggle completed"
              />
              {editingTodoId === todo.id ? (
                <Input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleEditEnd(todo);
                    }
                  }}
                  onBlur={() => handleEditEnd(todo)}
                  className="flex-grow w-full p-0 m-0 bg-transparent border-none focus:ring-0 focus:outline-none focus:shadow-none focus:ring-offset-0 focus:ring-offset-transparent focus-visible:ring-0"
                  autoFocus
                />
              ) : (
                <span
                  className={`flex-grow ${
                    todo.completed ? "line-through text-gray-500" : ""
                  }`}
                  onClick={() => handleEditStart(todo)}
                >
                  {todo.title}
                </span>
              )}
            </div>

            <Button
              onClick={() => deleteTodo(todo.id)}
              className="mr-2 text-red-500"
              aria-label="Trash"
            >
              <Trash2 size={18} />
            </Button>
            {expandedTodos.includes(todo.id) ? (
              <ChevronUp size={18} onClick={() => toggleExpand(todo.id)} />
            ) : (
              <ChevronDown size={18} onClick={() => toggleExpand(todo.id)} />
            )}
          </div>

          {expandedTodos.includes(todo.id) && (
            <div className="mt-2 ml-6 text-sm text-gray-600">
              <p>• Created: {formatDate(todo.createdAt)}</p>
              {todo.dueDate && <p>• Due Date: {formatDate(todo.dueDate)}</p>}
              <p>• Weight: {todo.weight}</p>
              {todo.parentId && (
                <p>
                  • Parent: {findTodoById(todo.parentId)?.title || "Unknown"}
                </p>
              )}
              {todo.children.length > 0 && (
                <p>
                  • Children:{" "}
                  {todo.children
                    .map((childId) => findTodoById(childId)?.title || "Unknown")
                    .join(", ")}
                </p>
              )}
              <p>
                • Tags: {todo.tags.length > 0 ? todo.tags.join(", ") : "NONE"}
              </p>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};
