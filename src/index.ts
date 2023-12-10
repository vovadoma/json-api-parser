import {parseToObj, buildSql} from './parser';

const url1 = '' +
    'fields[currency]=id,code,amount' +

    '&filter[empty]=' +
    '&filter[price.amount][from]=1440' +
    '&filter[price.amount][to]=6000' +
    '&filter[age][lte]=21' +
    '&filter[currency.name][like]=%euro%' +
    '&filter[requestType]=1' +
    '&filter[status][in]=draft,approved,rejected' +
    '&filter[submit-date][between]=2023-10-04,2023-10-10' +
    '&filter[item.price][between]=200.15,500.50' +

    '&page[number]=1&page[size]=10' +
    '&sort=status,-price.start-amount';

const sqlObj = parseToObj(url1);
const sql = buildSql(sqlObj);

console.log(sqlObj);
console.log(sql);
