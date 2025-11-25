export enum ShapeType {
    Triangle = 'triangle',
    Quad = 'quad',
    Pentagon = 'pentagon',
    Hexagon = 'hexagon',
    Circle = 'circle',
    Ellipse = 'ellipse',
    Random = 'random'
}

export const SHAPE_TYPES: readonly ShapeType[] = [
    ShapeType.Triangle,
    ShapeType.Quad,
    ShapeType.Pentagon,
    ShapeType.Hexagon,
    ShapeType.Circle,
    ShapeType.Ellipse,
    ShapeType.Random
] as const;


export interface IShapeData {
    id: string
    type: ShapeType
    x: number
    y: number
    rotation: number
    vx: number
    vy: number
    size: number
    color: number
    area: number
    sides?: number
    hue ?: number
}