import * as Model from '../models'

export function uniquelyStuff(stuff: Model.Stuff[]): Model.Stuff[] {
    const keys: string[] = [...new Set(stuff.map(item => item.key))]
    return keys.map(key => stuff.find(item => item.key === key))
}