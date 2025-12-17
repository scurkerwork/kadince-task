import React from 'react';

const TaskFilters = ({ statusFilter, onStatusChange, priorityFilter, onPriorityChange }) => {
    return (
        <div className="card" style={{
            marginBottom: '20px',
            display: 'flex',
            gap: '15px',
            flexWrap: 'wrap',
            padding: '15px'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <label className="label" style={{ marginBottom: 0 }}>Status:</label>
                <select
                    value={statusFilter}
                    onChange={(e) => onStatusChange(e.target.value)}
                    className="input-control"
                    style={{ width: 'auto', padding: '6px' }}
                >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <label className="label" style={{ marginBottom: 0 }}>Priority:</label>
                <select
                    value={priorityFilter}
                    onChange={(e) => onPriorityChange(e.target.value)}
                    className="input-control"
                    style={{ width: 'auto', padding: '6px' }}
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
