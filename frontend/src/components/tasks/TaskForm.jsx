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
        <div className="fade-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ margin: 0 }}>{title}</h2>
                <button
                    onClick={() => navigate('/tasks')}
                    type="button"
                    className="btn btn-secondary"
                >
                    Cancel
                </button>
            </div>

            <form onSubmit={handleSubmit} className="card">
                <div style={{ marginBottom: '15px' }}>
                    <label className="label">Title *</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        placeholder="What needs to be done?"
                        className="input-control"
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label className="label">Description</label>
                    <textarea
                        name="description"
                        value={formData.description || ''}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Add details..."
                        className="input-control"
                        style={{ fontFamily: 'inherit' }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                    <div style={{ flex: 1 }}>
                        <label className="label">Priority</label>
                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            className="input-control"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div style={{ flex: 1 }}>
                        <label className="label">Due Date</label>
                        <input
                            type="date"
                            name="due_date"
                            value={formData.due_date || ''}
                            onChange={handleChange}
                            className="input-control"
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-primary"
                        style={{ opacity: isSubmitting ? 0.7 : 1 }}
                    >
                        {isSubmitting ? 'Saving...' : 'Save Task'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TaskForm;
