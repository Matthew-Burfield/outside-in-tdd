import type { AppDispatch } from '..';
import { Api } from '../../api';
import { tRestaurant } from '../../components/RestaurantList';
import type { RootState } from '../reducers';

export const STORE_RESTAURANTS = 'STORE_RESTAURANTS';
export const IS_LOADING_RESTAURANTS = 'IS_LOADING_RESTAURANTS';
export const IS_RESTAURANTS_LOADING_ERROR = 'IS_RESTAURANTS_LOADING_ERROR';
export const ADD_RESTAURANT = 'ADD_RESTAURANT';

export interface Record {
  id: number;
  name: string;
}

export function loadRestaurants() {
  return async function (dispatch: AppDispatch, _: RootState, api: Api) {
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

export function createRestaurant(name: string) {
  return async function (dispatch: AppDispatch, _: RootState, api: Api) {
    const record = await api.createRestaurant(name);
    dispatch(addRestaurant(record));
  };
}

function addRestaurant(record: Record) {
  return {
    type: ADD_RESTAURANT,
    payload: record
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
