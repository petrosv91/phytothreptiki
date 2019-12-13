import styled from 'styled-components';

const Root = styled.div`
  height: 250px;
  width: 100%;
  display: grid;
  justify-content: center;
  position: relative;
  cursor: pointer;
`;

const List = styled.div`
  display: flex;
  padding: 0px 0px 20px 0px;
  height: 100%;
  width: 100%;
`;

const Img = styled.img`
  height: 50%;
`;

const Title = styled.div`
  color: ${props => props.theme.text};
  align-self: flex-end;
  font-weight: bold;
`;

export { Root, List, Img, Title };
