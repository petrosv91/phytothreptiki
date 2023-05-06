import { useMemo } from 'react';

function validate(item, query) {
  if (typeof item === 'string' || typeof item === 'number') {
    return String(item).toLowerCase().includes(query.toLowerCase());
  }
  if (item instanceof Object) {
    return String(item.label).toLowerCase().includes(query.toLowerCase());
  }
  return false;
}

function findMatch(keys, query, item) {
  return keys.current.find((key) => {
    if (item[key] instanceof Array) {
      return item[key].join('-').includes(query.toLowerCase());
    }
    return validate(item[key], query);
  });
}

export default function useFiltersData({ keys = [], query = '', data }) {
  const filteredData = useMemo(() => {
    if (!query) return data;
    return data.filter((item) => findMatch(keys, query, item));
  }, [data, query, keys]);
  return filteredData;
}
