import * as React from 'react'
import {
    ListView,
    ListViewDataSource,
    StyleSheet,
    View
} from 'react-native'
import * as Model from '../models'
import * as Actions from '../redux/actions'
import {
    connect,
} from 'react-redux'

import CheckBox from './CheckBox'

export interface StuffProps {
}

export interface DispatchProps {
    toggleStuff: (key: string) => void
}

interface StateProps {
    packs: Model.StuffPack[]
}

interface State {
    dataSource: ListViewDataSource
}

class StuffContainer extends React.Component<StuffProps & DispatchProps & StateProps, State> {

    static navigationOptions = {
        title: 'Список вещей'
    }

    constructor (props: StuffProps & DispatchProps & StateProps) {
        super(props)
        this.state = {
            dataSource: this.ds.cloneWithRows([].concat(...props.packs.map(pack => {
                return pack.selected ? pack.stuff : []
            }))),
        }
    }

    componentWillReceiveProps (nextProps: StuffProps & DispatchProps & StateProps) {
        this.setState({
            dataSource: this.ds.cloneWithRows([].concat(...nextProps.packs.map(pack => {
                return pack.selected ? pack.stuff : []
            })))
        })
    }

    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

    renderStuff (stuff: Model.Stuff) {
        return (
            <View style={styles.rowContainer}>
                <CheckBox
                    key={stuff.key}
                    label={stuff.name}
                    checked={stuff.packed}
                    onCheck={(checked: boolean) => {
                        this.props.toggleStuff(stuff.key)
                    }}
                />
            </View>
        )
    }

    render () {

        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(data: Model.Stuff) => {
                        return this.renderStuff(data)
                    }}
                />
            </View>
        )
    }
}

const mapStateToProps = (state: Model.AppState) => {
    return {
        packs: state.stuff.packs
    }
}

export const Stuff = connect(mapStateToProps, {...Actions})(StuffContainer)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingTop: 20,
    } as React.ViewStyle,

    rowContainer: {
        height: 30,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingLeft: 30,
    } as React.ViewStyle,
})
