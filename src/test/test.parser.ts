import { describe, it } from 'node:test';
import { parseToObj } from '../parser';
import assert from "node:assert";

describe('parseToObj function', () => {
    it('it should parse a simple URL string', () => {
        const url = 'fields[currency]=id,code,amount&filter[empty]=&page[number]=1&page[size]=10';
        const result = parseToObj(url);
        assert.deepStrictEqual(result, {
            fields: {
                currency: ['id', 'code', 'amount'],
            },
            filter: {
                empty: '',
            },
            page: {
                number: '1',
                size: '10',
            },
        });
    });

    it('it should handle complex URL string', () => {
        const url = 'fields[currency]=id,code,amount&filter[empty]=&filter[price.amount][from]=1440&filter[price.amount][to]=6000&page[number]=1&page[size]=10';
        const result = parseToObj(url);
        assert.deepStrictEqual(result, {
            fields: {
                currency: ['id', 'code', 'amount'],
            },
            filter: {
                empty: '',
                'price.amount': {
                    from: '1440',
                    to: '6000',
                },
            },
            page: {
                number: '1',
                size: '10',
            },
        });
    });

});
