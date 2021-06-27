import { useState, useEffect, useMemo } from 'react';
export const ITEMS_PER_PAGE = 5;

function usePagination(data, itemsPerPage = ITEMS_PER_PAGE) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (data.length === 0) {
      setCurrentPage(0);
      return;
    }
    setCurrentPage(1);
  }, [data]);

  const maxPage = data.length ? Math.ceil(data.length / itemsPerPage) : 0;
  const currentData = useMemo(() => {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data.slice(begin, end);
  }, [data, itemsPerPage, currentPage]);

  const canPrevious = currentPage > 1;
  const canNext = currentPage < maxPage;

  function next() {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  }
  function prev() {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  }
  function jump(page) {
    const pageNumber = Math.max(1, page);
    setCurrentPage(() => Math.min(pageNumber, maxPage));
  }

  return { next, prev, jump, currentData, currentPage, maxPage, canPrevious, canNext };
}

export default usePagination;
