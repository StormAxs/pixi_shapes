import { AppController } from './controller/AppController';
import * as config from "./config";
import { ROOTCONFIG } from "./config";
import { CSS_VARIABLES, DOM, DOCUMENT_READY_STATES, EVENT } from "./constants/ui";
document.documentElement.style.setProperty(CSS_VARIABLES.background, ROOTCONFIG.BG);



let appController: AppController | null = null;

function init(): void {
    const appRoot = document.getElementById(DOM.appRoot);
    if (!appRoot) {
        console.error('App root element not found');
        return;
    }

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

if (document.readyState === DOCUMENT_READY_STATES.loading) {
    document.addEventListener(EVENT.domContentLoaded, init);
} else {
    init();
}

window.addEventListener(EVENT.beforeUnload, () => {
    if (appController) {
        appController.destroy();
    }
});

