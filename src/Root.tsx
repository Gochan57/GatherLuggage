import * as React from 'react'
import {Provider} from 'react-redux'
import {
    StyleSheet,
    View
} from 'react-native'
import {
    StackNavigator,
} from 'react-navigation';

import store from './redux/store'
import {TripProperties} from './components/TripProperties'
import {Stuff} from './components/Stuff'

const App = StackNavigator(
    {
        TripProperties: {screen: TripProperties},
        Stuff: {screen: Stuff},
    },
    {
        initialRouteName: 'TripProperties',
        cardStyle: {
            backgroundColor: 'white'
        }

    }
)

export default class Root extends React.Component<{}, void> {
    render () {
        return (
            <Provider store={store}>
                <View style={[styles.container]}>
                    <App/>
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    } as React.ViewStyle,
});
