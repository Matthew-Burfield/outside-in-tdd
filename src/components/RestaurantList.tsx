import * as React from 'react';

type tRestaurant = {
  id: number;
  name: string;
};

interface Props {
  loadRestaurants: () => void;
  restaurants: tRestaurant[];
}

export default function RestaurantList(props: Props) {
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

export { RestaurantList };
