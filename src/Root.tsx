import * as React from 'react'
import {Provider} from 'react-redux'
import { StyleSheet, Text, View } from 'react-native'
import store from './redux/store'

// import {App} from './App'
import {TripProperties} from './components/TripProperties'

export default class Root extends React.Component<{}, void> {
    render() {
        return (
            <Provider store={store}>
                <View style={[styles.container]}>
                    <TripProperties/>
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});