import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchTask, updateTask } from '../../api/tasks';
import { useToast } from '../../context/ToastContext';
import TaskForm from './TaskForm';

const EditTask = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToast } = useToast();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const loadTask = async () => {
            try {
                setLoading(true);
                const data = await fetchTask(id);
                setTask(data);
            } catch (err) {
                console.error('Failed to load task:', err);
                setError('Failed to load task details.');
                addToast('Failed to load task details', 'error');
            } finally {
                setLoading(false);
            }
        };

        loadTask();
    }, [id, addToast]);

    const handleSubmit = async (formData) => {
        try {
            setIsSubmitting(true);
            setError(null);
            await updateTask(id, formData);
            addToast('Task updated successfully', 'success');
            navigate('/tasks');
        } catch (err) {
            console.error('Failed to update task:', err);
            const errorMessage = err.message || 'Failed to update task. Please try again.';
            setError(errorMessage);
            addToast(errorMessage, 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '40px' }}>Loading task...</div>;
    }

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
            {task && (
                <TaskForm
                    title="Edit Task"
                    initialData={task}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                />
            )}
        </div>
    );
};

export default EditTask;
