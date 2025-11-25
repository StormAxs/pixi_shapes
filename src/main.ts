import * as config from "./constants/config";
import * as ui from "./constants/ui";

import { AppController } from './controller/AppController';
import { ROOTCONFIG } from "./constants/config";
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
        ui.CANVAS_WIDTH,
        ui.CANVAS_HEIGHT,
        ui.RECTANGLE_X,
        ui.RECTANGLE_Y,
        ui.RECTANGLE_WIDTH,
        ui.RECTANGLE_HEIGHT
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

