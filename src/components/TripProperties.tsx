import * as React from 'react'
import {
    Button,
    ListView,
    ListViewDataSource,
    View,
    StyleSheet,
} from 'react-native'
import {connect} from 'react-redux';

import CheckBox from './CheckBox'
import * as Model from '../models'
import * as Actions from '../redux/actions'

export interface TripPropertiesProps {
}

export interface DispatchProps {
    toggleTripProperty: (group: string) => void
    initApp: () => void,
    navigation: any
}

interface StateProps {
    packs: Model.StuffPack[]
}

interface State {
    dataSource: ListViewDataSource
}

class TripPropertiesContainer extends React.Component<TripPropertiesProps & DispatchProps & StateProps, State> {

    static navigationOptions = {
        title: 'Атрибуты путешествия',
        headerBackTitle: 'Назад',
    }

    constructor (props: TripPropertiesProps & DispatchProps & StateProps) {
        super(props)
        this.state = {
            dataSource: this.ds.cloneWithRows(props.packs),
        };
    }

    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

    componentWillMount () {
        this.props.initApp()
    }

    componentWillReceiveProps (nextProps: TripPropertiesProps & DispatchProps & StateProps) {
        this.setState({
            dataSource: this.ds.cloneWithRows(nextProps.packs)
        })
    }

    renderProperty (pack: Model.StuffPack) {
        return (
            <View key={pack.group} style={styles.rowContainer}>
                <CheckBox
                    label={pack.rus}
                    checked={pack.selected}
                    onCheck={(checked: boolean) => {
                        this.props.toggleTripProperty(pack.group)
                    }}
                />
            </View>
        )
    }

    render () {
        return (
            <View style={[styles.container]}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(data: Model.StuffPack) => {
                        return this.renderProperty(data)
                    }}
                    renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => {
                        return rowID < this.props.packs.length - 1
                            ? <View style={styles.separator}/>
                            : null
                    }}
                />
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={() => {
                            this.props.navigation.navigate('Stuff')
                        }}
                        title='Собираем вещи!'
                        color='#179cfb'
                    />
                </View>
            </View>
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

    buttonContainer: {
        alignSelf: 'stretch',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: 10,
    } as React.ViewStyle,

    separator: {
        alignSelf: 'stretch',
        height: 0.5,
        backgroundColor: 'gray',
    } as React.ViewStyle
})
