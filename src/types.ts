export type ShapeType = 'triangle' | 'quad' | 'pentagon' | 'hexagon' | 'circle' | 'ellipse' | 'random'


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