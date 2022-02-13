import { render } from '@testing-library/react';
import { RestaurantList } from '../RestaurantList';
import type { RenderResult } from '@testing-library/react';

describe('RestaurantList', () => {
  const restaurants = [
    { id: 1, name: 'Sushi Place' },
    { id: 2, name: 'Pizza Place' }
  ];
  let loadRestaurants: jest.Mock;
  let context: RenderResult;

  function renderWithProps(propOverrides = {}) {
    const props = {
      loadRestaurants: jest.fn().mockName('loadRestaurants'),
      loading: false,
      isLoadError: false,
      restaurants,
      ...propOverrides
    };
    loadRestaurants = props.loadRestaurants;
    context = render(<RestaurantList {...props} />);
  }

  it('loads restaurants on the first render', () => {
    renderWithProps();
    expect(loadRestaurants).toHaveBeenCalled();
  });

  it('should display the loading indicator while loading', () => {
    renderWithProps({ loading: true });
    const { queryByTestId } = context;
    expect(queryByTestId('loading-indicator')).not.toBeNull();
  });

  describe('when loading succeeds', () => {
    beforeEach(() => {
      renderWithProps();
    });
    it('should display the restaurants', () => {
      const { queryByText } = context;

      expect(queryByText('Sushi Place')).not.toBeNull();
      expect(queryByText('Pizza Place')).not.toBeNull();
    });

    it('should not display the loading indicator while not loading', () => {
      const { queryByTestId } = context;
      expect(queryByTestId('loading-indicator')).toBeNull();
    });

    it('should not display the error message', () => {
      const { queryByText } = context;
      expect(queryByText('Restaurants could not be loaded')).toBeNull();
    });
  });

  describe('when loading fails', () => {
    beforeEach(() => {
      renderWithProps({ isLoadError: true });
    });

    it('should display the error message', () => {
      const { queryByText } = context;
      expect(queryByText('Restaurants could not be loaded')).not.toBeNull();
    });
  });
});
