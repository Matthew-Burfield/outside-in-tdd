import axios from 'axios';
import { Record } from './store/restaurants/actions';

const client = axios.create({
  baseURL: `https://outside-in-dev-api.herokuapp.com/GqG1qDtzee6CBqSNbjUgU4XmJwb3MlbA`
});

const api = {
  async loadRestaurants() {
    const response = await client.get('/restaurants');
    return response.data;
  },
  async createRestaurant(name: string): Promise<Record> {
    const response = await client.post('/restaurants', { name });
    return response.data;
  }
};

export type Api = typeof api;

export default api;
