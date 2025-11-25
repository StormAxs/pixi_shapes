import { ShapeManager } from '../model/ShapeManager';
import { PixiView } from '../view/PixiView';
import { UIView } from '../view/UIView';
import { EVENT } from "../constants/ui";

export class AppController {
    private shapeManager: ShapeManager;
    private pixiView: PixiView;
    private uiView: UIView;
    private lastTime: number = 0;
    private animationFrameId: number = 0;

    private rainbowEnabled: boolean = false;

    constructor(
        canvasWidth: number,
        canvasHeight: number,
        rectangleX: number,
        rectangleY: number,
        rectangleWidth: number,
        rectangleHeight: number
    ) {
        this.shapeManager = new ShapeManager(rectangleX, rectangleY, rectangleWidth, rectangleHeight);
        
        this.pixiView = new PixiView(canvasWidth, canvasHeight, rectangleX, rectangleY, rectangleWidth, rectangleHeight);
        this.uiView = new UIView();
        
        this.setupEventListeners();
        this.start();
    }

    private setupEventListeners(): void { //click
        this.pixiView.getCanvas().addEventListener(EVENT.click, (e) => {
            const rect = this.pixiView.getCanvas().getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const shapeId = this.pixiView.getShapeAt(x, y);
            if (shapeId) {
                if (shapeId) {
                    const shape = this.shapeManager.getShapes().find(s => s.id === shapeId);
                    if (shape) {
                        const type = shape.type;
                        this.shapeManager.removeShape(shapeId);

                        const newColor = Math.random() * 0xffffff;
                        this.shapeManager.changeColorByType(type, newColor);
                    }
                    return;
                }
            }
            
            if (this.shapeManager.isPointInRectangle(x, y)) {
                this.shapeManager.createRandomShape(x, y);
            }
        });


        this.uiView.onSpawnDecrease(() => {
            const current = this.shapeManager.getSpawnRate();
            this.shapeManager.setSpawnRate(Math.max(0, current - 1));
            this.uiView.updateSpawnRate(this.shapeManager.getSpawnRate());
        });

        this.uiView.onSpawnIncrease(() => {
            const current = this.shapeManager.getSpawnRate();
            this.shapeManager.setSpawnRate(current + 1);
            this.uiView.updateSpawnRate(this.shapeManager.getSpawnRate());
        });

        this.uiView.onGravityDecrease(() => {
            const current = this.shapeManager.getGravity();
            this.shapeManager.setGravity(Math.max(0, current - 50));
            this.uiView.updateGravity(this.shapeManager.getGravity());
        });

        this.uiView.onGravityIncrease(() => {
            const current = this.shapeManager.getGravity();
            this.shapeManager.setGravity(current + 50);
            this.uiView.updateGravity(this.shapeManager.getGravity());
        });

        this.uiView.onRainbowToggle((enabled) => {
            this.rainbowEnabled = enabled;
        });
    }

    private start(): void {
        this.lastTime = performance.now() / 1000;
        this.animate();
    }

    private animate = (): void => {
        const currentTime = performance.now() / 1000;
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        this.shapeManager.update(deltaTime, this.rainbowEnabled);

        const shapes = this.shapeManager.getShapes();
        this.pixiView.renderShapes(shapes);
        this.uiView.updateShapeCount(this.shapeManager.getShapeCount());
        this.uiView.updateTotalArea(this.shapeManager.getTotalArea());

        this.animationFrameId = requestAnimationFrame(this.animate);
    };

    getCanvas(): HTMLCanvasElement {
        return this.pixiView.getCanvas();
    }

    destroy(): void {
        cancelAnimationFrame(this.animationFrameId);
        this.pixiView.destroy();
    }
}

