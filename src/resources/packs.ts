import * as Model from '../models'

export const packs: Model.StuffPackResource[] = [
    {
        group: 'main',
        rus: 'основное',
        stuff: [
            'паспорт',
            'кошелек',
            'телефон и зарядка',
            {
                name: 'футболки',
                countPerDay: 0.6
            },
            {
                name: 'рубашки',
                countPerDay: 0.4
            },
            {
                name: 'штаны',
                countPerDay: 0.15
            },
            {
                name: 'носки',
                countPerDay: 1
            },
            {
                name: 'трусы',
                countPerDay: 1
            },
            'зубные принадлежности',
            'дезодорант',
            'бритва и пена для бритья',
            'аптечка',
            'одноразовые пакеты',
            'рации',
        ]
    },
    {
        group: 'warm',
        rus: 'тепло',
        stuff: [
            'кепка',
            'солнцезащитные очки',
            {
                name: 'шорты',
                countPerDay: 0.2
            }
        ]
    },
    {
        group: 'cold',
        rus: 'холодно',
        stuff: [
            {
                name: 'толстовка/свитер',
                countPerDay: 0.13
            }
        ]
    },
    {
        group: 'airplane',
        rus: 'самолет',
        stuff: [
            'паспорт',
            'билеты'
        ]
    },
    {
        group: 'sea',
        rus: 'море',
        stuff: [
            'плавки',
            'сланцы',
            'маска и трубка',
            'лежак для пляжа',
            'солнцезащитный крем',
        ]
    },
    {
        group: 'swimming pool',
        rus: 'бассейн',
        stuff: [
            'плавки',
            'сланцы',
        ]
    },
    {
        group: 'skiing',
        rus: 'горнолыжка',
        stuff: [
            'сноуборд',
            'шлем',
            'защита',
            'сноубордические носки',
            'термобелье'
        ]
    }
]