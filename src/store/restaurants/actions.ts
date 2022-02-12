import type { AppDispatch } from '..';
import { Api } from '../../api';
import { tRestaurant } from '../../components/RestaurantList';
import { RootState } from '../reducers';

export const STORE_RESTAURANTS = 'STORE_RESTAURANTS';
export const IS_LOADING_RESTAURANTS = 'IS_LOADING_RESTAURANTS';
export const IS_RESTAURANTS_LOADING_ERROR = 'IS_RESTAURANTS_LOADING_ERROR';

export function loadRestaurants() {
  return async function (
    dispatch: AppDispatch,
    getState: () => RootState,
    api: Api
  ) {
    let records = [];
    dispatch(startLoadingRestaurants());
    try {
      records = await api.loadRestaurants();
    } catch (err) {
      dispatch(isLoadingError());
    }
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
    type: IS_LOADING_RESTAURANTS
  };
}

function isLoadingError() {
  return {
    type: IS_RESTAURANTS_LOADING_ERROR
  };
}
