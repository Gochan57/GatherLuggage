import * as Model from '../models'
import {StuffPack} from '../models'
import {packs} from '../resources/packs'

class StuffService {
    public loadStuffFromResources(): Model.StuffPack[] {
        if (packs) {
            return packs.map((pack: Model.StuffPackResource) => new StuffPack(pack))
        }
        return []
    }
}

const stuffService = new StuffService()
export default stuffService