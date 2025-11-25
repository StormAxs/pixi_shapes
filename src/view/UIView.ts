import {DOM, EVENT} from "../constants/ui";

export class UIView {
    private countElement: HTMLElement;
    private areaElement: HTMLElement;
    private spawnRateElement: HTMLElement;
    private gravityElement: HTMLElement;
    private spawnDecreaseBtn: HTMLElement;
    private spawnIncreaseBtn: HTMLElement;
    private gravityDecreaseBtn: HTMLElement;
    private gravityIncreaseBtn: HTMLElement;

    private rainbowToggle: HTMLInputElement;

    constructor() {
        this.countElement = document.getElementById(DOM.countShapes)!;
        this.areaElement = document.getElementById(DOM.areaShapes)!;
        this.spawnRateElement = document.getElementById(DOM.spawnRate)!;
        this.gravityElement = document.getElementById(DOM.gravity)!;
        this.spawnDecreaseBtn = document.getElementById(DOM.spawnDecrease)!;
        this.spawnIncreaseBtn = document.getElementById(DOM.spawnIncrease)!;
        this.gravityDecreaseBtn = document.getElementById(DOM.gravityDecrease)!;
        this.gravityIncreaseBtn = document.getElementById(DOM.gravityIncrease)!;

        this.rainbowToggle = document.getElementById(DOM.rainbowToggle) as HTMLInputElement;
    }

    updateShapeCount(count: number): void {
        this.countElement.textContent = count.toString();
    }

    updateTotalArea(area: number): void {
        this.areaElement.textContent = area.toString();
    }

    updateSpawnRate(rate: number): void {
        this.spawnRateElement.textContent = rate.toString();
    }

    updateGravity(gravity: number): void {
        this.gravityElement.textContent = Math.round(gravity).toString();
    }

    onSpawnDecrease(callback: () => void): void {
        this.spawnDecreaseBtn.addEventListener(EVENT.click, callback);
    }

    onSpawnIncrease(callback: () => void): void {
        this.spawnIncreaseBtn.addEventListener(EVENT.click, callback);
    }

    onGravityDecrease(callback: () => void): void {
        this.gravityDecreaseBtn.addEventListener(EVENT.click, callback);
    }

    onGravityIncrease(callback: () => void): void {
        this.gravityIncreaseBtn.addEventListener(EVENT.click, callback);
    }

    onRainbowToggle(callback: (enabled: boolean) => void): void {
        this.rainbowToggle.addEventListener(EVENT.change, () => {
            callback(this.rainbowToggle.checked);
        });
    }
}
