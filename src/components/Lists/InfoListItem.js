import React from 'react';
function InfoListItem({ index, active, item, changeActiveIndex }) {
  const handleClick = () => {
    if (active) changeActiveIndex(-1);
    else changeActiveIndex(index);
  };

  return (
    <div onClick={handleClick} className="info-list-item">
      <div
        className={
          active ? 'info-list-item-inner-active' : 'info-list-item-inner'
        }
      >
        <div className="info-list-item-front">{item.front}</div>
        <div className="info-list-item-back">{item.back}</div>
      </div>
    </div>
  );
}
export default React.memo(InfoListItem);
