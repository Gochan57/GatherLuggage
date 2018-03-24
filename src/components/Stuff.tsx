import * as React from 'react'
import {
    View
} from 'react-native'
import * as Model from '../models'
import * as Actions from '../redux/actions'
import {
    connect,
} from 'react-redux'

import CheckBox from './CheckBox'
import Page from './Page'

export interface StuffProps {
}

export interface DispatchProps {
    toggleStuff: (key: string) => void
}

interface StateProps {
    packs: Model.StuffPack[]
}

class StuffContainer extends React.Component<StuffProps & DispatchProps & StateProps, void> {
    constructor (props: StuffProps & DispatchProps & StateProps) {
        super(props)
    }

    renderStuff (stuff: Model.Stuff) {
        return (
            <CheckBox
                key={stuff.key}
                label={stuff.name}
                checked={stuff.packed}
                onCheck={(checked: boolean) => {
                    this.props.toggleStuff(stuff.key)
                }}
            />
        )
    }

    renderContent () {
        return (
            <View>
                {this.props.packs.map(pack => pack.stuff.map(stuff => this.renderStuff(stuff)))}
            </View>
        )
    }

    render () {
        return (
            <Page
                header={{
                    title: 'Список вещей',
                    leftButton: {
                        caption: 'Назад',
                        onPress: () => {
                        }
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

export const Stuff = connect(mapStateToProps, {...Actions})(StuffContainer)
