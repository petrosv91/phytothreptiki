import styled from 'styled-components/macro';
import MenuIcon from '@material-ui/icons/Menu';

const HamburgerIcon = styled(MenuIcon)`
  height: 30px !important;
  width: 30px !important;
  padding: 5px;
  font-weight: bold;
  background-color: ${props => props.theme.text};
  border-radius: 50%;
  cursor: pointer;
`;

export default HamburgerIcon;
