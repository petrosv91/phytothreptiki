import React from 'react';
import '../../styles/Paginate/paginate.css';
import styled from 'styled-components/macro';
const PageNumber = styled.div`
  cursor: pointer;
  color: ${props => props.theme.primary};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  text-align: center;
  margin: auto 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => (props.active ? 0.85 : 0.5)};
  font-weight: bold;
  margin: 0px 5px;
`;
const PagineNateWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  background-color: ${props => props.theme.secondary};
  display: flex;
  margin: 5px 0;
  padding: 10px;
  box-shadow: 0px 0px 2px 0px ${props => props.theme.secondary};
`;
export default function Paginate({ numberOfPages, activePage, handleClick }) {
  let menuButtons = [];
  for (let page = 1; page <= numberOfPages; page++) {
    menuButtons.push(
      <PageNumber
        onClick={() => {
          handleClick(page);
        }}
        active={activePage === page}
        key={page}
      >
        {page}
      </PageNumber>
    );
  }
  if (numberOfPages) {
    return <PagineNateWrapper>{menuButtons}</PagineNateWrapper>;
  } else {
    return <></>;
  }
}
