import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const API = axios.create({ baseURL: backendUrl });

export const fetchStories = () => API.get('/api/stories');
export const createStory = (newStory) => API.post('/api/stories', newStory);
export const updateStory = (id, action) => API.put(`/api/stories/${id}`, { action });