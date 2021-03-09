import React from 'react';

function findMatch(keys, query, item) {
  const match = keys.current.find((key) => {
    if (typeof item[key] === 'string') {
      return item[key].toLowerCase().includes(query.toLowerCase());
    }
    if (item[key] instanceof Array) {
      return item[key].some(({ label }) =>
        String(label)?.toLowerCase().includes(query.toLowerCase()),
      );
    }
    return false;
  });
  return match;
}

export default function useFiltersData({ keys = [], query = '', data }) {
  const filteredData = React.useMemo(() => {
    if (!query) return data;
    return data.filter((item) => findMatch(keys, query, item));
  }, [data, query, keys]);
  return filteredData;
}
