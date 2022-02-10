import axios from 'axios';

const client = axios.create({
  baseURL: `https://outside-in-dev-api.herokuapp.com/GqG1qDtzee6CBqSNbjUgU4XmJwb3MlbA`
});

const api = {
  async loadRestaurants() {
    const response = await client.get('/restaurants');
    return response.data;
  }
};

export type Api = typeof api;

export default api;
