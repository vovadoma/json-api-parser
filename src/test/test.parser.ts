import { describe, it } from 'node:test';
import { parseToObj } from '../parser';
import assert from "node:assert";

describe('parseToObj function', () => {
    it('fields', () => {
        const url = 'fields[currency]=id,code,amount&fields[item]=id,name,price.amount';
        const result = parseToObj(url);
        assert.deepStrictEqual(result, {
            fields: {
                currency: ['id', 'code', 'amount'],
                item: ['id', 'name', 'price.amount']
            }
        });
    });

    it('filters', () => {
        const url = [
            'filter[empty]=',
            'filter[request-type]=1',
            'filter[name]=Tod',
            'filter[status][in]=draft,approved,rejected',
            'filter[age][lte]=21',
            'filter[age][gt]=18',
            'filter[price.amount][from]=1440&filter[price.amount][to]=6000',
            'filter[submit-date][between]=2023-10-04,2023-10-10',
            'filter[item.price][between]=200.15,500.50',
            'filter[currency.name][like]=%euro%',
        ].join('&');
        const result = parseToObj(url);
        assert.deepStrictEqual(result, {
            filter: {
                'currency.name': {
                    like: '%euro%',
                },
                'item.price': {
                    between: [200.15, 500.5],
                },
                'price.amount': {
                    from: 1440,
                    to: 6000,
                },
                'request-type': 1,
                'submit-date': {
                    between: [2023, 2023],
                },
                age: {
                    gt: 18,
                    lte: 21,
                },
                empty: '',
                name: 'Tod',
                status: {
                    in: ['draft', 'approved', 'rejected'],
                },
            }
        });
    });

    it('sort', () => {
        const url = 'sort=status,-price.start-amount';
        const result = parseToObj(url);
        assert.deepStrictEqual(result, {
            sort: {
                status: 'asc',
                'price.start-amount': 'desc',
            },
        });
    });

    it('page', () => {
        const url = 'page[number]=1&page[size]=10';
        const result = parseToObj(url);
        assert.deepStrictEqual(result, {
            page: {
                number: 1,
                size: 10,
            },
        });
    });
});
