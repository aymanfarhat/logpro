import {Request} from './request.js';

export class DataModule extends Request {

    static sampleDataUrl: string;
    static accessLogLinePattern: string;

    constructor () {
        this.sampleDataUrl = 'https://gist.githubusercontent.com/aymanfarhat/4f6136ae457358c04708/raw/c8198a23b270825bf0420dc744fed90471eb750e/sample_access.log';
        this.accessLogLinePattern = /(\S+) (\S) (.*?) \[(.*)\] "(\S+) (\S+) (\S+)" ([0-9]+) ([0-9]+|-) "(.*)" "(.*)"/;
    }

    getSampleData(resolve, reject) {
        return this.get(this.sampleDataUrl, resolve, reject);         
    }

    parseAccessLogData(rawText) {
        let lines : Array = rawText.split('\n'),
            data : Array = [],
            lineResult : Array = [];

        for (let line of lines) {
            lineResult = this.accessLogLinePattern.exec(line);

            if (lineResult !== null && lineResult.length > 0) {
                data.push({
                    'ip': lineResult[1],
                    'identd': lineResult[2],
                    'userid': lineResult[3],
                    'time': lineResult[4],
                    'method': lineResult[5],
                    'resource': lineResult[6],
                    'protocol': lineResult[7],
                    'statusCode': lineResult[8],
                    'responseSize': lineResult[9],
                    'referrer': lineResult[10],
                    'userAgent': lineResult[11]
                });
            }
        }

        return data;
    }
}
