import {Request} from './request.js';

export class DataModule extends Request {

    static sampleDataUrl: string;
    static accessLogLinePattern: string;
    static dataCache: Array;

    constructor (appConfig: Object) {
        this.sampleDataUrl = appConfig.sampleDataRemote;
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

        this.dataCache = data;

        return data;
    }

    filterDataCache(criteria) {
        let columns = Object.keys(criteria);
            dataRows = this.dataCache,
            results = [];

        dataRows.forEach((row) => {
            for (column of columns) {
                if (!row[column].includes(criteria[column])  {
                    return;
                }
            }

            results.push(row);
        });

        return results;
    }
}
