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
    unpacked: Model.Stuff[],
    packed: Model.Stuff[]
}

class StuffContainer extends React.Component<StuffProps & DispatchProps & StateProps, State> {

    static navigationOptions = {
        title: 'Список вещей'
    }

    constructor (props: StuffProps & DispatchProps & StateProps) {
        super(props)
        const stuff = this.stuffList(props.packs)
        this.state = {
            unpacked: stuff.filter(item => !item.packed),
            packed: stuff.filter(item => item.packed),
        }
    }

    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

    componentWillReceiveProps (nextProps: StuffProps & DispatchProps & StateProps) {
        const stuff = this.stuffList(nextProps.packs)
        this.setState({
            unpacked: stuff.filter(item => !item.packed),
            packed: stuff.filter(item => item.packed),
        })
    }

    stuffList = (packs: Model.StuffPack[]) => {
        const stuff: Model.Stuff[] = [].concat(...packs.map(pack => {
            return pack.selected ? pack.stuff : []
        }))
        return utils.uniquelyStuff(stuff)
    }

    renderStuff (stuff: Model.Stuff) {
        const count = stuff.countPerDay && this.props.days
            ? Math.ceil(stuff.countPerDay * this.props.days)
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
                    strikeThrough={true}
                />
            </View>
        )
    }

    render () {
        const {unpacked, packed} = this.state
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.ds.cloneWithRows(unpacked)}
                    renderRow={(data: Model.Stuff) => {
                        return this.renderStuff(data)
                    }}
                    renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => {
                        return rowID < this.state.unpacked.length - 1
                            ? <View style={styles.separator}/>
                            : null
                    }}
                />
                <View style={{height: 20}}></View>
                <ListView
                    dataSource={this.ds.cloneWithRows(packed)}
                    renderRow={(data: Model.Stuff) => {
                        return this.renderStuff(data)
                    }}
                    renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => {
                        return rowID < this.state.packed.length - 1
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
    } as React.ViewStyle,
})
