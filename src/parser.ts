import querystring from 'node:querystring';


const combineValues = (strValue: string, key: string, firstLevelKey: string) => {
    const combines: Record<string, any> = {
        filter: () => {
            const value = (strValue as string || '').split(',');
            return value.length > 1 ? (['between', 'in'].includes(key) ? value : {in: value}) : value[0];
        },
        fields: () => {
            return (strValue as string || '').split(',');
        }
    };
    return combines[firstLevelKey] ? combines[firstLevelKey]() : strValue;
}

const parseToObj = (url: string): Record<string, any> => {
    const queryParams = querystring.parse(url);

    return Object.keys(queryParams).reduce((output, queryKey) => {
        queryKey.split('[')
            .map(k => k.replace(']', ''))
            .filter(key => key)
            .reduce((obj: any, key, index, keys) => {
                if (keys.length === (index + 1)) {
                    if (typeof (obj) === 'string') throw new Error('Wrong query string params for: ' + keys[index - 1]);
                    obj[key] = combineValues(queryParams[queryKey] as string, key, keys[0]);
                    return obj;
                }
                if (!obj[key]) obj[key] = {};
                return obj[key];
            }, output);
        return output;
    }, {});
}

export { parseToObj };
