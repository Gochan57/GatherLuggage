import * as React from 'react'
import {
    ListView,
    ListViewDataSource,
    View,
    StyleSheet,
} from 'react-native'
import {connect} from 'react-redux';

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

interface State {
    dataSource: ListViewDataSource
}

class TripPropertiesContainer extends React.Component<TripPropertiesProps & DispatchProps & StateProps, State> {
    constructor (props: TripPropertiesProps & DispatchProps & StateProps) {
        super(props)
        this.state = {
            dataSource: this.ds.cloneWithRows(props.packs),
        };
    }

    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

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
            <View style={styles.rowContainer}>
                <CheckBox
                    label={pack.rus}
                    checked={pack.selected}
                    onCheck={(checked: boolean) => {
                        this.props.toggleTripProperty(pack.group)
                    }}
                >
                </CheckBox>
            </View>
        )
    }

    renderContent () {
        return (
            <View style={[styles.container]}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(data: Model.StuffPack) => {
                        return this.renderProperty(data)
                    }}
                />
            </View>
        )
    }

    render () {
        return (
            <Page
                header={{
                    title: 'Атрибуты путешествия'
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
