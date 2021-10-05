import * as PIXI from 'pixi.js'
import { FpsMeter } from './fps-meter';
import { Card } from './card'
import { Slot } from './slot'

interface EngineParams {
    containerId: string,
    canvasW: number,
    canvasH: number,
    fpsMax: number
}

class Engine {
    public container: HTMLElement;
    public loader: PIXI.Loader;
    public renderer: PIXI.AbstractRenderer;
    public stage: PIXI.Container;
    public graphics: PIXI.Graphics;
    public fpsMax: number;

    constructor(params: EngineParams) {
        this.loader = PIXI.Loader.shared;
        this.renderer = PIXI.autoDetectRenderer({
            width: params.canvasW,
            height: params.canvasH,
            antialias: true
        });
        this.stage = new PIXI.Container();
        this.stage.sortableChildren = true;
        this.graphics = new PIXI.Graphics();
        this.fpsMax = params.fpsMax;

        this.container = params.containerId ? document.getElementById(params.containerId) || document.body : document.body;
        this.container.appendChild(this.renderer.view);
    } // constructor
} // Engine

const engine = new Engine({
    containerId: 'game',
    canvasW: 800,
    canvasH: 450,
    fpsMax: 60
});

let fpsMeter: FpsMeter;
// const sprite = PIXI.Sprite.from('images/logo.png');

// ==============
// === STATES ===
// ==============

window.onload = load;

function load() {
    create();
} // load

function create() {
    /* ***************************** */
    /* Create your Game Objects here */
    /* ***************************** */

    var slots:Slot[] = [];

    var dragEnd = (card: Card) => {
        slots.forEach((item) => {
            if (card.isOverlap(item)) {
                card.x = item.x;
                card.y = item.y;
            }
            item.setOff();
        });
    };
    var dragMove = (card: Card) => {
        slots.forEach((item) => {
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

        slots.push(slot);
        engine.stage.addChild(slot);
    }

    /* FPS */
    const fpsMeterItem = document.createElement('div');
    fpsMeterItem.classList.add('fps');
    engine.container.appendChild(fpsMeterItem);

    fpsMeter = new FpsMeter(() => {
        fpsMeterItem.innerHTML = 'FPS: ' + fpsMeter.getFrameRate().toFixed(2).toString();
    });

    setInterval(update, 1000.0 / engine.fpsMax);
    render();
} // create

function update() {
    fpsMeter.updateTime();

    /* ***************************** */
    /* Update your Game Objects here */
    /* ***************************** */

} // update

function render() {
    requestAnimationFrame(render);

    /* ***************************** */
    /* Render your Game Objects here */
    /* ***************************** */

    /* Sprite */
    // sprite.rotation += 0.01;

    engine.renderer.render(engine.stage);
    fpsMeter.tick();
} // render