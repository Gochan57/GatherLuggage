export interface StuffPackResource {
    group: string,
    rus: string,
    stuff: StuffItemResource[]
}

export type StuffItemResource = StuffItem | string

export interface StuffItem {
    key?: string
    name: string
    required?: boolean
    takeBeforeDeparture?: boolean
    count?: number
}

export class Stuff {
    constructor(resource: StuffItemResource) {
        let item: StuffItem
        if (typeof resource === 'string') {
            item = {name: resource}
        }
        else {
            item = resource
        }
        this.key = item.name
        this.name = item.name
        this.required = item.required || false
        this.takeBeforeDeparture = item.takeBeforeDeparture || false
        this.count = item.count || 1
        this.prepared = false
        this.packed = false
    }
    key: string
    name: string
    required: boolean
    takeBeforeDeparture: boolean
    count: number
    prepared: boolean
    packed: boolean
}

export class StuffPack {
    constructor(resource: StuffPackResource) {
        this.group = resource.group
        this.rus = resource.rus
        this.stuff = resource.stuff.map(item => new Stuff(item))
        this.selected = false
    }
    group: string
    rus: string
    stuff: Stuff[]
    selected: boolean
}
