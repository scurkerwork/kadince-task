import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchTasks, deleteTask, toggleTaskCompletion } from '../../api/tasks';
import TaskItem from './TaskItem';
import TaskFilters from './TaskFilters';
import EmptyState from './EmptyState';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filters
    const [statusFilter, setStatusFilter] = useState('all');
    const [priorityFilter, setPriorityFilter] = useState('');

    const loadTasks = async () => {
        try {
            setLoading(true);
            setError(null);
            const params = {};

            if (statusFilter !== 'all') params.status = statusFilter;
            if (priorityFilter) params.priority = priorityFilter;

            const data = await fetchTasks(params);
            setTasks(data);
        } catch (err) {
            console.error('Failed to load tasks:', err);
            setError('Failed to load tasks. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Reload tasks when filters change
    useEffect(() => {
        loadTasks();
    }, [statusFilter, priorityFilter]);

    const handleToggle = async (id) => {
        try {
            // Optimistic update
            setTasks(prevTasks => prevTasks.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            ));

            await toggleTaskCompletion(id);
        } catch (err) {
            // Revert on error
            console.error('Failed to toggle task:', err);
            loadTasks();
            alert('Failed to update task status');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this task?')) return;

        try {
            // Optimistic update
            setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
            await deleteTask(id);
        } catch (err) {
            console.error('Failed to delete task:', err);
            loadTasks();
            alert('Failed to delete task');
        }
    };

    if (loading && tasks.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '40px' }}>
                <p>Loading tasks...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ padding: '20px', color: '#dc3545', backgroundColor: '#f8d7da', borderRadius: '4px' }}>
                {error}
                <button onClick={loadTasks} style={{ marginLeft: '10px' }}>Retry</button>
            </div>
        );
    }

    return (
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
            }}>
                <h2 style={{ margin: 0 }}>My Tasks</h2>
                <Link
                    to="/tasks/new"
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '4px',
                        fontWeight: 500
                    }}
                >
                    + New Task
                </Link>
            </div>

            <TaskFilters
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
                priorityFilter={priorityFilter}
                onPriorityChange={setPriorityFilter}
            />

            {tasks.length === 0 ? (
                <EmptyState
                    message={
                        statusFilter !== 'all' || priorityFilter
                            ? "No tasks match your filters."
                            : "You don't have any tasks yet."
                    }
                    actionLabel={!(statusFilter !== 'all' || priorityFilter) ? "Create your first task" : null}
                    onAction={!(statusFilter !== 'all' || priorityFilter) ? () => window.location.href = '/tasks/new' : null}
                />
            ) : (
                <div>
                    {tasks.map(task => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onToggle={handleToggle}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskList;
