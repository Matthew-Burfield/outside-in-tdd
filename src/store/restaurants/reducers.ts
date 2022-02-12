import { combineReducers } from 'redux';
import { START_LOADING_RESTAURANTS, STORE_RESTAURANTS } from './actions';
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
    case START_LOADING_RESTAURANTS:
      return true;
    default:
      return state;
  }
}

export default combineReducers({
  records,
  loading
});
