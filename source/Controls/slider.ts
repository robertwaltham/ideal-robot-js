import * as PIXI from 'pixi.js'

export class Slider extends PIXI.Sprite {

    dragging: boolean;
    eventTouchStart: PIXI.Point;
    onMove: (slider: Slider) => void;

    constructor(renderer: PIXI.AbstractRenderer, onMove: (slider: Slider) => void) {

        let lineColor = 0xFFBD01;
        let fillColor = 0xC34288;

        var gr = new PIXI.Graphics();
        gr.lineStyle(2, lineColor, 1);
        gr.beginFill(fillColor);
        gr.drawRoundedRect(0, 0, 100, 25, 5);
        gr.endFill();
        var texture = renderer.generateTexture(gr);

        super(texture);

        this.dragging = false;
        this.onMove = onMove;

        gr = new PIXI.Graphics();
        gr.lineStyle(2, lineColor, 1);
        gr.beginFill(fillColor);
        gr.drawPolygon(0.0,0.0, 10.0,0.0, 0.0, 10.0);
        gr.endFill();
        texture = renderer.generateTexture(gr);

        let slide = new PIXI.Container();
        slide.width = 40;
        slide.height = 40;
        slide.position.y = 0;



        var sprite = new PIXI.Sprite(texture);
        sprite.rotation = Math.PI * 3 / 4.0;
        sprite.anchor.set(0.5);
        slide.addChild(sprite);

        sprite = new PIXI.Sprite(texture);
        sprite.anchor.set(0.5);
        sprite.rotation = Math.PI * 7 / 4.0;
        slide.addChild(sprite);

        this.addChild(slide);

        slide.interactive = true;
        slide.buttonMode = true;
 
        slide.on('pointerdown', (event) => {
            this.dragging = true;
            this.eventTouchStart = event.data.getLocalPosition(slide);
        });

        
        slide.on('pointerup', (event) => {
            this.dragging = false;
        });
  
        slide.on('pointerupoutside', (event) => {
            this.dragging = false;
        });

        slide.on('pointermove', (event) => {
            if (this.dragging) {
                const newPosition = event.data.getLocalPosition(this);
                slide.x = newPosition.x - this.eventTouchStart.x;
                if (slide.x < 0) {
                    slide.x = 0;
                }

                if (slide.x > this.width) {
                    slide.x = this.width;
                }
                // this.y = newPosition.y - this.eventTouchStart.y;
                this.onMove(this);
            }

        });


    }
}