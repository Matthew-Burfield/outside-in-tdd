import axios from 'axios';

const client = axios.create({
  baseURL: `https://outside-in-dev-api.herokuapp.com/${process.env.REACT_APP_API_TOKEN}`
});

const api = {
  async loadRestaurants() {
    const response = await client.get('/restaurants');
    return response.data;
  }
};

export type Api = typeof api;

export default api;
