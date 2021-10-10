import * as PIXI from 'pixi.js'
import * as FILTERS from 'pixi-filters'

export class Slot extends PIXI.Sprite {
    static outlineFilterRed = new FILTERS.GlowFilter({
        distance: 15,
        outerStrength: 2,
        innerStrength: 1,
        color: 0xff9999,
        quality: 0.5
    });

    constructor(renderer: PIXI.AbstractRenderer) {

        var gr = new PIXI.Graphics();
        gr.lineStyle(10, 0xBDBDBD, 1);
        gr.beginFill(0x0F0F0F);
        gr.drawRoundedRect(0, 0, 100, 161, 15);
        gr.endFill();
        var texture = renderer.generateTexture(gr);

        super(texture);

        this.interactive = true;
        this.buttonMode = true;

        this.anchor.set(0.5);
    }

    setOn() {
        this.filters = [Slot.outlineFilterRed];
    }

    setOff() {
        this.filters = [];
    }
}