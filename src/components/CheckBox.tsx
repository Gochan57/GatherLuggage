import * as React from 'react'
import {
    StyleSheet,
    Text,
    View
} from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'

export interface IProps {
    key?: string
    label?: string,
    checked: boolean,
    onCheck: (checked: boolean) => void
}

export interface IState {

}

export default class CheckBox extends React.Component<IProps, IState> {

    renderCheckItem() {
        const icon = this.props.checked ? 'check-square' : 'square'
        return <Icon
            name={icon}
            size={20}
            color='#b6b6b6'
            onPress={this.props.onCheck}
            style={styles.check}
        />
    }

    renderLabel() {
        return <Text style={styles.label}>{this.props.label}</Text>
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderCheckItem()}
                {this.renderLabel()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    } as React.ViewStyle,

    check: {
        marginRight: 5
    } as React.ViewStyle,

    label: {
        fontSize: 15,
        marginLeft: 15,
    } as React.TextStyle,
})
