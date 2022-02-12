import type { AppDispatch } from '..';
import { Api } from '../../api';
import { tRestaurant } from '../../components/RestaurantList';
import { RootState } from '../reducers';

export const STORE_RESTAURANTS = 'STORE_RESTAURANTS';
export const START_LOADING_RESTAURANTS = 'START_LOADING_RESTAURANTS';

export function loadRestaurants() {
  return async function (
    dispatch: AppDispatch,
    getState: () => RootState,
    api: Api
  ) {
    dispatch(startLoadingRestaurants());
    const records = await api.loadRestaurants();
    dispatch(storeRestaurants(records));
  };
}

function storeRestaurants(records: tRestaurant[]) {
  return {
    type: STORE_RESTAURANTS,
    records
  };
}

function startLoadingRestaurants() {
  return {
    type: START_LOADING_RESTAURANTS
  };
}
