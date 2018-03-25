import * as React from 'react'
import {
    Button,
    ListView,
    ListViewDataSource,
    Picker,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import {connect} from 'react-redux';

import CheckBox from './CheckBox'
import * as Model from '../models'
import * as Actions from '../redux/actions'

export interface TripPropertiesProps {
}

export interface DispatchProps {
    initApp: () => void,
    toggleTripProperty: (group: string) => void
    setDays: (days: number) => void
    navigation: any
}

interface StateProps {
    packs: Model.StuffPack[],
    days: number
}

interface State {
    dataSource: ListViewDataSource,
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

    renderDayPicker () {
        const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
        return (
            <View style={styles.pickerContainer}>
                <Text style={styles.pickerText}>
                    Количество дней поездки
                </Text>
                <Picker
                    selectedValue={this.props.days}
                    onValueChange={(value: number) => {
                        this.props.setDays(value)
                    }}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                    mode={'dropdown'}
                >
                    {days.map(i => <Picker.Item label={`${i}`} value={i}/>)}
                </Picker>
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
                            : <View style={styles.separator}/>
                    }}
                />
                {this.renderDayPicker()}
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
        packs: state.stuff.packs,
        days: state.stuff.days
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
    } as React.ViewStyle,

    separator: {
        alignSelf: 'stretch',
        height: 1,
        backgroundColor: 'rgb(230,230,230)',
    } as React.ViewStyle,

    pickerContainer: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 25
    } as React.ViewStyle,

    pickerText: {
        fontSize: 15
    } as React.TextStyle,

    picker: {
        width: 73,
        height: 60,
    } as React.ViewStyle,

    pickerItem: {
        height: 60,
    } as React.ViewStyle,
})
