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
        let bodyOutput = '',
            headOutput = '',
            columns = {
                'ip': 'IP',
                'method': 'Method',
                'time': 'Date / Time',
                'userAgent': 'User Agent'
            };

        for (colKey in columns) {
            headOutput += `<th>${columns[colKey]}</th>`;
        }

        for (logRow of data) {
            let row = '';

            for (colKey in columns) {
                if (logRow.hasOwnProperty(colKey)) {
                    row += `<td>${logRow[colKey]}</td>`;
                }
            }

            bodyOutput += `<tr>${row}</tr>`; 
        }

        this.dataContainer.innerHTML = 
            `<table class="table table-striped">
                <thead> 
                    <tr> 
                        ${headOutput}
                    </tr> 
                </thead> 
                <tbody>
                    ${bodyOutput}
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
