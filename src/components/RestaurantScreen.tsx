import { Card, CardContent, Typography } from '@material-ui/core';
import RestaurantList from './RestaurantList';

export default function RestaurantScreen() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Restaurants</Typography>
        <RestaurantList />
      </CardContent>
    </Card>
  );
}
