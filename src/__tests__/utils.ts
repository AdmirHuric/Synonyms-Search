import { queryByAttribute } from '@testing-library/react';

const getById = queryByAttribute.bind(null, 'id');

export { getById };
