import process from "node:process";
import url from 'node:url';
import querystring from 'node:querystring';

const url1 = 'fields[price]=id,code,amount&filter[price.amount][equ]=100&filter[price.amount][from]=1440&filter[price.amount][to]=6000&filter[age]=21&filter[requestType]=1&filter[status]=draft,approved,rejected&filter[submit-date][between]=2023-10-04,2023-10-10&page[number]=1&page[size]=10';

const queryParams = querystring.parse(url1);

const result = Object.keys(queryParams).reduce((output, queryKey) => {
    queryKey.split('[')
        .map(k => k.replace(']', ''))
        .filter(key => key)
        .reduce((obj, key, index, keys) => {
            if (keys.length === (index + 1)) {
                obj[key] = queryParams[queryKey];
                return obj;
            }
            if (!obj[key]) obj[key] = {};
            return obj[key];
        }, output as Record<string, any>);
    return output;
}, {});


console.log(queryParams);
console.log(result);
