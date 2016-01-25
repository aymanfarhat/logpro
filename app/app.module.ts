import {DataModule} from './data.module.js';

export class AppModule {
    constructor() { 
        let dataModule = new DataModule(),
            uiModule  = new UIModule();
    }
}

export class UIModule {
    sampleDataBtn : HTMLElement;

    constructor() { 
        this.sampleDataBtn = document.getElementById('fetchSampleDataBtn');

        this.sampleDataBtn.addEventListener('click', function (e) {
            let dataModule = new DataModule();

            dataModule.getSampleData().then(function(response) {
                console.log(response);
            }, function (error) {
                console.log(error);
            });
        });
    }
}

let app = new AppModule();
