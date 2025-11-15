import { AppController } from './controller/AppController';
import * as config from "./config";
import { ROOTCONFIG } from "./config";
document.documentElement.style.setProperty("--bg", ROOTCONFIG.BG);



let appController: AppController | null = null;

function init(): void {
    const appRoot = document.getElementById('app-root');
    if (!appRoot) {
        console.error('App root element not found');
        return;
    } //TODO: not sure if i have to left it here, as we always have app-root, delete mayb

    appController = new AppController(
        config.CANVAS_WIDTH,
        config.CANVAS_HEIGHT,
        config.RECTANGLE_X,
        config.RECTANGLE_Y,
        config.RECTANGLE_WIDTH,
        config.RECTANGLE_HEIGHT
    );

    const canvas = appController.getCanvas();
    appRoot.appendChild(canvas);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

window.addEventListener('beforeunload', () => {
    if (appController) {
        appController.destroy();
    }
});

