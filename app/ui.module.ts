import {DataModule} from './data.module.js';

export class UIModule {
    sampleDataBtn : HTMLElement;
    introContainer: HTMLElement;
    dataContainer: HTMLElement;

    constructor(dataService: DataModule) { 
        this.sampleDataBtn = document.getElementById('fetchSampleDataBtn');
        this.introContainer = document.getElementById('introContainer');
        this.dataContainer = document.getElementById('dataContainer');
        this.dataService = dataService;

        this.sampleDataBtn.addEventListener('click', this.dataBtnClick.bind(this));
    }

    toggleDataView(state: Boolean) {
        this.introContainer.style.display = (state) ? 'none' : 'block';
        this.dataContainer.style.display = (state) ? 'block' : 'none';
    };

    renderDataTable(data: Array) {
        console.log(data); 
    }

    dataBtnClick() {
        this.dataService.getSampleData().then((response) => {
            let parsedLog = this.dataService.parseAccessLogData(response);

            this.toggleDataView(true);
            this.renderDataTable(parsedLog);

        }, function (error) {
            console.log(error);
        });
    };
}
