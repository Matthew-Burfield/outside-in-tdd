import * as React from 'react';
import { connect } from 'react-redux';
import { Button, TextField } from '@material-ui/core';
import { createRestaurant } from '../store/restaurants/actions';

interface Props {
  createRestaurant: (name: string) => Promise<void>;
}

export function NewRestaurantForm(props: Props) {
  const [name, setName] = React.useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await props.createRestaurant(name);
      setName('');
    } catch (e) {
      console.log('Error: ', e);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        placeholder="Add Restaurant"
        fullWidth
        variant="filled"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button
        data-testid="new-restaurant-submit-button"
        variant="contained"
        color="primary"
        type="submit"
      >
        Add
      </Button>
    </form>
  );
}

const mapStateToProps = null;
const mapDispatchToProps = { createRestaurant };

export default connect(mapStateToProps, mapDispatchToProps)(NewRestaurantForm);
