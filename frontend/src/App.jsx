import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ErrorBoundary from './components/common/ErrorBoundary';
import TaskList from './components/tasks/TaskList';

// Placeholder components for routes (will be implemented in next steps)
const CreateTask = () => <div><h2>Create Task</h2><p>Coming soon...</p></div>;
const EditTask = () => <div><h2>Edit Task</h2><p>Coming soon...</p></div>;

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/tasks" replace />} />
            <Route path="tasks" element={<TaskList />} />
            <Route path="tasks/new" element={<CreateTask />} />
            <Route path="tasks/:id/edit" element={<EditTask />} />
            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
