import {DataModule} from './data.module.js';
import {ViewsModule} from './views.module.js';

export class UIModule {
    elements: Object;
    dataColumns: Object;

    constructor(appConfig: Object, dataService: DataModule) { 
        this.dataService = dataService;
        this.viewsModule = new ViewsModule();

        this.dataColumns = appConfig.dataTableColumns;
        this.dataQuery = {};

        this.elements = this.registerElements([
            'sampleDataBtn',
            'introContainer',
            'dataContainer',
            'filtersContainer'
        ]);

        this.registerEvents();
    }

    private registerElements(elementIds) {
        let elements = [];

        elementIds.forEach((element, index) => {
            elements[element] = document.getElementById(element);
        });

        return elements;
    };

    private registerEvents() {
        this.elements.sampleDataBtn.addEventListener('click', this.dataBtnClick.bind(this));
        this.on(document, '.filterElement', 'input', this.updateDataQuery.bind(this));
    }

    private updateDataQuery(event) {
        let element = event.target;

        this.dataQuery[element.getAttribute('id')] = element.value;

        let updatedData = this.dataService.filterDataCache(this.dataQuery);
        this.renderDataView(updatedData);
    }

    private toggleDataView(state: Boolean) {
        this.elements.introContainer.style.display = (state) ? 'none' : 'block';
        this.elements.dataContainer.style.display = (state) ? 'block' : 'none';
    }

    private dataBtnClick() {
        this.dataService.getSampleData().then((response) => {
            let parsedLog = this.dataService.parseAccessLogData(response);

            this.renderFiltersView();
            this.renderDataView(parsedLog);

            this.toggleDataView(true);
        }, function (error) {
            console.log(error);
        });
    }

    private renderDataView(data) {
        this.elements.dataContainer.innerHTML = this.viewsModule.renderDataTable(data, this.dataColumns);
    }

    private renderFiltersView() {
        this.elements.filtersContainer.innerHTML = this.viewsModule.renderFilterForm(this.dataColumns);
    }

    private on(parent, selector, action, callback) {
        parent.addEventListener(action, (event) => {
            let selectorType = selector.substring(0, 1),
                selectorName = selector.substring(1, selector.length);

            if (selectorType === '#') {
                let idAttr = event.target.getAttribute('id');

                if (selectorName === idAttr) {
                    callback.call(event.target, event);
                }
            } else if (selectorType === '.') {
                let classAttr = event.target.getAttribute('class').split(' ');

                if (classAttr.indexOf(selectorName) > 0) {
                    callback.call(event.target, event);
                }
            } else {
                let elementTagName = event.target.tagName.toLowerCase();

                if (selector === elementTagName) {
                    callback.call(event.target, event);
                }
            }
        });
    }
}
