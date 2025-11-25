import * as PIXI from 'pixi.js';
import { Shape } from '../model/Shape';
import { ShapeType } from '../types';
import {CanvasBGColor, InsideBorderColor} from "../config";

export class PixiView {
    private app: PIXI.Application;
    private container: PIXI.Container;
    private shapeGraphics: Map<string, PIXI.Graphics> = new Map();
    private rectangleGraphics: PIXI.Graphics;
    private rectangleX: number;
    private rectangleY: number;
    private rectangleWidth: number;
    private rectangleHeight: number;
    private canvasElement: HTMLCanvasElement;

    constructor(width: number, height: number, rectangleX: number, rectangleY: number, rectangleWidth: number, rectangleHeight: number) {
        this.rectangleX = rectangleX;
        this.rectangleY = rectangleY;
        this.rectangleWidth = rectangleWidth;
        this.rectangleHeight = rectangleHeight;

        this.app = new PIXI.Application({
            width,
            height,
            backgroundColor: CanvasBGColor,
            antialias: true
        });

        this.canvasElement = this.app.view as HTMLCanvasElement;

        this.container = new PIXI.Container();
        this.app.stage.addChild(this.container);


        this.rectangleGraphics = new PIXI.Graphics();
        this.rectangleGraphics.lineStyle(2, InsideBorderColor, 1);
        this.rectangleGraphics.drawRect(rectangleX, rectangleY, rectangleWidth, rectangleHeight);
        this.container.addChild(this.rectangleGraphics);
    }

    getCanvas(): HTMLCanvasElement {
        return this.canvasElement;
    }

    getApp(): PIXI.Application {
        return this.app;
    }

    renderShapes(shapes: Shape[]): void {
        const currentIds = new Set(shapes.map(s => s.id));
        for (const [id, graphics] of this.shapeGraphics.entries()) {
            if (!currentIds.has(id)) {
                graphics.destroy();
                this.shapeGraphics.delete(id);
            }
        }

        for (const shape of shapes) {
            let graphics = this.shapeGraphics.get(shape.id);
            
            if (!graphics) {
                graphics = new PIXI.Graphics();
                this.shapeGraphics.set(shape.id, graphics);
                this.container.addChild(graphics);
            }

            this.drawShape(graphics, shape);
        }
    }

    private drawShape(graphics: PIXI.Graphics, shape: Shape): void {
        graphics.clear();

        // просто применяем цвет (он будет меняться каждый кадр)
        graphics.beginFill(shape.color);

        const size = shape.size;
        const halfSize = size / 2;

        switch (shape.type) {
            case 'circle': graphics.drawCircle(0, 0, halfSize); break;
            case 'ellipse': graphics.drawEllipse(0, 0, halfSize, halfSize * 0.7); break;
            case 'triangle': this.drawPolygon(graphics, 3, halfSize); break;
            case 'quad': this.drawPolygon(graphics, 4, halfSize); break;
            case 'pentagon': this.drawPolygon(graphics, 5, halfSize); break;
            case 'hexagon': this.drawPolygon(graphics, 6, halfSize); break;
            case 'random':
                const sides = shape.sides || 5;
                this.drawPolygon(graphics, sides, halfSize);
                break;
        }

        graphics.endFill();

        graphics.x = shape.x;
        graphics.y = shape.y;
        graphics.rotation = shape.rotation;
    }

    private drawPolygon(graphics: PIXI.Graphics, sides: number, radius: number): void {
        const points: number[] = [];
        for (let i = 0; i < sides; i++) {
            const angle = (i / sides) * Math.PI * 2 - Math.PI / 2;
            points.push(Math.cos(angle) * radius);
            points.push(Math.sin(angle) * radius);
        }
        graphics.drawPolygon(points);
    }

    getShapeAt(x: number, y: number): string | null {
        const shapes = Array.from(this.shapeGraphics.entries()).reverse();
        for (const [id, graphics] of shapes) {
            const dx = x - graphics.x;
            const dy = y - graphics.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 30) {
                return id;
            }
        }
        return null;
    }

    destroy(): void {
        for (const graphics of this.shapeGraphics.values()) {
            graphics.destroy();
        }
        this.shapeGraphics.clear();
        this.rectangleGraphics.destroy();
        this.app.destroy(true);
    }
}

