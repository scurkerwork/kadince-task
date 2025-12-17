import client from './client';

export const fetchTasks = async (params = {}) => {
    const response = await client.get('/tasks', { params });
    return response.data;
};

export const fetchTask = async (id) => {
    const response = await client.get(`/tasks/${id}`);
    return response.data;
};

export const createTask = async (taskData) => {
    const response = await client.post('/tasks', { task: taskData });
    return response.data;
};

export const updateTask = async (id, taskData) => {
    const response = await client.patch(`/tasks/${id}`, { task: taskData });
    return response.data;
};

export const deleteTask = async (id) => {
    await client.delete(`/tasks/${id}`);
};

export const toggleTaskCompletion = async (id) => {
    const response = await client.patch(`/tasks/${id}/toggle`);
    return response.data;
};
