// @ts-expect-error I need the import
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import TodoList from "./TodoList";
import {
  useFetchTodos,
  useCreateTodo,
  useUpdateTodo,
  useDeleteTodo,
} from "../hooks/useTodoGraphql";

// Mock the hooks
vi.mock("../hooks/useTodoGraphql", () => ({
  useFetchTodos: vi.fn(),
  useCreateTodo: vi.fn(),
  useUpdateTodo: vi.fn(),
  useDeleteTodo: vi.fn(),
}));

describe("TodoList", () => {
  it("renders loading state initially", () => {
    (useFetchTodos as jest.Mock).mockReturnValue({
      status: "pending",
      data: null,
      error: null,
    });

    render(<TodoList />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    (useFetchTodos as jest.Mock).mockReturnValue({
      status: "error",
      data: null,
      error: new Error("Failed to fetch"),
    });

    render(<TodoList />);
    expect(
      screen.getByText("Error fetching todos: Failed to fetch")
    ).toBeInTheDocument();
  });

  it("renders todos and allows adding a new todo", async () => {
    (useFetchTodos as jest.Mock).mockReturnValue({
      status: "success",
      data: [{ id: 1, title: "Test Todo", completed: false }],
      error: null,
    });

    const createTodoMock = vi.fn();
    (useCreateTodo as jest.Mock).mockReturnValue({
      mutate: createTodoMock,
    });

    render(<TodoList />);

    expect(screen.getByText("Test Todo")).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("Add a new task"), {
      target: { value: "New Todo" },
    });
    fireEvent.click(screen.getByText("Add"));

    await waitFor(() => {
      expect(createTodoMock).toHaveBeenCalledWith({
        title: "New Todo",
        completed: false,
      });
    });
  });

  it("allows toggling a todo", async () => {
    (useFetchTodos as jest.Mock).mockReturnValue({
      status: "success",
      data: [{ id: 1, title: "Test Todo", completed: false }],
      error: null,
    });

    const updateTodoMock = vi.fn();
    (useUpdateTodo as jest.Mock).mockReturnValue({
      mutate: updateTodoMock,
    });

    render(<TodoList />);

    fireEvent.click(screen.getByRole("checkbox"));

    await waitFor(() => {
      expect(updateTodoMock).toHaveBeenCalledWith({
        id: 1,
        title: "Test Todo",
        completed: true,
      });
    });
  });

  it("allows deleting a todo", async () => {
    (useFetchTodos as jest.Mock).mockReturnValue({
      status: "success",
      data: [{ id: 1, title: "Test Todo", completed: false }],
      error: null,
    });

    const deleteTodoMock = vi.fn();
    (useDeleteTodo as jest.Mock).mockReturnValue({
      mutate: deleteTodoMock,
    });

    render(<TodoList />);

    // get by the id value of "Trash"
    const trashButton = screen.getByRole("button", { name: "Trash" });
    fireEvent.click(trashButton);
    

    await waitFor(() => {
      expect(deleteTodoMock).toHaveBeenCalledWith(1);
    });
  });
});
