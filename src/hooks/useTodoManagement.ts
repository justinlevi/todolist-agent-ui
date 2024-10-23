import { useState } from "react";
import { Todo } from "../types";
import {
  useCreateTodo,
  useDeleteTodo,
  useFetchTodos,
  useUpdateTodo,
} from "./useTodoGraphql";

export const useTodoManagement = () => {
  const [newTodo, setNewTodo] = useState<string>("");
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>("");

  const { status, data: todos = [], error, refetch } = useFetchTodos();

  const createTodoMutation = useCreateTodo();
  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();

  const handleEditStart = (todo: Todo) => {
    setEditingTodoId(todo.id);
    setEditedTitle(todo.title);
  };

  const handleEditEnd = (todo: Todo) => {
    if (editedTitle.trim() !== "") {
      updateTodoMutation.mutate({
        id: todo.id,
        title: editedTitle.trim(),
        completed: todo.completed,
      });
    }
    setEditingTodoId(null);
    setEditedTitle("");
  };

  const addTodo = (newTodo: string) => {
    if (newTodo.trim() !== "") {
      createTodoMutation.mutate(
        { title: newTodo.trim() },
        {
          onSuccess: () => {
            setNewTodo("");
            refetch();
          },
        }
      );
    }
  };

  const toggleTodo = (todo: Todo) => {
    updateTodoMutation.mutate(
      {
        id: todo.id,
        title: todo.title,
        completed: !todo.completed,
      },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  const deleteTodo = (id: number) => {
    deleteTodoMutation.mutate(id, {
      onSuccess: () => {
        refetch();
      },
    });
  };

  return {
    newTodo,
    setNewTodo,
    todos,
    status,
    error,
    addTodo,
    toggleTodo,
    deleteTodo,
    handleEditStart,
    handleEditEnd,
    editingTodoId,
    editedTitle,
    setEditedTitle,
    refetch,
  };
};
