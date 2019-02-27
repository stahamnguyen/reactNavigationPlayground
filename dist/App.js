import { createAppContainer, createStackNavigator } from 'react-navigation';
import NavigationRoutes from 'config/NavigationRoutes';
import TabBar from 'screens/TabBar';
const { home } = NavigationRoutes;
const App = createStackNavigator({
    [home]: TabBar,
}, {
    headerMode: 'none',
});
export default createAppContainer(App);
//# sourceMappingURL=App.js.map