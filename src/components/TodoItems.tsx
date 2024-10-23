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
              <p>• Updated: {formatDate(todo.updatedAt)}</p>
              {todo.deadline && <p>• Deadline: {formatDate(todo.deadline)}</p>}
              {todo.urgency !== undefined && <p>• Urgency: {todo.urgency}</p>}
              {todo.importance !== undefined && (
                <p>• Importance: {todo.importance}</p>
              )}
              {todo.estimatedTime !== undefined && (
                <p>• Estimated Time: {todo.estimatedTime} hours</p>
              )}
              {todo.energyLevel !== undefined && (
                <p>• Energy Level: {todo.energyLevel}</p>
              )}
              {todo.context && <p>• Context: {todo.context}</p>}
              {todo.priority && <p>• Priority: {todo.priority}</p>}
              {todo.impact !== undefined && <p>• Impact: {todo.impact}</p>}
              {todo.effort !== undefined && <p>• Effort: {todo.effort}</p>}
              {todo.category && <p>• Category: {todo.category}</p>}
              {todo.value !== undefined && <p>• Value: {todo.value}</p>}
              {todo.confidence !== undefined && (
                <p>• Confidence: {todo.confidence}</p>
              )}
              {todo.reach !== undefined && <p>• Reach: {todo.reach}</p>}
              {todo.assignee && <p>• Assignee: {todo.assignee}</p>}
              {todo.status && <p>• Status: {todo.status}</p>}
              {todo.project && <p>• Project: {todo.project}</p>}
              {todo.recurrence && <p>• Recurrence: {todo.recurrence}</p>}
              {todo.timeSpent !== undefined && (
                <p>• Time Spent: {todo.timeSpent} hours</p>
              )}
              {todo.customerSatisfaction !== undefined && (
                <p>• Customer Satisfaction: {todo.customerSatisfaction}</p>
              )}
              {todo.quadrant && <p>• Quadrant: {todo.quadrant}</p>}
              {todo.sequence !== undefined && (
                <p>• Sequence: {todo.sequence}</p>
              )}
              <p>
                • Tags:{" "}
                {todo.tags && todo.tags.length > 0
                  ? todo.tags.map((tag) => tag.name).join(", ")
                  : "NONE"}
              </p>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};