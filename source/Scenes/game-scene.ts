import * as PIXI from 'pixi.js'
import { Engine } from '../engine'
import { Scene } from './scene'
import { Card } from '../card'
import { Slot } from '../slot'

export class GameScene extends PIXI.Container implements Scene {
    slots:Slot[] = [];

    constructor(engine: Engine) {
        super()

        var dragEnd = (card: Card) => {
            this.slots.forEach((item) => {
                if (card.isOverlap(item)) {
                    card.x = item.x;
                    card.y = item.y;
                }
                item.setOff();
            });
        };
        var dragMove = (card: Card) => {
            this.slots.forEach((item) => {
                if (card.isOverlap(item)) {
                    item.setOn();
                } else {
                    item.setOff();
                }
            });
        };

        var card = new Card(engine.renderer, dragMove, dragEnd);
        card.x = engine.renderer.width * 3 / 4;
        card.y = engine.renderer.height / 2;
        engine.stage.addChild(card);

        card = new Card(engine.renderer, dragMove, dragEnd);
        card.x = engine.renderer.width / 4;
        card.y = engine.renderer.height / 2;
        engine.stage.addChild(card);

        for(var i=0;i<5;i++) {
            var slot = new Slot(engine.renderer);

            slot.x = engine.renderer.width * (i + 1) / 6;
            slot.y = engine.renderer.height / 4;

            this.slots.push(slot);
            engine.stage.addChild(slot);
        }

    }

    update(engine: Engine): void {

    }

}