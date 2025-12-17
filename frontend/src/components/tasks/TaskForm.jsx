import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TaskForm = ({ initialData = {}, onSubmit, isSubmitting, title }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'medium',
        due_date: '',
        ...initialData
    });

    // Format due_date for input field if it exists
    useEffect(() => {
        if (initialData.due_date) {
            setFormData(prev => ({
                ...prev,
                due_date: new Date(initialData.due_date).toISOString().split('T')[0]
            }));
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>{title}</h2>
                <button
                    onClick={() => navigate('/tasks')}
                    type="button"
                    style={{
                        padding: '6px 12px',
                        backgroundColor: 'transparent',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Cancel
                </button>
            </div>

            <form onSubmit={handleSubmit} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>Title *</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        placeholder="What needs to be done?"
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd', boxSizing: 'border-box' }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>Description</label>
                    <textarea
                        name="description"
                        value={formData.description || ''}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Add details..."
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd', boxSizing: 'border-box', fontFamily: 'inherit' }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>Priority</label>
                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>Due Date</label>
                        <input
                            type="date"
                            name="due_date"
                            value={formData.due_date || ''}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd', boxSizing: 'border-box' }}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: isSubmitting ? 'not-allowed' : 'pointer',
                            opacity: isSubmitting ? 0.7 : 1
                        }}
                    >
                        {isSubmitting ? 'Saving...' : 'Save Task'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TaskForm;
