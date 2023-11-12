import {parseToObj} from './json.api.parser/parser';

const url1 = 'fields[currency]=id,code,amount&filter[empty]=&filter[price.amount][from]=1440&filter[price.amount][to]=6000&filter[age][lte]=21&filter[requestType]=1&filter[status][in]=draft,approved,rejected&filter[submit-date][between]=2023-10-04,2023-10-10&page[number]=1&page[size]=10';
const sql = parseToObj(url1);
console.log(sql);
