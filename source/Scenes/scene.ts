import { Engine } from '../engine' 

export interface Scene {
    update(engine: Engine):void
}