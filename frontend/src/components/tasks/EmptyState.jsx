import React from 'react';

const EmptyState = ({ message, actionLabel, onAction }) => {
    return (
        <div style={{
            textAlign: 'center',
            padding: '40px 20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            color: '#6c757d'
        }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📝</div>
            <h3>No tasks found</h3>
            <p style={{ marginBottom: '24px' }}>{message || "You don't have any tasks yet."}</p>
            {onAction && (
                <button
                    onClick={onAction}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    {actionLabel || 'Create Task'}
                </button>
            )}
        </div>
    );
};

export default EmptyState;
