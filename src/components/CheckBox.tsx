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
    onCheck: (checked: boolean) => void
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
        return (
            <TouchableOpacity onPress={() => {
                this.props.onCheck(!this.props.checked)
            }}>
                <Text style={styles.label}>{this.props.label}</Text>
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

})
