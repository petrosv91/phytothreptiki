/* DYNAMIC BUTTON TAKES PARAMS SIZE,COLOR,TEXT,SIZE */
import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const ButtonAnimated = props => {
  return (
    <div>
      <Button color={props.color} size={props.size} animated>
        <Button.Content visible>{props.text}</Button.Content>
        <Button.Content hidden>
          <Icon name={props.icon} />
        </Button.Content>
      </Button>
    </div>
  );
};

export default ButtonAnimated;
