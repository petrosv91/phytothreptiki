/* LIST ITEM COMPONENT */
import React, { useContext, useEffect, useState } from 'react';
import '../../styles/List/listItem.css';
import { StepsContext } from '../Context/StepsProvider';
import { ServiceSetValue } from '../Services/ServiceSetValue';
import { ErrorContext } from '../Context/ErrorProvider';
import CreateError from '../../helpers/CreateError';

const ListItem = props => {
  const { DisplayFields, item, userOption } = props;
  const [stringsArray, setStringsArray] = useState([]);
  const { dispatch } = useContext(StepsContext);
  const [loaded, setLoaded] = useState(false);
  const { Mdispatch } = useContext(ErrorContext);
  //set process function
  const setprocess = async () => {
    try {
      const NewRequestObject = {
        ...props.requestOBject,
        controlValue: JSON.stringify(props.item)
      };
      //call parent's function and wait for result
      const result = await ServiceSetValue(
        NewRequestObject,
        props.ServiceSetValue
      );
      if (!result.error) {
        dispatch({ type: 'add', value: result.FlowPath });
        props.goToStep(result.GoToFlowStep);
      } else {
        CreateError(Mdispatch, result.messages);
      }
    } catch (error) {
      CreateError(Mdispatch, 'Πρόβλημα Server');
      console.log(error);
    }
  };
  //handle user click
  const handleClick = () => {
    setprocess();
  };
  useEffect(() => {
    //split the display fields
    if (!loaded) {
      setLoaded(true);
      const dFields = DisplayFields.split(',');

      //match every display field and construct the item text
      let array = [];
      for (let field = 0; field < dFields.length; field++) {
        array.push(<div key={field}>{item[dFields[field]]}</div>);
      }
      setStringsArray(array);
    }
  }, [DisplayFields, item, loaded, userOption]);
  return (
    <div onClick={handleClick} className="list-item">
      <div className="list-item-fields">{stringsArray}</div>
    </div>
  );
};

export default ListItem;
