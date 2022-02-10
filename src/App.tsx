import { Provider } from 'react-redux';
import RestaurantScreen from './components/RestaurantScreen';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <RestaurantScreen />
    </Provider>
  );
}

export default App;
