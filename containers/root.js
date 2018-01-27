import {StackNavigator} from 'react-navigation';
import {View, StatusBar} from 'react-native';
import MainContainer from '../containers/mainContainer'

const Root = StackNavigator(
    {
        Home: {
            screen: MainContainer
        },
    },
    {
        headerMode: 'screen',
        navigationOptions: {
            header: null,
            headerStyle: {
                backgroundColor: '#fff'
            },
            headerTitleStyle: {
                color: '#000',
                fontSize: 20
            },
            headerTintColor: '#000'
        }
    }
);

export default Root;