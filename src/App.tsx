import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TodoList from "./components/TodoList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="container p-4 mx-auto">
          <nav className="mb-8">
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="text-blue-500 hover:text-blue-700">
                  Todo List
                </Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<TodoList />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
