import { AreaCalculator } from './AreaCalculator';
import { ShapeType } from '../../types';


export class CircleArea implements AreaCalculator {
    supports(type: ShapeType): boolean {
        return type === 'circle';
    }

    area(size: number): number {
        const r = size / 2;
        return Math.PI * r * r;
    }
}

export class EllipseArea implements AreaCalculator {
    supports(type: ShapeType): boolean { return type === 'ellipse'; }
    area(size: number): number {
        const r = size / 2;
        return Math.PI * r * (r * 0.7);
    }
}

export class TriangleArea implements AreaCalculator {
    supports(type: ShapeType): boolean { return type === 'triangle'; }
    area(size: number): number {
        return (Math.sqrt(3) / 4) * size * size;
    }
}

export class QuadArea implements AreaCalculator {
    supports(type: ShapeType): boolean { return type === 'quad'; }
    area(size: number): number {
        return size * size;
    }
}

export class PentagonArea implements AreaCalculator {
    supports(type: ShapeType): boolean { return type === 'pentagon'; }
    area(size: number): number {
        return (5 / 4) * size * size * (1 / Math.tan(Math.PI / 5));
    }
}

export class HexagonArea implements AreaCalculator {
    supports(type: ShapeType): boolean {
        return type === 'hexagon';
    }

    area(size: number): number {
        const r = size / 2;
        return (3 * Math.sqrt(3) / 2) * r * r;
    }
}

export class RandomArea implements AreaCalculator {
    supports(type: ShapeType): boolean { return type === 'random'; }
    area(size: number, sides?: number): number {
        if (sides !== undefined) {
            return (sides / 4) * size * size * (1 / Math.tan(Math.PI / sides));
        }
        const r = size / 2;
        return Math.PI * r * r * 0.8;
    }
}


export class DefaultArea implements AreaCalculator {
    supports(): boolean { return true; }
    area(size: number): number {
        return size * size;
    }
}

