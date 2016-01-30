import {DataModule} from './data.module.js';
import {UIModule} from './ui.module.js';
import {Request} from './request.js';

export class AppModule {
    constructor() { 
        let dataModule = new DataModule(),
            uiModule  = new UIModule(dataModule);
    }
}

let app = new AppModule();
