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

    private toggleDataView(state: Boolean) {
        this.introContainer.style.display = (state) ? 'none' : 'block';
        this.dataContainer.style.display = (state) ? 'block' : 'none';
    };

    private renderDataTable(data: Array) {
        let templateOutput = '';

        for (logRow of data) {
            templateOutput += 
                `<tr> 
                    <td>${logRow.ip}</td> 
                    <td>${logRow.method}</td> 
                    <td>${logRow.time}</td> 
                </tr> `;
        }

        this.dataContainer.innerHTML = 
            `<table class="table table-striped">
                <thead> 
                    <tr> 
                        <th>IP</th> 
                        <th>Method</th> 
                        <th>Time</th> 
                    </tr> 
                </thead> 
                <tbody>
                    ${templateOutput}
                </tbody>
            </table>`;
    }

    private dataBtnClick() {
        this.dataService.getSampleData().then((response) => {
            let parsedLog = this.dataService.parseAccessLogData(response);

            this.toggleDataView(true);
            this.renderDataTable(parsedLog);

        }, function (error) {
            console.log(error);
        });
    };
}
