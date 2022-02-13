import { Card, CardContent, Typography } from '@material-ui/core';
import NewRestaurantForm from './NewRestaurantForm';
import RestaurantList from './RestaurantList';

export default function RestaurantScreen() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Restaurants</Typography>
        <NewRestaurantForm />
        <RestaurantList />
      </CardContent>
    </Card>
  );
}
