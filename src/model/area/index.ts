import { ShapeType } from '../../types';
import { AreaCalculator } from './AreaCalculator';
import * as Areas from './AreaShapes';


const calculators: AreaCalculator[] = [
    new Areas.CircleArea(),
    new Areas.EllipseArea(),
    new Areas.TriangleArea(),
    new Areas.QuadArea(),
    new Areas.PentagonArea(),
    new Areas.HexagonArea(),
    new Areas.RandomArea(),
    new Areas.DefaultArea()
];

export function calculateArea(type: ShapeType, size: number, sides?: number): number {
    for (const c of calculators) {
        if (c.supports(type)) return Math.max(0, c.area(size, sides));
    }
    return Math.max(0, new Areas.DefaultArea().area(size));
}
