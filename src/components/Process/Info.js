import React, { useState, useCallback } from 'react';
import AnimateHeight from 'react-animate-height';
import InfoListItem from '../Lists/InfoListItem';
import '../../styles/Process/info.css';
import InfoIcon from '@material-ui/icons/Info';
const data = [
  { front: 'front-1', back: 'back-1' },
  { front: 'front-2', back: 'back-2' },
  { front: 'front-3', back: 'back-3' },
  { front: 'front-4', back: 'back-4' }
];
export default function Info() {
  const [height, setHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);
  const toggle = () => {
    setHeight(height === 0 ? 'auto' : 0);
    changeActiveIndex(-1);
  };

  const changeActiveIndex = useCallback(
    newIndex => {
      setActiveIndex(newIndex);
    },
    [setActiveIndex]
  );

  return (
    <>
      <InfoIcon className="info-icon" onClick={toggle}>
        Info
      </InfoIcon>
      <AnimateHeight
        style={{
          left: 0,
          width: '100vw',
          background: 'white',
          position: 'absolute',
          zIndex: 3
        }}
        duration={500}
        height={height} // see props documentation below
      >
        <div className="info-container">
          <h2>ΠΛΗΡΟΦΟΡΙΕΣ</h2>
          {data.map((item, index) => {
            return (
              <InfoListItem
                active={activeIndex === index ? true : false}
                key={index}
                item={item}
                index={index}
                changeActiveIndex={changeActiveIndex}
              />
            );
          })}
        </div>
      </AnimateHeight>
    </>
  );
}
