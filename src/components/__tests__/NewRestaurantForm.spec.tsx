import { render, act, queryByPlaceholderText } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import flushPromises from 'flush-promises';
import { NewRestaurantForm } from '../NewRestaurantForm';

describe('NewRestaurantForm', () => {
  const restaurantName = 'Sushi Place';
  const requiredError = 'Name is required';
  const serverError = 'The restaurant could not be saved. Please try again.';

  let createRestaurant: jest.Mock;
  let context: RenderResult;

  beforeEach(() => {
    createRestaurant = jest.fn().mockName('createRestaurant');
    context = render(<NewRestaurantForm createRestaurant={createRestaurant} />);
  });

  describe('initially', () => {
    it('should not display a validation error', () => {
      const { queryByText } = context;
      expect(queryByText(requiredError)).toBeNull();
    });

    it('should not display a server error', () => {
      const { queryByText } = context;
      expect(queryByText(serverError)).toBeNull();
    });
  });

  describe('after submitting when filled in', () => {
    beforeEach(async () => {
      const { getByPlaceholderText, getByTestId } = context;

      userEvent.type(getByPlaceholderText('Add Restaurant'), restaurantName);
      userEvent.click(getByTestId('new-restaurant-submit-button'));

      return act(flushPromises);
    });

    it('should call createRestaurant with the name', () => {
      expect(createRestaurant).toHaveBeenCalledWith(restaurantName);
    });

    it('should clear the restaurant name', () => {
      const { getByPlaceholderText } = context;
      const input = getByPlaceholderText('Add Restaurant') as HTMLInputElement;
      expect(input.value).toEqual('');
    });

    it('should not display a validation error', () => {
      const { queryByText } = context;
      expect(queryByText(requiredError)).toBeNull();
    });

    it('should not display a server error', () => {
      const { queryByText } = context;
      expect(queryByText(serverError)).toBeNull();
    });
  });

  describe('after submitting when empty', () => {
    beforeEach(async () => {
      const { getByPlaceholderText, getByTestId } = context;
      userEvent.type(getByPlaceholderText('Add Restaurant'), '{backspace}');
      userEvent.click(getByTestId('new-restaurant-submit-button'));

      return act(flushPromises);
    });

    it('should display a validation error', () => {
      const { queryByText } = context;
      expect(queryByText(requiredError)).not.toBeNull();
    });

    it('should not call createRestaurant', () => {
      expect(createRestaurant).not.toHaveBeenCalled();
    });
  });

  describe('after submitting when correcting a validation error', () => {
    beforeEach(async () => {
      const { getByPlaceholderText, getByTestId } = context;

      userEvent.type(getByPlaceholderText('Add Restaurant'), '{backspace}');
      userEvent.click(getByTestId('new-restaurant-submit-button'));

      userEvent.type(getByPlaceholderText('Add Restaurant'), restaurantName);
      userEvent.click(getByTestId('new-restaurant-submit-button'));

      return act(flushPromises);
    });

    it('should clear the validation error', () => {
      const { queryByText } = context;
      expect(queryByText(requiredError)).toBeNull();
    });
  });

  describe('when the server request fails', () => {
    beforeEach(async () => {
      createRestaurant.mockRejectedValue({});

      const { getByPlaceholderText, getByTestId } = context;

      userEvent.type(getByPlaceholderText('Add Restaurant'), restaurantName);
      userEvent.click(getByTestId('new-restaurant-submit-button'));

      return act(flushPromises);
    });

    it('should display a server error', () => {
      const { queryByText } = context;
      expect(queryByText(serverError)).not.toBeNull();
    });

    it('should not clear out the form', () => {
      const { getByPlaceholderText } = context;
      const input = getByPlaceholderText('Add Restaurant') as HTMLInputElement;
      expect(input.value).toEqual(restaurantName);
    });
  });

  describe('when retrying after a server error', () => {
    beforeEach(async () => {
      createRestaurant.mockRejectedValueOnce({}).mockResolvedValueOnce({});

      const { getByPlaceholderText, getByTestId } = context;

      userEvent.type(getByPlaceholderText('Add Restaurant'), restaurantName);
      userEvent.click(getByTestId('new-restaurant-submit-button'));
      await act(flushPromises);
      userEvent.click(getByTestId('new-restaurant-submit-button'));

      return act(flushPromises);
    });

    it('should clear the server error', () => {
      const { queryByText } = context;
      expect(queryByText(serverError)).toBeNull();
    });
  });
});
