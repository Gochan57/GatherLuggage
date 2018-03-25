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

import * as utils from '../utils'
import CheckBox from './CheckBox'

export interface StuffProps {
}

export interface DispatchProps {
    toggleStuff: (key: string) => void
}

interface StateProps {
    packs: Model.StuffPack[],
    days: number
}

interface State {
    stuff: Model.Stuff[],
    dataSource: ListViewDataSource
}

class StuffContainer extends React.Component<StuffProps & DispatchProps & StateProps, State> {

    static navigationOptions = {
        title: 'Список вещей'
    }

    constructor (props: StuffProps & DispatchProps & StateProps) {
        super(props)
        const stuff: Model.Stuff[] = [].concat(...props.packs.map(pack => {
            return pack.selected ? pack.stuff : []
        }))
        const uniqStuff = utils.uniquelyStuff(stuff)
        this.state = {
            stuff: uniqStuff,
            dataSource: this.ds.cloneWithRows(uniqStuff),
        }
    }

    componentWillReceiveProps (nextProps: StuffProps & DispatchProps & StateProps) {
        const stuff = [].concat(...nextProps.packs.map(pack => {
            return pack.selected ? pack.stuff : []
        }))
        const uniqStuff = utils.uniquelyStuff(stuff)
        this.setState({
            stuff: uniqStuff,
            dataSource: this.ds.cloneWithRows(uniqStuff),
        })
    }

    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

    renderStuff (stuff: Model.Stuff) {
        const count = stuff.countPerDay && this.props.days
            ? Math.round(stuff.countPerDay * this.props.days)
            : null
        const countText = count ? ` (${count})` : ''
        return (
            <View key={stuff.key} style={styles.rowContainer}>
                <CheckBox
                    label={`${stuff.name}${countText}`}
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
                    renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => {
                        return rowID < this.state.stuff.length - 1
                            ? <View style={styles.separator}/>
                            : null
                    }}
                />
            </View>
        )
    }
}

const mapStateToProps = (state: Model.AppState) => {
    return {
        packs: state.stuff.packs,
        days: state.stuff.days
    }
}

export const Stuff = connect(mapStateToProps, {...Actions})(StuffContainer)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'white',
    } as React.ViewStyle,

    rowContainer: {
        height: 35,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 10
    } as React.ViewStyle,

    separator: {
        alignSelf: 'stretch',
        height: 0.5,
        backgroundColor: 'gray',
    } as React.ViewStyle
})
