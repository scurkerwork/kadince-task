import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmptyState = ({ message, actionLabel, onAction }) => {
    const navigate = useNavigate();

    return (
        <div className="card" style={{
            textAlign: 'center',
            padding: '40px 20px',
            color: 'var(--text-secondary)'
        }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📝</div>
            <h3>No tasks found</h3>
            <p style={{ marginBottom: '24px' }}>{message || "You don't have any tasks yet."}</p>
            {actionLabel && (
                <button
                    onClick={onAction || (() => navigate('/tasks/new'))}
                    className="btn btn-primary"
                >
                    {actionLabel}
                </button>
            )}
        </div>
    );
};

export default EmptyState;
