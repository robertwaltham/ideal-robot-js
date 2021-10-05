import * as PIXI from 'pixi.js'
import * as FILTERS from 'pixi-filters'

export class Card extends PIXI.Sprite {
    static outlineFilterRed = new FILTERS.GlowFilter({
        distance: 15,
        outerStrength: 2,
        innerStrength: 1,
        color: 0xff9999,
        quality: 0.5
    });

    constructor(renderer: PIXI.AbstractRenderer) {

        var gr = new PIXI.Graphics();  
        gr.lineStyle(10, 0xFFBD01, 1);
        gr.beginFill(0xC34288);
        gr.drawRoundedRect(0, 0, 100, 161, 15);
        gr.endFill();
        var texture = renderer.generateTexture(gr);

        super(texture);

        // enable the bunny to be interactive... this will allow it to respond to mouse and touch events
        this.interactive = true;

        // this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
        this.buttonMode = true;

        this.anchor.set(0.5);

        this
        .on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', onDragMove);

        let image = PIXI.Texture.from('spr_rb-gb_003.png');
        let sprite1 = new PIXI.Sprite(image);
        sprite1.anchor.set(0.5);
        this.addChild(sprite1);
    }
}

function onDragStart(event) {
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.data = event.data;
    this.dragging = true;
    this.eventTouchStart = this.data.getLocalPosition(this)
    this.filters = [Card.outlineFilterRed];
}

function onDragEnd() {
    this.dragging = false;
    // set the interaction data to null
    this.data = null;

    // if (isOverlap(slot, this)) {
    //     this.x = slot.x;
    //     this.y = slot.y;
    // }
    // slot.filters = [];
    this.filters = [];

}

function onDragMove() {
    if (this.dragging) {
        const newPosition = this.data.getLocalPosition(this.parent);
        this.x = newPosition.x - this.eventTouchStart.x;
        this.y = newPosition.y - this.eventTouchStart.y;

        // if (isOverlap(slot, this)) {
        //     slot.filters = [outlineFilterRed];
        // } else {
        //     slot.filters = [];
        // }
    }
}

function isOverlap(object1, object2) {
    const bounds1 = object1.getBounds();
    const bounds2 = object2.getBounds();

    return bounds1.x < bounds2.x + bounds2.width
        && bounds1.x + bounds1.width > bounds2.x
        && bounds1.y < bounds2.y + bounds2.height
        && bounds1.y + bounds1.height > bounds2.y;
}