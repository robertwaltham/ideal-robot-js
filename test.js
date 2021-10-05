// import * as PIXI from './pixi.js'

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new PIXI.Application();

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view);

const outlineFilterRed = new PIXI.filters.GlowFilter(15, 2, 1, 0xff9999, 0.5);


var gr = new PIXI.Graphics();  
gr.lineStyle(10, 0xFFBD01, 1);
gr.beginFill(0xC34288);
gr.drawRoundedRect(0, 0, 100, 161, 15);
gr.endFill();

var texture = app.renderer.generateTexture(gr);
var card = new PIXI.Sprite(texture);

app.stage.addChild(card);

card
.on('pointerdown', onDragStart)
.on('pointerup', onDragEnd)
.on('pointerupoutside', onDragEnd)
.on('pointermove', onDragMove);

// enable the bunny to be interactive... this will allow it to respond to mouse and touch events
card.interactive = true;

// this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
card.buttonMode = true;

card.anchor.set(0.5);
card.x = app.screen.width / 2;
card.y = app.screen.height / 2;

gr = new PIXI.Graphics();  
gr.lineStyle(10, 0xBDBDBD, 1);
gr.beginFill(0x0F0F0F);
gr.drawRoundedRect(0, 0, 100, 161, 15);
gr.endFill();

var texture = app.renderer.generateTexture(gr);
var slot = new PIXI.Sprite(texture);
slot.anchor.set(0.5);
slot.x = app.screen.width / 4;
slot.y = app.screen.height / 4;
app.stage.addChildAt(slot, 0);


function onDragStart(event) {
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.data = event.data;
    this.dragging = true;
    this.eventTouchStart = this.data.getLocalPosition(this)
    this.filters = [outlineFilterRed];
}

function onDragEnd() {
    this.dragging = false;
    // set the interaction data to null
    this.data = null;

    if (isOverlap(slot, this)) {
        this.x = slot.x;
        this.y = slot.y;
    }
    slot.filters = [];
    this.filters = [];

}

function onDragMove() {
    if (this.dragging) {
        const newPosition = this.data.getLocalPosition(this.parent);
        this.x = newPosition.x - this.eventTouchStart.x;
        this.y = newPosition.y - this.eventTouchStart.y;

        if (isOverlap(slot, this)) {
            slot.filters = [outlineFilterRed];
        } else {
            slot.filters = [];
        }
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

