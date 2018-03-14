import * as React from 'react'
import {
    StyleSheet,
    Text,
    View
} from 'react-native'
// import Icon from 'react-native-fa-icons'

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
        const icon = `fontawesome|${this.props.checked ? 'check-square' : 'square'}`
        // return <Icon name='square'/>
        // return <Icon
        //     name={icon}
        //     size={150}
        //     color='#887700'
        //     style={{}}
        // />
    }

    renderLabel() {
        return <Text>{this.props.label}</Text>
    }

    render() {
        return (
            <View>
                {this.renderCheckItem()}
                {this.renderLabel()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: 20,
        height: 20,
        backgroundColor: 'red'
    }
})
