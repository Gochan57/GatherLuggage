import * as Model from '../models'

export interface StuffState {
    packs: Model.StuffPack[]
}

export interface AppState {
    stuff: StuffState
}
