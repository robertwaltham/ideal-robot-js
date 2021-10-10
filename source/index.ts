import * as PIXI from 'pixi.js'
import { Engine } from './engine' 
import { FpsMeter } from './fps-meter';
import { GameScene } from './Scenes/game-scene';

const engine = new Engine({
    containerId: 'game',
    canvasW: 800,
    canvasH: 450,
    fpsMax: 60
});

let fpsMeter: FpsMeter;
let gameScene: GameScene;

window.onload = load;

function load() {
    create();
} // load

function create() {

    gameScene = new GameScene(engine);

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


} // update

function render() {
    requestAnimationFrame(render);

    /* Sprite */
    // sprite.rotation += 0.01;

    engine.renderer.render(engine.stage);
    fpsMeter.tick();
} // render