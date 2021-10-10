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

    data: any;
    dragging: boolean;
    eventTouchStart: PIXI.Point;
    dragMove: (card: Card) => void;
    dragEnd: (card: Card) => void;

    constructor(renderer: PIXI.AbstractRenderer, dragMove: (card: Card) => void, dragEnd: (card: Card) => void) {

        var gr = new PIXI.Graphics();
        gr.lineStyle(10, 0xFFBD01, 1);
        gr.beginFill(0xC34288);
        gr.drawRoundedRect(0, 0, 100, 161, 15);
        gr.endFill();
        var texture = renderer.generateTexture(gr);

        super(texture);

        this.dragMove = dragMove;
        this.dragEnd = dragEnd;

        this.interactive = true;
        this.buttonMode = true;

        this.anchor.set(0.5);

        this
            .on('pointerdown', this.onDragStart)
            .on('pointerup', this.onDragEnd)
            .on('pointerupoutside', this.onDragEnd)
            .on('pointermove', this.onDragMove);

        let image = PIXI.Texture.from('spr_rb-gb_003.png');
        let sprite1 = new PIXI.Sprite(image);
        sprite1.anchor.set(0.5);
        this.addChild(sprite1);
    }

    isOverlap(object2) {
        const bounds1 = this.getBounds();
        const bounds2 = object2.getBounds();

        return bounds1.x < bounds2.x + bounds2.width
            && bounds1.x + bounds1.width > bounds2.x
            && bounds1.y < bounds2.y + bounds2.height
            && bounds1.y + bounds1.height > bounds2.y;
    }

    onDragStart(event) {
        // store a reference to the data
        // the reason for this is because of multitouch
        // we want to track the movement of this particular touch
        this.data = event.data;
        this.dragging = true;
        this.eventTouchStart = this.data.getLocalPosition(this)
        this.filters = [Card.outlineFilterRed];

        this.zIndex = 1000;

    }

    onDragEnd() {
        this.dragging = false;
        // set the interaction data to null
        this.data = null;

        this.filters = [];

        this.dragEnd(this);
        this.zIndex = 0;
    }

    onDragMove() {
        if (this.dragging) {
            this.dragMove(this);
            const newPosition = this.data.getLocalPosition(this.parent);
            this.x = newPosition.x - this.eventTouchStart.x;
            this.y = newPosition.y - this.eventTouchStart.y;
        }
    }
}