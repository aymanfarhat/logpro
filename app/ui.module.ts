import {DataModule} from './data.module.js';
import {ViewsModule} from './views.module.js';

export class UIModule {
    elements: Object;
    dataColumns: Object;

    constructor(appConfig: Object, dataService: DataModule) { 
        this.dataService = dataService;
        this.viewsModule = new ViewsModule();

        this.dataColumns = appConfig.dataTableColumns;

        this.registerElements([
            'sampleDataBtn',
            'introContainer',
            'dataContainer',
            'filtersContainer'
        ]);

        this.registerEvents();
    }

    private registerElements(elementIds) {
        for (element of elementIds) {
            this.elements[element] = document.getElementById('sampleDataBtn');
        }
    };

    private registerEvents() {
        this.elements.sampleDataBtn.addEventListener('click', this.dataBtnClick.bind(this));
    }

    private toggleDataView(state: Boolean) {
        this.elements.introContainer.style.display = (state) ? 'none' : 'block';
        this.elements.dataContainer.style.display = (state) ? 'block' : 'none';
    };

    private dataBtnClick() {
        this.dataService.getSampleData().then((response) => {
            let parsedLog = this.dataService.parseAccessLogData(response);

            this.toggleDataView(true);

            this.elements.dataContainer.innerHTML = this.viewsModule.renderDataTable(parsedLog, this.dataColumns);
            this.elements.filtersContainer.innerHTML = this.viewsModule.renderFilterForm(this.dataColumns);
        }, function (error) {
            console.log(error);
        });
    };
}
