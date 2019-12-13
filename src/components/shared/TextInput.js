import styled from 'styled-components/macro';

const TextInput = styled.input`
  position: relative;
  width: 200px;
  height: 42px;
  border: none;
  padding: 20px;
  padding-left: 50px;

  transition: all 0.2s;
  margin: 5px 0;
  :focus {
    outline: none;
    box-shadow: 0px 0px 1px 2px ${props => props.theme.special};
  }
`;

export default TextInput;
