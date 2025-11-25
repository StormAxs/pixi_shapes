import { ShapeType } from '../../types';

export interface AreaCalculator {
    supports(type: ShapeType): boolean;
    area(size: number, sides?: number): number;
}
