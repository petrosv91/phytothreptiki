import React, { useState, useEffect, memo } from 'react';
function ProductListItem({ handleClick, DisplayFields, item }) {
  const [stringsArray, setstringsArray] = useState('');
  function handleClickParent() {
    handleClick(item);
  }
  useEffect(() => {
    function createString(dFields, item) {
      let array = [];
      for (let field = 0; field < dFields.length; field++) {
        array.push(<div key={field}>{item[dFields[field]]}</div>);
      }
      return array;
    }
    const dFields = DisplayFields.split(',');
    setstringsArray(createString(dFields, item));
  }, [DisplayFields, item]);
  return (
    <div onClick={handleClickParent} className="list-item">
      <div className="list-item-fields">{stringsArray}</div>
    </div>
  );
}

export default memo(ProductListItem);
