export const CANVAS_WIDTH = 1000;
export const CANVAS_HEIGHT = 600;
export const RECTANGLE_X = 0;
export const RECTANGLE_Y = 0;
export const RECTANGLE_WIDTH = 1000;
export const RECTANGLE_HEIGHT = 600;

export const DOM = {
    appRoot: 'app-root',
    countShapes: 'count-shapes',
    areaShapes: 'area-shapes',
    spawnRate: 'spawn-rate',
    gravity: 'gravity',
    spawnDecrease: 'spawn-decr',
    spawnIncrease: 'spawn-incr',
    gravityDecrease: 'grav-decr',
    gravityIncrease: 'grav-incr',
    rainbowToggle: 'rainbow-toggle'
} as const;

export const EVENT = {
    domContentLoaded: 'DOMContentLoaded',
    beforeUnload: 'beforeunload',
    click: 'click',
    change: 'change'
} as const

export const DOCUMENT_READY_STATES = {
    loading: 'loading'
} as const;

export const CSS_VARIABLES = {
    background: '--bg'
} as const;

