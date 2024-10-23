import React, { useState } from "react";
import Sequence from "./Sequence";
import { TodoInput } from "./TodoInput";
import { AIAssistant } from "./AIAssistant";
import { useAIAssistant } from "../hooks/useAIAssistant";
import { useTodoList } from "../hooks/useTodoList";
import { TodoListContent } from "./TodoListContent";
import { useTodoManagement } from "../hooks/useTodoManagement";
import { Sparkles } from "lucide-react";

export const TodoList: React.FC = () => {
  const {
    todos,
    status,
    error,
    addTodo,
    toggleTodo,
    deleteTodo,
    refetch,
    setNewTodo,
    editingTodoId,
    editedTitle,
    handleEditStart,
    handleEditEnd,
    setEditedTitle,
    newTodo,
  } = useTodoManagement();
  const { expandedTodos, toggleExpand } = useTodoList();
  const [isMagicalMode, setIsMagicalMode] = useState(true);

  const {
    agentInput,
    setAgentInput,
    agentResponse,
    isLoading,
    handleAgentQuery,
  } = useAIAssistant(refetch);

  const handleResetAndQuery = () => {
    return handleAgentQuery();
  };

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return (
      <div>
        Error fetching todos:{" "}
        {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <span className="text-sm text-gray-500">
        Switch to{" "}
        <a
          onClick={() => setIsMagicalMode(!isMagicalMode)}
          className="px-1py-1 text-sm text-blue-300 cursor-pointer hover:text-blue-500"
        >
          {isMagicalMode ? "🥱" : "✨ 🦄 ✨"}
        </a>{" "}
        mode
      </span>

      {isMagicalMode ? (
        <>
          <div className="flex items-center mb-3 mr-2">
            <Sparkles size={28} className="mr-1" />
            <h2 className="flex text-2xl font-bold">AI Assistant</h2>
          </div>
          <AIAssistant
            agentInput={agentInput}
            setAgentInput={setAgentInput}
            handleAgentQuery={handleResetAndQuery}
            agentResponse={agentResponse}
            isLoading={isLoading}
          />
        </>
      ) : (
        <>
          <div className="flex items-center mb-3 mr-2">
            <h2 className="flex text-2xl font-bold">Standard Input</h2>
          </div>
          <TodoInput
            newTodo={newTodo}
            setNewTodo={setNewTodo}
            addTodo={addTodo}
            isLoading={isLoading}
          />
        </>
      )}
      <div className="max-w-lg p-4 mx-auto mt-8 bg-white rounded shadow">
        <h1 className="mb-4 text-2xl font-bold">To-Do List</h1>

        <TodoListContent
          todos={todos}
          addTodo={addTodo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          expandedTodos={expandedTodos}
          toggleExpand={toggleExpand}
          isLoading={isLoading}
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          editingTodoId={editingTodoId}
          editedTitle={editedTitle}
          handleEditStart={handleEditStart}
          handleEditEnd={handleEditEnd}
          setEditedTitle={setEditedTitle}
          agentInput={agentInput}
          setAgentInput={setAgentInput}
          agentResponse={agentResponse}
          handleResetAndQuery={handleResetAndQuery}
        />
      </div>
    </div>
  );
};

export default TodoList;
