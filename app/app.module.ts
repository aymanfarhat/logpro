import {DataModule} from './data.module.js';
import {UIModule} from './ui.module.js';
import {Request} from './request.js';

export class AppModule {
    constructor() { 
        let appConfig = {
            dataTableColumns: {
                'ip': 'IP',
                'method': 'Method',
                'time': 'Date / Time',
                'userAgent': 'User Agent',
                'referrer': 'Referrer',
                'statusCode': 'Status'
            },
            sampleDataRemote: 'https://gist.githubusercontent.com/aymanfarhat/4f6136ae457358c04708/raw/c8198a23b270825bf0420dc744fed90471eb750e/sample_access.log'
        };

        let dataModule = new DataModule(appConfig),
            uiModule  = new UIModule(appConfig, dataModule);
    }
}

let app = new AppModule();
