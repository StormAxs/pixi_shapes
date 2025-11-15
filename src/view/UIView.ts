export class UIView {
    private countElement: HTMLElement;
    private areaElement: HTMLElement;
    private spawnRateElement: HTMLElement;
    private gravityElement: HTMLElement;
    private spawnDecreaseBtn: HTMLElement;
    private spawnIncreaseBtn: HTMLElement;
    private gravityDecreaseBtn: HTMLElement;
    private gravityIncreaseBtn: HTMLElement;

    private rainbowToggle: HTMLInputElement; // ⭐ добавлено

    constructor() {
        this.countElement = document.getElementById('count-shapes')!;
        this.areaElement = document.getElementById('area-shapes')!;
        this.spawnRateElement = document.getElementById('spawn-rate')!;
        this.gravityElement = document.getElementById('gravity')!;
        this.spawnDecreaseBtn = document.getElementById('spawn-decr')!;
        this.spawnIncreaseBtn = document.getElementById('spawn-incr')!;
        this.gravityDecreaseBtn = document.getElementById('grav-decr')!;
        this.gravityIncreaseBtn = document.getElementById('grav-incr')!;

        this.rainbowToggle = document.getElementById('rainbow-toggle') as HTMLInputElement; // ⭐
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
        this.spawnDecreaseBtn.addEventListener('click', callback);
    }

    onSpawnIncrease(callback: () => void): void {
        this.spawnIncreaseBtn.addEventListener('click', callback);
    }

    onGravityDecrease(callback: () => void): void {
        this.gravityDecreaseBtn.addEventListener('click', callback);
    }

    onGravityIncrease(callback: () => void): void {
        this.gravityIncreaseBtn.addEventListener('click', callback);
    }

    onRainbowToggle(callback: (enabled: boolean) => void): void {
        this.rainbowToggle.addEventListener('change', () => {
            callback(this.rainbowToggle.checked);
        });
    } //funn;3
}
