import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TodoList from "./components/TodoList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="container p-4 mx-auto">
          <Routes>
            <Route path="/" element={<TodoList />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
