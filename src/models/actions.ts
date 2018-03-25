import * as Model from '../models'

export type Action =
    {
        type: 'initApp'
    } |
    {
        type: 'setPacks'
        payload: {
            packs: Model.StuffPack[]
        }
    } |
    {
        type: 'toggleTripProperty',
        payload: {
            group: string
        }
    } |
    {
        type: 'setDays',
        payload: {
            days: number
        }
    } |
    {
        type: 'toggleStuff',
        payload: {
            key: string
        }
    }