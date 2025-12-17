import React from 'react';

const TaskFilters = ({ statusFilter, onStatusChange, priorityFilter, onPriorityChange }) => {
    return (
        <div style={{
            marginBottom: '20px',
            display: 'flex',
            gap: '15px',
            flexWrap: 'wrap',
            padding: '15px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <label style={{ fontWeight: 500 }}>Status:</label>
                <select
                    value={statusFilter}
                    onChange={(e) => onStatusChange(e.target.value)}
                    style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ddd' }}
                >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <label style={{ fontWeight: 500 }}>Priority:</label>
                <select
                    value={priorityFilter}
                    onChange={(e) => onPriorityChange(e.target.value)}
                    style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ddd' }}
                >
                    <option value="">All Priorities</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
            </div>
        </div>
    );
};

export default TaskFilters;
