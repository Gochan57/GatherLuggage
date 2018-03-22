import * as React from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'

export interface IHeaderButton {
    icon?: string
    caption?: string
    onPress: () => void
}

export interface IHeaderProps {
    title: string,
    leftButton?: IHeaderButton,
    rightButton?: IHeaderButton
}

export default class Header extends React.Component<IHeaderProps, null> {
    renderButton (button: IHeaderButton) {
        let element: JSX.Element = null
        if (button) {
            if (button.icon) {
                element = (
                    <Icon
                        name={button.icon}
                        size={25}
                        color='#b6b6b6'
                        onPress={button.onPress}
                        style={styles.button}
                    />
                )
            }
            if (button.caption) {
                element = (
                    <TouchableOpacity onPress={button.onPress}>
                        <Text style={[]}>{button.caption}</Text>
                    </TouchableOpacity>
                )
            }
        }
        return (
            <View style={styles.buttonContainer}>
                {element}
            </View>
        )
    }

    renderTitle () {
        if (!this.props.title) {
            return null
        }
        return (
            <View style={styles.titleContainer}>
                <Text>{this.props.title}</Text>
            </View>
        )
    }

    render () {
        return (
            <View style={styles.container}>
                {this.renderButton(this.props.leftButton)}
                {this.renderTitle()}
                {this.renderButton(this.props.rightButton)}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#eeeeee',
        paddingLeft: 15,
        paddingRight: 15,
    } as React.ViewStyle,

    buttonContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    } as React.ViewStyle,

    button: {
        width: 30,
        height: 30,
    } as React.ViewStyle,

    text: {
        color: '#4286f4'
    } as React.ViewStyle,

    titleContainer: {
        flex: 4,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    } as React.ViewStyle
})
