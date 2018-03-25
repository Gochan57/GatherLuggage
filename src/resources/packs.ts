import * as Model from '../models'

export const packs: Model.StuffPackResource[] = [
    {
        "group": "main",
        "rus": "основное",
        "stuff": [
            "паспорт",
            "кошелек",
            {
                name: 'футболки',
                countPerDay: 0.6
            },
            {
                name: 'рубашки',
                countPerDay: 0.4
            },
        ]
    },
    {
        "group": "airplane",
        "rus": "самолет",
        "stuff": [
            "паспорт",
            "билеты"
        ]
    },
    {
        "group": "sea",
        "rus": "море",
        "stuff": [
            "плавки",
            "маска и трубка"
        ]
    },
    {
        "group": "skiing",
        "rus": "горнолыжка",
        "stuff": [
            "сноуборд",
            "шлем"
        ]
    }
]