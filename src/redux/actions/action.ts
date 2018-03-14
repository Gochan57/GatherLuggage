import * as Model from '../../models'
import StuffService from '../../services/StuffService'

export function initApp(): Function {
    return (dispatch: Function, getState: () => Model.AppState) => {
        dispatch(setPacks(StuffService.loadStuffFromResources()))
    }
}

export function setPacks(packs: Model.StuffPack[]): Model.Action {
    return {
        type: 'setPacks',
        payload: {
            packs
        }
    }
}

export function toggleTripProperty (group: string): Model.Action {
    return {
        type: 'toggleTripProperty',
        payload: {
            group
        }
    }
}

export function toggleStuff (key: string): Model.Action {
    return {
        type: 'toggleStuff',
        payload: {
            key
        }
    }
}
