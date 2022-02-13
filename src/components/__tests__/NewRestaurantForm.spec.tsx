import { render, act } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import flushPromises from 'flush-promises';
import { NewRestaurantForm } from '../NewRestaurantForm';

describe('NewRestaurantForm', () => {
  const restaurantName = 'Sushi Place';

  let createRestaurant: jest.Mock;
  let context: RenderResult;

  beforeEach(() => {
    createRestaurant = jest.fn().mockName('createRestaurant');
    context = render(<NewRestaurantForm createRestaurant={createRestaurant} />);
  });

  describe('when filled in', () => {
    beforeEach(async () => {
      const { getByPlaceholderText, getByTestId } = context;

      userEvent.type(getByPlaceholderText('Add Restaurant'), restaurantName);
      userEvent.click(getByTestId('new-restaurant-submit-button'));

      return act(flushPromises);
    });

    it('should call createRestaurant with the name', () => {
      expect(createRestaurant).toHaveBeenCalledWith(restaurantName);
    });

    it('should clear the restaurant name after submitting', () => {
      const { getByPlaceholderText } = context;
      const input = getByPlaceholderText('Add Restaurant') as HTMLInputElement;
      expect(input.value).toEqual('');
    });
  });
});
