import * as React from 'react';
import { connect } from 'react-redux';
import { Box, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { createRestaurant } from '../store/restaurants/actions';
import { Alert } from '@material-ui/lab';

interface Props {
  createRestaurant: (name: string) => Promise<void>;
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}));

export function NewRestaurantForm(props: Props) {
  const [name, setName] = React.useState('');
  const [isValidationError, setValidationError] = React.useState(false);
  const [isServerError, setServerError] = React.useState(false);
  const classes = useStyles();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(false);
    if (name) {
      setValidationError(false);
      try {
        await props.createRestaurant(name);
        setName('');
      } catch (e) {
        setServerError(true);
      }
    } else {
      setValidationError(true);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      {isValidationError && <Alert severity="error">Name is required</Alert>}
      {isServerError && (
        <Alert severity="error">
          The restaurant could not be saved. Please try again.
        </Alert>
      )}
      <Box className={classes.root} display="flex">
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
      </Box>
    </form>
  );
}

const mapStateToProps = null;
const mapDispatchToProps = { createRestaurant };

export default connect(mapStateToProps, mapDispatchToProps)(NewRestaurantForm);
