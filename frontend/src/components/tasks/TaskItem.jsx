import React from 'react';
import { Link } from 'react-router-dom';

const getPriorityColor = (priority) => {
    switch (priority) {
        case 'high': return 'var(--danger-color)';
        case 'medium': return 'var(--warning-color)';
        case 'low': return 'var(--success-color)';
        default: return 'var(--text-secondary)';
    }
};

const TaskItem = ({ task, onToggle, onDelete }) => {
    const isOverdue = !task.completed && task.due_date && new Date(task.due_date) < new Date();

    return (
        <div className="card" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px',
            borderLeft: `4px solid ${getPriorityColor(task.priority)}`,
            opacity: task.completed ? 0.7 : 1,
            transition: 'opacity var(--transition-speed)'
        }}>
            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => onToggle(task.id)}
                        style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--primary-color)' }}
                    />
                    <h3 style={{
                        margin: 0,
                        fontSize: '1.1rem',
                        textDecoration: task.completed ? 'line-through' : 'none',
                        color: task.completed ? 'var(--text-muted)' : 'var(--text-primary)'
                    }}>
                        <Link to={`/tasks/${task.id}/edit`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                            {task.title}
                        </Link>
                    </h3>
                    <span style={{
                        fontSize: '0.75rem',
                        padding: '2px 6px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: getPriorityColor(task.priority),
                        color: 'white',
                        textTransform: 'uppercase'
                    }}>
                        {task.priority}
                    </span>
                    {isOverdue && (
                        <span style={{
                            fontSize: '0.75rem',
                            padding: '2px 6px',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: 'var(--danger-color)',
                            color: 'white'
                        }}>
                            OVERDUE
                        </span>
                    )}
                </div>

                {task.description && (
                    <p style={{ margin: '0 0 5px 28px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        {task.description}
                    </p>
                )}

                {task.due_date && (
                    <div style={{ marginLeft: '28px', fontSize: '0.85rem', color: isOverdue ? 'var(--danger-color)' : 'var(--text-secondary)' }}>
                        📅 Due: {new Date(task.due_date).toLocaleDateString()}
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
                <Link
                    to={`/tasks/${task.id}/edit`}
                    className="btn btn-secondary"
                    style={{ textDecoration: 'none' }}
                >
                    Edit
                </Link>
                <button
                    onClick={() => onDelete(task.id)}
                    className="btn btn-danger"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskItem;
