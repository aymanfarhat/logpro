import {DataModule} from './data.module.js';

let dataModule = new DataModule();

console.log(dataModule.getData());

export class AppModule {
    constructor(private _dataModule: DataModule) { 
        console.log(_dataModule.getData());
    }
}
