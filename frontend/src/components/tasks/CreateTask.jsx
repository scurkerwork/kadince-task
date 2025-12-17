import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTask } from '../../api/tasks';
import TaskForm from './TaskForm';

const CreateTask = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (formData) => {
        try {
            setIsSubmitting(true);
            setError(null);
            await createTask(formData);
            navigate('/tasks');
        } catch (err) {
            console.error('Failed to create task:', err);
            setError(err.message || 'Failed to create task. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            {error && (
                <div style={{
                    padding: '10px',
                    marginBottom: '20px',
                    backgroundColor: '#f8d7da',
                    color: '#721c24',
                    borderRadius: '4px'
                }}>
                    {error}
                </div>
            )}
            <TaskForm
                title="Create New Task"
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
            />
        </div>
    );
};

export default CreateTask;
