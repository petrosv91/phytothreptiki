import React, { useState, useContext } from 'react';
import DelayLoading from '../../helpers/DelayLoading';
import { GoBackButton } from '../Buttons/GoBackButton';
import FadeIn from 'react-fade-in';
import Loading from '../Buttons/Loading';
import { FlowContext } from '../Context/FlowProvider';
import { ErrorContext } from '../Context/ErrorProvider';
import { StepsContext } from '../Context/StepsProvider';
import createError from '../../helpers/CreateError';
import { ServiceValidate } from '../Services/ServiceValidate';
import SearchIcon from '@material-ui/icons/Search';
import { ServiceSetValue } from '../Services/ServiceSetValue';

export default function ScanControl(props) {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const { flow } = useContext(FlowContext);
  const { Mdispatch } = useContext(ErrorContext);
  const { dispatch } = useContext(StepsContext);
  const requestOBject = {
    authenticationToken: localStorage.getItem('AuthenticationToken'), //auth token
    entity: props.control.Entity, //control Entity
    controlId: props.control.Id, //control Id
    flowId: flow.Flow.Id, //flow id
    processSession: props.processSession //process session token
  };
  const handleSubmit = async e => {
    setLoading(true);
    e.preventDefault();
    const reqObj = { ...requestOBject, controlValue: value };
    console.log(props.control);
    const result = await ServiceValidate(reqObj, props.control.ServiceGetValue);
    if (result.error) {
      createError(Mdispatch, result.messages);
    } else {
      setprocess(result[0]);
    }
    setValue('');
    setLoading(false);
  };

  const handleInputChange = event => {
    setValue(event.target.value);
  };
  const setprocess = async item => {
    try {
      const NewRequestObject = {
        ...requestOBject,
        controlValue: JSON.stringify(item)
      };
      console.log(NewRequestObject);
      const result = await ServiceSetValue(
        NewRequestObject,
        props.control.ServiceSetValue
      );
      console.log(NewRequestObject);
      if (!result.error) {
        dispatch({ type: 'add', value: result.FlowPath });
        props.goToStep(result.GoToFlowStep);
      } else {
        createError(Mdispatch, result.messages);
      }
    } catch (error) {
      createError(Mdispatch, 'Πρόβλημα Server');
      console.log(error);
    }
  };

  if (loading)
    return (
      <DelayLoading delay={500}>
        <Loading />;
      </DelayLoading>
    );
  else
    return (
      <FadeIn transitionDuration={300}>
        <div>
          <div className="searchable-container">
            <div className="search-container">
              <form
                style={{ fontSize: 12 }}
                onSubmit={handleSubmit}
                className="search-form-container"
              >
                <div className="search-container-nav">
                  <GoBackButton
                    processSession={props.processSession}
                    previousStep={props.previousStep}
                    currentStep={props.currentStep}
                    goToStep={props.goToStep}
                  />
                  <div>
                    <label>{props.control.Label}</label>
                  </div>
                </div>
                <div>
                  <input
                    autoFocus
                    value={value}
                    onChange={handleInputChange}
                    placeholder="Αναζήτηση..."
                    className="user-input"
                    type="text"
                  />
                </div>

                <SearchIcon className="search-form-container-icon" />
              </form>
            </div>
          </div>
        </div>
      </FadeIn>
    );
}
