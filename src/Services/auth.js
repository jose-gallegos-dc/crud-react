import axios from 'axios';
import { API_BASE_URL } from '../env';

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const verifyToken = async (token) => {
    try {
        const response = await api.post('verificar-token', {}, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        console.log(response.data);
        return response.data.success;
    } catch (error) {
        console.error('Token verification failed:', error);
        return false;
    }
};
