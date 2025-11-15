import { ShapeType, IShapeData } from '../types';

export class Shape {
    private _id: string;
    private _type: ShapeType;
    private _x: number;
    private _y: number;
    private _rotation: number;
    private _vx: number;
    private _vy: number;
    private _size: number;
    private _color: number;
    private _area: number;
    private _sides?: number;

    constructor(data: IShapeData) {
        this._id = data.id;
        this._type = data.type;
        this._x = data.x;
        this._y = data.y;
        this._rotation = data.rotation;
        this._vx = data.vx;
        this._vy = data.vy;
        this._size = data.size;
        this._color = data.color;
        this._area = data.area;
        this._sides = data.sides;
    }

    get id(): string {
        return this._id;
    }

    get type(): ShapeType {
        return this._type;
    }

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    get rotation(): number {
        return this._rotation;
    }

    get vx(): number {
        return this._vx;
    }

    get vy(): number {
        return this._vy;
    }

    get size(): number {
        return this._size;
    }

    get color(): number {
        return this._color;
    }

    get area(): number {
        return this._area;
    }

    get sides(): number | undefined {
        return this._sides;
    }

    set x(value: number) {
        this._x = value;
    }

    set y(value: number) {
        this._y = value;
    }

    set vy(value: number) {
        this._vy = value;
    }

    set rotation(value: number) {
        this._rotation = value;
    }

    update(deltaTime: number, gravity: number): void {
        this._vy += gravity * deltaTime;
        this._x += this._vx * deltaTime;
        this._y += this._vy * deltaTime;
        this._rotation += 0.5 * deltaTime;
    }

    toData(): IShapeData {
        return {
            id: this._id,
            type: this._type,
            x: this._x,
            y: this._y,
            rotation: this._rotation,
            vx: this._vx,
            vy: this._vy,
            size: this._size,
            color: this._color,
            area: this._area,
            sides: this._sides
        };
    }
}

