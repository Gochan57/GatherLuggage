import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux';

import CheckBox from './CheckBox'
import * as Model from '../models'
import * as Actions from '../redux/actions'
import Page from './Page'

export interface TripPropertiesProps {
}

export interface DispatchProps {
    toggleTripProperty: (group: string) => void
    initApp: () => void
}

interface StateProps {
    packs: Model.StuffPack[]
}

class TripPropertiesContainer extends React.Component<TripPropertiesProps & DispatchProps & StateProps, void> {
    constructor (props: TripPropertiesProps & DispatchProps & StateProps) {
        super(props)
    }

    componentWillMount () {
        this.props.initApp()
    }

    renderProperty (pack: Model.StuffPack) {
        return (
            <CheckBox
                label={pack.rus}
                checked={pack.selected}
                onCheck={(checked: boolean) => {
                    this.props.toggleTripProperty(pack.group)
                }}
            >
            </CheckBox>
        )
    }

    renderContent() {
        return (
            <View style={[styles.container]}>
                {this.props.packs.map(pack => this.renderProperty(pack))}
            </View>
        )
    }

    render() {
        return (
            <Page
                header={{
                    title: 'Атрибуты путешествия',
                    leftButton: {
                        caption: 'Назад',
                        onPress: () => {}
                    }
                }}
                content={this.renderContent()}
            />
        )
    }
}

const mapStateToProps = (state: Model.AppState) => {
    return {
        packs: state.stuff.packs
    }
}

export const TripProperties = connect(mapStateToProps, {...Actions})(TripPropertiesContainer)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    } as React.ViewStyle,


    test: {
        flex: 1,
        resizeMode: 'cover',
        borderWidth: 1,
        borderColor: 'blue'
    } as React.ViewStyle,
})
