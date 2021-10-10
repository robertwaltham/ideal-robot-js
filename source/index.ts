import * as PIXI from 'pixi.js'
import { Engine } from './engine'
import { FpsMeter } from './fps-meter';
import { GameScene } from './Scenes/game-scene';
import { IntroScene } from './Scenes/Intro-scene';
import { Scene } from './Scenes/scene';

const engine = new Engine({
    containerId: 'game',
    canvasW: 800,
    canvasH: 450,
    fpsMax: 60
});

let fpsMeter: FpsMeter;
let gameScene: GameScene;
let introScene: IntroScene;
var activeScene: Scene;

window.onload = load;

function load() {
    create();
}

function create() {

    gameScene = new GameScene(engine);
    introScene = new IntroScene(engine);
    introScene.onTransition = () => {
        activeScene = gameScene;
        engine.stage.removeChild(introScene);
        engine.stage.addChild(gameScene);
    }
    activeScene = introScene;

    /* FPS */
    const fpsMeterItem = document.createElement('div');
    fpsMeterItem.classList.add('fps');
    engine.container.appendChild(fpsMeterItem);

    fpsMeter = new FpsMeter(() => {
        fpsMeterItem.innerHTML = 'FPS: ' + fpsMeter.getFrameRate().toFixed(2).toString();
    });

    engine.stage.addChild(introScene);

    setInterval(update, 1000.0 / engine.fpsMax);

    PIXI.Ticker.shared.add(function (time) {
        activeScene.update(time);
    });
    render();
}

function update() {
    fpsMeter.updateTime();
}

function render() {
    requestAnimationFrame(render);

    engine.renderer.render(engine.stage);
    fpsMeter.tick();
}