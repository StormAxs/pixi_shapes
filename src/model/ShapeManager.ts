import { Shape } from './Shape';
import { ShapeType, IShapeData, SHAPE_TYPES } from '../types';
import { calculateArea } from "./area";
import { utils } from 'pixi.js';
import {RAINBOW_SPEED} from "../config";

export class ShapeManager {
    private shapes: Map<string, Shape> = new Map();
    private gravity: number = 600;
    private spawnRate: number = 5;
    private spawnTimer: number = 0;
    private rectangleWidth: number;
    private rectangleHeight: number;
    private rectangleX: number;
    private rectangleY: number;

    constructor(rectangleX: number, rectangleY: number, rectangleWidth: number, rectangleHeight: number) {
        this.rectangleX = rectangleX;
        this.rectangleY = rectangleY;
        this.rectangleWidth = rectangleWidth;
        this.rectangleHeight = rectangleHeight;
    }

    getGravity(): number {
        return this.gravity;
    }

    setGravity(value: number): void {
        this.gravity = Math.max(0, value);
    }

    getSpawnRate(): number {
        return this.spawnRate;
    }

    setSpawnRate(value: number): void {
        this.spawnRate = Math.max(0, value);
    }

    getShapes(): Shape[] {
        return Array.from(this.shapes.values());
    }

    getShapeCount(): number {
        return this.shapes.size;
    }

    getTotalArea(): number {
        let total = 0;
        for (const shape of this.shapes.values()) {
            total += shape.area;
        }
        return Math.round(total);
    }

    createRandomShape(x?: number, y?: number): Shape {
        const id = `shape_${Date.now()}_${Math.random()}`;
        const randomIndex = Math.floor(Math.random() * SHAPE_TYPES.length);
        let type = SHAPE_TYPES[randomIndex];
        let sides: number | undefined = undefined;
        if (type === ShapeType.Random) {
            const hash = this.simpleHash(id);
            sides = 3 + (hash % 5);
        }
        const size = 20 + Math.random() * 40;
        const color = Math.random() * 0xffffff;
        const shapeX = x !== undefined ? x : this.rectangleX + Math.random() * this.rectangleWidth;
        const shapeY = y !== undefined ? y : this.rectangleY - 50;
        const vx = (Math.random() - 0.5) * 50;
        const vy = 0;
        const rotation = Math.random() * Math.PI * 2;
        const area = calculateArea(type, size, sides);
        const shapeData: IShapeData = {
            id,
            type,
            x: shapeX,
            y: shapeY,
            rotation,
            vx,
            vy,
            size,
            color,
            area,
            sides,
            hue: Math.random() * 360
        };
        const shape = new Shape(shapeData);
        this.shapes.set(id, shape);
        return shape;
    }

    private simpleHash(str: string): number {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash);
    }

    removeShape(id: string): boolean {
        return this.shapes.delete(id);
    }

    changeColorByType(type: ShapeType, newColor: number): void {
        for (const shape of this.shapes.values()) {
            if (shape.type === type) {
                shape.color = newColor;
            }
        }
    }



    update(deltaTime: number, rainbow: boolean): void {
        this.spawnTimer += deltaTime;
        const spawnInterval = 1 / this.spawnRate;
        if (this.spawnRate > 0 && this.spawnTimer >= spawnInterval) {
            this.spawnTimer = 0;
            this.createRandomShape();
        }
        const shapesToRemove: string[] = [];
        for (const shape of this.shapes.values()) {
            if (rainbow) {
                shape.hue = (shape.hue + RAINBOW_SPEED * deltaTime) % 360;
                shape.color = utils.string2hex(`hsl(${shape.hue}, 100%, 50%)`);
            }
            shape.update(deltaTime, this.gravity);
            if (shape.y > this.rectangleY + this.rectangleHeight + 100) {
                shapesToRemove.push(shape.id);
            }
        }
        for (const id of shapesToRemove) {
            this.shapes.delete(id);
        }
    }

    isPointInRectangle(x: number, y: number): boolean {
        return x >= this.rectangleX &&
            x <= this.rectangleX + this.rectangleWidth &&
            y >= this.rectangleY &&
            y <= this.rectangleY + this.rectangleHeight;
    }
}
