export class Request {
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
