import { Shape } from './Shape';
import { ShapeType, IShapeData } from '../types';

export class ShapeManager {
    private shapes: Map<string, Shape> = new Map();
    private gravity: number = 600; // px/s
    private spawnRate: number = 5; // shapes
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
        const types: ShapeType[] = ['triangle', 'quad', 'pentagon', 'hexagon', 'circle', 'ellipse', 'random'];
        let type = types[Math.floor(Math.random() * types.length)];
        
        let sides: number | undefined = undefined;
        if (type === 'random') {
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
        
        const area = this.calculateArea(type, size, sides);
        
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
            sides
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
            hash = hash & hash; // Convert to 32bit integer
        }
        return Math.abs(hash);
    }

    private calculateArea(type: ShapeType, size: number, sides?: number): number {
        const radius = size / 2;
        
        switch (type) {
            case 'circle':
                return Math.PI * radius * radius;
            case 'ellipse':
                return Math.PI * radius * (radius * 0.7); // Ellipse with aspect ratio
            case 'triangle':
                return (Math.sqrt(3) / 4) * size * size;
            case 'quad':
                return size * size;
            case 'pentagon':
                return (5 / 4) * size * size * (1 / Math.tan(Math.PI / 5));
            case 'hexagon':
                return (3 * Math.sqrt(3) / 2) * radius * radius;
            case 'random':
                if (sides !== undefined) {
                    return (sides / 4) * size * size * (1 / Math.tan(Math.PI / sides));
                }
                return Math.PI * radius * radius * 0.8;
            default:
                return size * size;
        }
    }

    removeShape(id: string): boolean {
        return this.shapes.delete(id);
    }

    removeShapeAt(x: number, y: number, tolerance: number = 30): boolean {
        const shapesArray = Array.from(this.shapes.values());
        for (let i = shapesArray.length - 1; i >= 0; i--) {
            const shape = shapesArray[i];
            const dx = x - shape.x;
            const dy = y - shape.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < tolerance) {
                this.shapes.delete(shape.id);
                return true;
            }
        }
        return false;
    }

    update(deltaTime: number): void {
        this.spawnTimer += deltaTime;
        const spawnInterval = 1 / this.spawnRate;
        
        if (this.spawnRate > 0 && this.spawnTimer >= spawnInterval) {
            this.spawnTimer = 0;
            this.createRandomShape();
        }
        
        const shapesToRemove: string[] = [];
        
        for (const shape of this.shapes.values()) {
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

