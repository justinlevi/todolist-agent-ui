import { graphql, HttpResponse } from "msw";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

type GetTodosQuery = {
  todos: Todo[];
};

type CreateTodoMutation = {
  createTodo: Todo;
};

type UpdateTodoMutation = {
  updateTodo: Todo;
};

type DeleteTodoMutation = {
  deleteTodo: { id: number };
};

export const handlers = [
  graphql.query<GetTodosQuery>("GetTodos", () => {
    return HttpResponse.json({
      data: {
        todos: [
          { id: 1, title: "Test Todo 1", completed: false },
          { id: 2, title: "Test Todo 2", completed: true },
        ],
      },
    });
  }),

  graphql.mutation<CreateTodoMutation>("CreateTodo", ({ variables }) => {
    const { title, completed } = variables;
    return HttpResponse.json({
      data: {
        createTodo: { id: 3, title, completed },
      },
    });
  }),

  graphql.mutation<UpdateTodoMutation>("UpdateTodo", ({ variables }) => {
    const { id, title, completed } = variables;
    return HttpResponse.json({
      data: {
        updateTodo: { id, title, completed },
      },
    });
  }),

  graphql.mutation <DeleteTodoMutation>("DeleteTodo", ({ variables }) => {
      const { id } = variables;
      return HttpResponse.json({
        data: {
          deleteTodo: { id },
        },
      });
    }),
];
