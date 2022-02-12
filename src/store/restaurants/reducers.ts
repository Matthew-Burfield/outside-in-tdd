import { combineReducers } from 'redux';
import {
  IS_LOADING_RESTAURANTS,
  STORE_RESTAURANTS,
  IS_RESTAURANTS_LOADING_ERROR
} from './actions';
import type { AnyAction } from 'redux';
import { tRestaurant } from '../../components/RestaurantList';

function records(state: tRestaurant[] = [], action: AnyAction): tRestaurant[] {
  switch (action.type) {
    case STORE_RESTAURANTS:
      return action.records;
    default:
      return state;
  }
}

function loading(state = false, action: AnyAction) {
  switch (action.type) {
    case STORE_RESTAURANTS:
      return false;
    case IS_LOADING_RESTAURANTS:
      return true;
    default:
      return state;
  }
}

function isLoadError(state = false, action: AnyAction) {
  switch (action.type) {
    case IS_RESTAURANTS_LOADING_ERROR:
      return true;
    case IS_LOADING_RESTAURANTS:
      return false;
    default:
      return state;
  }
}

export default combineReducers({
  records,
  loading,
  isLoadError
});
