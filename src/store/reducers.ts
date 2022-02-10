import { combineReducers } from 'redux';
import restaurants from './restaurants/reducers';

const rootReducer = combineReducers({ restaurants });

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
