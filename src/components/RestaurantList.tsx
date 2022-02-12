import {
  CircularProgress,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store/reducers';
import { loadRestaurants } from '../store/restaurants/actions';

export type tRestaurant = {
  id: number;
  name: string;
};

interface Props {
  loadRestaurants: () => void;
  loading: boolean;
  restaurants: tRestaurant[];
}

function RestaurantList(props: Props) {
  React.useEffect(() => {
    props.loadRestaurants();
  }, [props.loadRestaurants]);

  return (
    <>
      {props.loading && <CircularProgress data-testid="loading-indicator" />}
      <List>
        {props.restaurants.map((restaurant) => (
          <ListItem key={restaurant.id}>
            <ListItemText>{restaurant.name}</ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
}

const mapStateToProps = (state: RootState) => ({
  restaurants: state.restaurants.records,
  loading: state.restaurants.loading
});

const mapDispatchToProps = { loadRestaurants };

export { RestaurantList };
export default connect(mapStateToProps, mapDispatchToProps)(RestaurantList);
