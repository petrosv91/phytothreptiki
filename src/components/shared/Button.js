import styled from 'styled-components/macro';
const Button = styled.button`
  text-decoration: none;
  width: 100%;

  margin: 5px 0;
  height: 42px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  opacity: 0.9;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 0.5px;
  color: ${props => props.theme.text};
  box-shadow: 2px 2px 2px black;
  background-color: ${props => props.theme.special};
  transition: all 0.3s ease-in-out;
  :hover {
    opacity: 1;
  }
`;

export default Button;
