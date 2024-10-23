import { TodoItems } from "./TodoItems";
import { useTodoManagement } from "../hooks/useTodoManagement";

type TodoManagementReturn = ReturnType<typeof useTodoManagement>;

interface TodoListContentProps
  extends Omit<TodoManagementReturn, "status" | "error" | "refetch"> {
  expandedTodos: number[];
  toggleExpand: (id: number) => void;
  isLoading: boolean;
  agentInput: string;
  setAgentInput: React.Dispatch<React.SetStateAction<string>>;
  agentResponse: string;
  handleResetAndQuery: () => Promise<void>;
}

export const TodoListContent: React.FC<TodoListContentProps> = (props) => {
  const {
    todos,
    toggleTodo,
    deleteTodo,
    expandedTodos,
    toggleExpand,
    editingTodoId,
    editedTitle,
    handleEditStart,
    handleEditEnd,
    setEditedTitle,
  } = props;

  return (
    <div className="max-w-lg p-4 mx-auto mt-4 bg-white">
      <TodoItems
        todos={todos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        expandedTodos={expandedTodos}
        toggleExpand={toggleExpand}
        editingTodoId={editingTodoId}
        editedTitle={editedTitle}
        handleEditStart={handleEditStart}
        handleEditEnd={handleEditEnd}
        setEditedTitle={setEditedTitle}
      />
    </div>
  );
};
