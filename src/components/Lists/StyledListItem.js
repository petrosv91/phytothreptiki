import styled from 'styled-components';

const StyledListItem = styled.div`
  background-color: ${props => props.theme.secondary};
  border-right: 25px solid ${props => props.theme.special};
  box-shadow: 0px 0px 2px 0px ${props => props.theme.secondary};
  min-height: 50px;
  width: 300px;
  margin: 5px 0;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0.7;
  transition: all 0.3s ease-in;
  :hover {
    opacity: 1;
  }
`;

export default StyledListItem;
