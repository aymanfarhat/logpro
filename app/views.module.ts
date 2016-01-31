export class ViewsModule {
    renderDataTable (data: Array, columns: Object) {
        let bodyOutput = '',
            headOutput = '';

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

        return `<table class="table table-striped">
                    <thead> 
                        <tr> 
                            ${headOutput}
                        </tr> 
                    </thead> 
                    <tbody>
                        ${bodyOutput}
                    </tbody>
                </table>`;
    };

    renderFilterForm (columns: Object) { 
        let bodyOutput = '';

        for (colKey in columns) {
            bodyOutput += 
                `<div class="form-group">
                    <label for="${colKey}">${columns[colKey]}</label>
                    <input type="text" class="form-control" id="${colKey}" data-column="${colKey}" placeholder="${columns[colKey]}">
                </div>`;
        }

        return bodyOutput;
    };
}
