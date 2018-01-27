import { StackNavigator } from 'react-navigation';
import { View } from 'react-native';
import MainContainer from '../containers/mainContainer'

const Root = StackNavigator(
    {
        Home: {
            screen: MainContainer,
            navigationOptions: {
                headerLeft: null
            }
        },
    },
    {
        headerMode: 'screen',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#3e9ce9'
            },
            headerTitleStyle: {
                color: '#fff',
                fontSize: 20
            },
            headerTintColor: '#fff'
        }
    }
);

export default Root;