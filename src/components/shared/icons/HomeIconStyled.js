import HomeIcon from '@material-ui/icons/Home';
import styled from 'styled-components/macro';

const HomeIconStyled = styled(HomeIcon)`
  height: 35px !important;
  width: 35px !important;
  padding: 5px;
  cursor: pointer;
  background-color: ${props => props.theme.text};
  border-radius: 50%;
`;
export default HomeIconStyled;
