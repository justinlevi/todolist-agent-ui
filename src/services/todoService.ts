import { gql, request } from "graphql-request";
import { Todo, CreateTodoInput, UpdateTodoInput } from "../types";

const API_URL =
  `${import.meta.env.VITE_BACKEND_URL}/graphql` ||
  "http://localhost:3000/graphql";
export const fetchTodos = async (): Promise<Todo[]> => {
  const { todos } = await request<{ todos: Todo[] }>(
    API_URL,
    gql`
      query GetTodos {
        todos {
          id
          title
          completed
          createdAt
          dueDate
          weight
          parentId
          children
          tags
        }
      }
    `
  );
  return todos;
};

export const createTodo = async (newTodo: CreateTodoInput): Promise<Todo> => {
  const { createTodo } = await request<{ createTodo: Todo }>(
    API_URL,
    gql`
      mutation CreateTodo($data: CreateTodoInput!) {
        createTodo(data: $data) {
          id
          title
          completed
          createdAt
          dueDate
          weight
          parentId
          children
          tags
        }
      }
    `,
    { data: newTodo }
  );
  return createTodo;
};

export const toggleTodo = async (id: number): Promise<Todo> => {
  const { toggleTodo } = await request<{ toggleTodo: Todo }>(
    API_URL,
    gql`
      mutation ToggleTodo($id: Int!) {
        toggleTodo(id: $id) {
          id
          title
          completed
          createdAt
          dueDate
          weight
          parentId
          children
          tags
        }
      }
    `,
    { id }
  );
  return toggleTodo;
};

export const updateTodo = async (
  updatedTodo: UpdateTodoInput
): Promise<Todo> => {
  const { updateTodo } = await request<{ updateTodo: Todo }>(
    API_URL,
    gql`
      mutation UpdateTodo($data: UpdateTodoInput!) {
        updateTodo(data: $data) {
          id
          title
          completed
          createdAt
          dueDate
          weight
          parentId
          children
          tags
        }
      }
    `,
    { data: updatedTodo }
  );
  return updateTodo;
};

export const deleteTodo = async (id: number): Promise<Todo> => {
  const { deleteTodo } = await request<{ deleteTodo: Todo }>(
    API_URL,
    gql`
      mutation DeleteTodo($id: Int!) {
        deleteTodo(id: $id) {
          id
          title
          completed
          createdAt
          dueDate
          weight
          parentId
          children
          tags
        }
      }
    `,
    { id }
  );
  return deleteTodo;
};
