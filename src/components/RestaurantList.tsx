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
  restaurants: tRestaurant[];
}

function RestaurantList(props: Props) {
  React.useEffect(() => {
    props.loadRestaurants();
  }, [props.loadRestaurants]);

  return (
    <ul>
      {props.restaurants.map((restaurant) => (
        <li key={restaurant.id}>{restaurant.name}</li>
      ))}
    </ul>
  );
}

const mapStateToProps = (state: RootState) => ({
  restaurants: state.restaurants.records
});

const mapDispatchToProps = { loadRestaurants };

export { RestaurantList };
export default connect(mapStateToProps, mapDispatchToProps)(RestaurantList);
