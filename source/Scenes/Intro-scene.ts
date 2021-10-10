import * as PIXI from 'pixi.js'
import * as FILTERS from 'pixi-filters'

import { Engine } from '../engine'
import { Scene } from './scene'

export class IntroScene extends PIXI.Container implements Scene {

    outlineFilterRed: FILTERS.GlowFilter;
    text: PIXI.Text;
    status: PIXI.Text;
    count: number = 0;
    fading: boolean = false;
    formatter: Intl.NumberFormat = new Intl.NumberFormat('en-CA', { maximumSignificantDigits: 3 })
    onTransition: () => void;

    constructor(engine: Engine) {
        super()

        this.outlineFilterRed = new FILTERS.GlowFilter({
            distance: 15,
            outerStrength: 2,
            innerStrength: 1,
            color: 0xff9999,
            quality: 0.5
        });

        let font: PIXI.ITextStyle = {
            fontFamily: 'Arial', fontSize: 60, fill: 0xff1010, align: 'center',
            breakWords: false,
            dropShadow: false,
            dropShadowAlpha: 0,
            dropShadowAngle: 0,
            dropShadowBlur: 0,
            dropShadowColor: '',
            dropShadowDistance: 0,
            fillGradientType: PIXI.TEXT_GRADIENT.LINEAR_VERTICAL,
            fillGradientStops: [],
            fontStyle: 'normal',
            fontVariant: 'normal',
            fontWeight: 'normal',
            letterSpacing: 0,
            lineHeight: 0,
            lineJoin: 'miter',
            miterLimit: 0,
            padding: 0,
            stroke: '',
            strokeThickness: 0,
            textBaseline: 'alphabetic',
            trim: false,
            whiteSpace: 'normal',
            wordWrap: false,
            wordWrapWidth: 0,
            leading: 0
        };

        let font2 = { ...font };
        font2.fontSize = 12;
        font2.fill = 0x808080;

        this.text = new PIXI.Text('Welcome', font);
        this.status = new PIXI.Text('Text', font2);
        this.addChild(this.status);
        this.text.filters = [this.outlineFilterRed];

        this.text.anchor.set(0.5);
        this.text.x = engine.renderer.width / 2;
        this.text.y = engine.renderer.height / 2;
        this.addChild(this.text);

        this.text.interactive = true;
        this.text.buttonMode = true;

        this.text.on('pointerup', (event) => {
            this.fading = true;
            this.text.interactive = false;
        });
    }


    update(time: number): void {
        this.count += time;

        this.status.text = `${this.fading} - ${this.formatter.format(this.outlineFilterRed.outerStrength)} - ${this.formatter.format(this.alpha)}`;

        if (this.fading) {
            if (this.alpha > 0) {
                this.alpha = this.alpha - (0.01);
            } else {
                this.fading = false;
                this.onTransition();
            }
        } else {
            this.outlineFilterRed.outerStrength = 1 + Math.cos(this.count / (Math.PI * 16));

            this.text.scale.x = 1 + Math.cos(this.count / (Math.PI * 16)) / 4;
            this.text.scale.y = 1 + Math.cos(this.count / (Math.PI * 16)) / 4;
        }
    }
}