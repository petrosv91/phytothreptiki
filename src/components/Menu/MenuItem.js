/* MENU ITEM COMPONENT THAT RENDERS THE MENU ITEM CONTENT */
import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { FlowContext } from '../Context/FlowProvider';
import { Root, List, Img, Title } from '../shared/Boxes';
import menuReceipt from '../../assets/menuReceipt.png';

const MenuItem = React.memo(props => {
  const { menu } = props;
  const { setFlow } = useContext(FlowContext);
  const handleClick = () => {
    const title = localStorage.getItem('title');
    if (!title) localStorage.setItem('title', menu.Title);
    else localStorage.setItem('title', title + '/' + menu.Title);
    if (menu.Flow) {
      setFlow(menu);
      props.history.push('/process');
    } else {
      props.update(menu.Submenus);
    }
  };
  return (
    <div style={{ background: props.color }} onClick={handleClick}>
      <Root>
        <List>
          <Img src={menuReceipt} alt={'N/A'} />
          <Title>
            {props.index + 1}. {menu.Title}
          </Title>
        </List>
      </Root>
    </div>
  );
});

export default withRouter(MenuItem);
