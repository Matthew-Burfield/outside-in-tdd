import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createRestaurant, loadRestaurants } from '../restaurants/actions';
import restaurantsReducer from '../restaurants/reducers';

describe('restaurants', () => {
  describe('loadRestaurants action', () => {
    describe('inital state', () => {
      let store;
      beforeEach(() => {
        const initialState = {};
        store = createStore(
          restaurantsReducer,
          initialState,
          applyMiddleware(thunk)
        );
      });

      it('should not have the loading flag set', () => {
        expect(store.getState().loading).toEqual(false);
      });

      it('should not have the error flag set', () => {
        expect(store.getState().isLoadError).toEqual(false);
      });
    });

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
    });

    describe('while loading', () => {
      let store;
      beforeEach(() => {
        const api = {
          loadRestaurants: () => new Promise(() => void 0)
        };

        const initialState = { isLoadError: true };

        store = createStore(
          restaurantsReducer,
          initialState,
          applyMiddleware(thunk.withExtraArgument(api))
        );

        store.dispatch(loadRestaurants());
      });

      it('sets a loading flag', () => {
        expect(store.getState().loading).toEqual(true);
      });

      it('should clear the loading flag when requesting', () => {
        expect(store.getState().isLoadError).toEqual(false);
      });
    });

    describe('when loading fails', () => {
      let store;

      beforeEach(() => {
        const api = {
          loadRestaurants: () => Promise.reject()
        };

        const initialState = { loading: true };

        store = createStore(
          restaurantsReducer,
          initialState,
          applyMiddleware(thunk.withExtraArgument(api))
        );

        return store.dispatch(loadRestaurants());
      });

      it('sets an error flag', () => {
        expect(store.getState().isLoadError).toEqual(true);
      });

      it('should clear the loading state', async () => {
        expect(store.getState().loading).toEqual(false);
      });
    });
  });

  describe('createRestaurant action', () => {
    const newRestaurantName = 'Sushi Place';
    const existingRestaurant = { id: 1, name: 'Pizza Place' };
    const responseRestaurant = { id: 2, name: newRestaurantName };

    let api;
    let store;
    let promise;

    beforeEach(() => {
      api = {
        createRestaurant: jest.fn().mockName('createRestaurant')
      };

      const initialState = { records: [existingRestaurant] };

      store = createStore(
        restaurantsReducer,
        initialState,
        applyMiddleware(thunk.withExtraArgument(api))
      );
    });

    it('should save the restaurant to the server', () => {
      store.dispatch(createRestaurant(newRestaurantName));
      expect(api.createRestaurant).toHaveBeenCalledWith(newRestaurantName);
    });

    describe('when the save succeeds', () => {
      beforeEach(() => {
        api.createRestaurant.mockResolvedValue(responseRestaurant);
        promise = store.dispatch(createRestaurant(newRestaurantName));
      });

      it('should store the returned restaurant in the store', () => {
        expect(store.getState().records).toEqual([
          existingRestaurant,
          responseRestaurant
        ]);
      });

      it('should resolve', () => {
        return expect(promise).resolves.toBeUndefined();
      });
    });

    describe('when save fails', () => {
      it('rejects', () => {
        api.createRestaurant.mockRejectedValue();
        promise = store.dispatch(createRestaurant(newRestaurantName));
        return expect(promise).rejects.toBeUndefined();
      });
    });
  });
});
