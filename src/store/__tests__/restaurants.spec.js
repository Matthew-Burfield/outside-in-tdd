import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { loadRestaurants } from '../restaurants/actions';
import restaurantsReducer from '../restaurants/reducers';

describe('restaurants', () => {
  describe('loadRestaurants action', () => {
    describe('when loading succeeds', () => {
      const records = [
        { id: 1, name: 'Sushi Place' },
        { id: 2, name: 'Pizza Place' }
      ];

      let store;

      beforeEach(() => {
        const api = {
          loadRestaurants: () => Promise.resolve(records)
        };

        const initialState = {
          records: []
        };

        store = createStore(
          restaurantsReducer,
          initialState,
          applyMiddleware(thunk.withExtraArgument(api))
        );

        store.dispatch(loadRestaurants());
      });

      it('stores the restaurants', () => {
        expect(store.getState().records).toEqual(records);
      });

      it('should clear the loading flag', () => {
        expect(store.getState().loading).toEqual(false);
      });

      it('sets a loading flag', () => {
        const api = {
          loadRestaurants: () => new Promise(() => void 0)
        };

        const initialState = {};

        const store = createStore(
          restaurantsReducer,
          initialState,
          applyMiddleware(thunk.withExtraArgument(api))
        );

        store.dispatch(loadRestaurants());

        expect(store.getState().loading).toEqual(true);
      });
    });
  });

  describe('inital state', () => {
    it('should not have the loading flag set', () => {
      const initialState = {};

      const store = createStore(
        restaurantsReducer,
        initialState,
        applyMiddleware(thunk)
      );

      expect(store.getState().loading).toEqual(false);
    });
  });
});
