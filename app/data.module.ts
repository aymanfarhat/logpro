class Request {
    get(url, resolve, reject) {
        return new Promise(function (resolve, reject) {
            let request = new XMLHttpRequest();

            request.open('GET', url, true);

            request.onload = function() {
                if (request.status >= 200 && request.status < 400) {
                    resolve(request.response);
                } else {
                    reject(request.statusText);
                }
            };

            request.onerror = function() {
                reject(Error('network error'));
            };

            request.send();
        });
   } 
}

export class DataModule extends Request {

    static sampleDataUrl : string;

    constructor () {
        this.sampleDataUrl = 'https://gist.githubusercontent.com/aymanfarhat/4f6136ae457358c04708/raw/c8198a23b270825bf0420dc744fed90471eb750e/sample_access.log';
    }

    getSampleData(resolve, reject) {
        return this.get(this.sampleDataUrl, resolve, reject);         
    }
}
