import * as React from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'

export interface IProps {
    key?: string
    label?: string,
    checked: boolean,
    onCheck: (checked: boolean) => void,
    strikeThrough?: boolean,
}

export interface IState {

}

export default class CheckBox extends React.Component<IProps, IState> {

    renderCheckItem () {
        const icon = this.props.checked ? 'check-square' : 'square'
        return (
            <View>
                <Icon
                    name={icon}
                    size={20}
                    color='#b6b6b6'
                    onPress={this.props.onCheck}
                    style={[styles.check]}
                />
            </View>
        )
    }

    renderLabel () {
        const {checked, label, onCheck, strikeThrough} = this.props
        const style = strikeThrough && checked
            ? [styles.label, styles.strikeThrough]
            : [styles.label]
        return (
            <TouchableOpacity onPress={() => {
                onCheck(!checked)
            }}>
                <Text style={style}>{label}</Text>
            </TouchableOpacity>
        )
    }

    render () {
        return (
            <View style={[styles.container]}>
                {this.renderLabel()}
                {this.renderCheckItem()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    } as React.ViewStyle,

    check: {
        marginRight: 5
    } as React.ViewStyle,

    label: {
        fontSize: 15,
        marginLeft: 15,
    } as React.TextStyle,

    strikeThrough: {
        textDecorationLine: 'line-through'
    } as React.TextStyle
})
