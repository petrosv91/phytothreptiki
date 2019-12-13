import FilterDataFunction from '../helpers/FilterDataFunction';
import { useState } from 'react';
const usePaginate = ({ data, value, dFields }) => {
  const { RECORDS_PER_PAGE } = window['runConfig'];
  let filteredData;
  if (dFields.length > 0)
    filteredData = FilterDataFunction(data, value, dFields);
  else filteredData = data;
  const [currentPage, setCurrentPage] = useState(1);
  let numberOfPages;
  if (filteredData.length <= RECORDS_PER_PAGE) numberOfPages = 0;
  else if (filteredData.length % RECORDS_PER_PAGE === 0) {
    numberOfPages = Math.floor(filteredData.length / RECORDS_PER_PAGE);
  } else {
    numberOfPages = Math.floor(filteredData.length / RECORDS_PER_PAGE) + 1;
  }
  const changePage = newPage => {
    setCurrentPage(newPage);
  };
  const indexOfLastRecord = currentPage * RECORDS_PER_PAGE;
  const indexOfFirstRecord = indexOfLastRecord - RECORDS_PER_PAGE;
  const page = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);

  return { page, numberOfPages, changePage, currentPage };
};
export default usePaginate;
