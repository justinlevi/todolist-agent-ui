import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Todo } from "../types";
import * as todoService from "../services/todoService";

export const useFetchTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: todoService.fetchTodos,
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: todoService.createTodo,
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];
      const optimisticTodo: Todo = {
        id: Date.now(),
        ...newTodo,
        completed: newTodo.completed ?? false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        children: [],
        tags:
          newTodo.tags?.map((tag, index) => ({
            id: Date.now() + index,
            name: tag,
          })) || undefined,
      };
      queryClient.setQueryData<Todo[]>(
        ["todos"],
        [...previousTodos, optimisticTodo]
      );
      return { previousTodos };
    },
    onError: (err, newTodo, context: any) => {
      queryClient.setQueryData(["todos"], context.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: todoService.updateTodo,
    onMutate: async (updatedTodo) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];
      queryClient.setQueryData<Todo[]>(
        ["todos"],
        previousTodos.map((todo) =>
          todo.id === updatedTodo.id
            ? {
                ...todo,
                ...updatedTodo,
                tags: Array.isArray(updatedTodo.tags)
                  ? updatedTodo.tags.map((tag) =>
                      typeof tag === "string"
                        ? { id: Date.now(), name: tag }
                        : tag
                    )
                  : todo.tags,
              }
            : todo
        )
      );
      return { previousTodos };
    },
    onError: (err, updatedTodo, context: any) => {
      queryClient.setQueryData(["todos"], context.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: todoService.deleteTodo,
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];
      queryClient.setQueryData<Todo[]>(
        ["todos"],
        previousTodos.filter((todo) => todo.id !== id)
      );
      return { previousTodos };
    },
    onError: (err, { id, title }, context: any) => {
      queryClient.setQueryData(["todos"], context.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
