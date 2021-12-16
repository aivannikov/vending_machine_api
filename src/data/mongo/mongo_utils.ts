import _ from 'lodash';

const createOrUpdateExpression = (key: string, value: string | number, filterObject:any = {}) => {
    filterObject[key] = value;
    return filterObject;
}

export { createOrUpdateExpression }
    