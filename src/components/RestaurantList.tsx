import * as React from 'react';

interface Props {
  loadRestaurants: () => void;
}

export default function RestaurantList(props: Props) {

  React.useEffect(() => {
    props.loadRestaurants();
  }, [props.loadRestaurants]);

  return <div>RestaurantList</div>;
}

export { RestaurantList };
