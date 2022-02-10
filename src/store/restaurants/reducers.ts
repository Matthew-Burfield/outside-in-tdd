import { combineReducers } from 'redux';
import { STORE_RESTAURANTS } from './actions';
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

export default combineReducers({
  records
});
