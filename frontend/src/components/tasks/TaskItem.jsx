import React from 'react';
import { Link } from 'react-router-dom';

const getPriorityColor = (priority) => {
    switch (priority) {
        case 'high': return '#dc3545';
        case 'medium': return '#ffc107';
        case 'low': return '#28a745';
        default: return '#6c757d';
    }
};

const TaskItem = ({ task, onToggle, onDelete }) => {
    const isOverdue = !task.completed && task.due_date && new Date(task.due_date) < new Date();

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '15px',
            marginBottom: '10px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            borderLeft: `4px solid ${getPriorityColor(task.priority)}`,
            opacity: task.completed ? 0.7 : 1
        }}>
            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => onToggle(task.id)}
                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                    />
                    <h3 style={{
                        margin: 0,
                        fontSize: '1.1rem',
                        textDecoration: task.completed ? 'line-through' : 'none',
                        color: task.completed ? '#6c757d' : '#212529'
                    }}>
                        <Link to={`/tasks/${task.id}/edit`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                            {task.title}
                        </Link>
                    </h3>
                    <span style={{
                        fontSize: '0.75rem',
                        padding: '2px 6px',
                        borderRadius: '4px',
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
                            borderRadius: '4px',
                            backgroundColor: '#dc3545',
                            color: 'white'
                        }}>
                            OVERDUE
                        </span>
                    )}
                </div>

                {task.description && (
                    <p style={{ margin: '0 0 5px 28px', color: '#666', fontSize: '0.9rem' }}>
                        {task.description}
                    </p>
                )}

                {task.due_date && (
                    <div style={{ marginLeft: '28px', fontSize: '0.85rem', color: isOverdue ? '#dc3545' : '#888' }}>
                        📅 Due: {new Date(task.due_date).toLocaleDateString()}
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
                <Link
                    to={`/tasks/${task.id}/edit`}
                    style={{
                        padding: '6px 12px',
                        backgroundColor: '#e9ecef',
                        color: '#495057',
                        borderRadius: '4px',
                        textDecoration: 'none',
                        fontSize: '0.9rem'
                    }}
                >
                    Edit
                </Link>
                <button
                    onClick={() => onDelete(task.id)}
                    style={{
                        padding: '6px 12px',
                        backgroundColor: '#fae3e5',
                        color: '#dc3545',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                    }}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskItem;
