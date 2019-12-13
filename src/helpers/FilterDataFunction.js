//function to handle search and filter results
const filterFunction = (str, searc_str) => {
  //find match between user input and item to compare with
  const result = str.toLowerCase().startsWith(searc_str.toLowerCase());
  return result;
};
//function to filter data based on value
const FilterDataFunction = (data, value, dFields) => {
  let filterDataArray = [];

  data.forEach(item => {
    for (let df = 0; df < dFields.length; df++) {
      const possible = item[dFields[df]];
      let result = filterFunction(possible, value);
      if (result) {
        filterDataArray.push(item);
        break;
      }
    }
  });
  return filterDataArray;
};
export default FilterDataFunction;
