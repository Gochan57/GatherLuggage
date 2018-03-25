import * as Model from '../models'

export interface StuffState {
    packs: Model.StuffPack[],
    days: number
}

export interface AppState {
    stuff: StuffState
}
