import * as React from 'react'
import {
    StyleSheet,
    Text,
    View
} from 'react-native'
import Header, {IHeaderProps} from './Header';

export interface IProps {
    header: IHeaderProps,
    content: JSX.Element
}

export default class Page extends React.Component<IProps, null> {
    render() {
        return (
            <View style={[styles.container, styles.test]}>
                <Header {...this.props.header}/>
                <View style={styles.content}>
                    {this.props.content}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    } as React.ViewStyle,

    content: {
        flex: 1,
        padding: 10
    },

    test: {
        borderWidth: 1,
        borderColor: 'red'
    }
})
