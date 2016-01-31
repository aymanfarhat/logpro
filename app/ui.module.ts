import {DataModule} from './data.module.js';
import {ViewsModule} from './views.module.js';

export class UIModule {
    sampleDataBtn : HTMLElement;
    introContainer: HTMLElement;
    dataContainer: HTMLElement;
    dataColumns: Object;

    constructor(dataService: DataModule) { 
        this.sampleDataBtn = document.getElementById('fetchSampleDataBtn');
        this.introContainer = document.getElementById('introContainer');
        this.dataContainer = document.getElementById('dataContainer');
        this.dataService = dataService;
        this.viewsModule = new ViewsModule();

        this.dataColumns = {
                'ip': 'IP',
                'method': 'Method',
                'time': 'Date / Time',
                'userAgent': 'User Agent'
            };

        this.sampleDataBtn.addEventListener('click', this.dataBtnClick.bind(this));
    }

    private toggleDataView(state: Boolean) {
        this.introContainer.style.display = (state) ? 'none' : 'block';
        this.dataContainer.style.display = (state) ? 'block' : 'none';
    };

    private dataBtnClick() {
        this.dataService.getSampleData().then((response) => {
            let parsedLog = this.dataService.parseAccessLogData(response);

            this.toggleDataView(true);

            this.dataContainer.innerHTML = this.viewsModule.renderDataTable(parsedLog, this.dataColumns);

        }, function (error) {
            console.log(error);
        });
    };
}
