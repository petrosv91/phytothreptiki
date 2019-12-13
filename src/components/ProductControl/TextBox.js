/* QUANTITY COMPONENT STEP */
import React, { useContext, useState, useEffect } from 'react';
import { FlowContext } from '../Context/FlowProvider';
import { ErrorContext } from '../Context/ErrorProvider';
import AxiosHelper from '../Services/AxiosHelper';
import '../../styles/ProductControl/final.css';
import CreateError from '../../helpers/CreateError';
import { GoBackButton } from '../Buttons/GoBackButton';
import '../../styles/ProductControl/quantity.css';
import Loading from '../Buttons/Loading';
import DelayLoading from '../../helpers/DelayLoading';
import FadeIn from 'react-fade-in';
function TextBox(props) {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [transactionPackage, setTransactionPackage] = useState('');
  const { flow } = useContext(FlowContext);
  const { Mdispatch } = useContext(ErrorContext);
  const [flag, setFlag] = useState(false);
  const [askuser, setAskuser] = useState(false);
  const processSession = props.processSession;
  const controlId = props.control.Id;
  const entity = props.control.Entity;
  const control = props.control;

  const handleContinue = async () => {
    const requestOBject = {
      authenticationToken: localStorage.getItem('AuthenticationToken'), //auth token
      entity: entity, //control Entity
      controlId: controlId, //control Id
      flowId: flow.Flow.Id, //flow id
      processSession: processSession, //process session token
      controlValue: value //control value to string from JSOM
    };
    await setProcess(requestOBject);
  };
  //abort function handle
  const handleAbort = () => {
    setFlag(false);
    setMessage(false);
    setValue('');
  };
  //function to set control value
  async function setProcess(requestOBject) {
    try {
      const result = await AxiosHelper(
        requestOBject,
        props.control.ServiceSetValue
      );
      console.log(result);
      if (result.error) {
        if (result.messages) {
          console.log(result.messages);
          CreateError(Mdispatch, result.mesasges);
        }
      } else {
        props.goToStep(result.GoToFlowStep);
      }
    } catch (error) {
      console.log(error);
    }
  }
  //valide Transaction Quantity function
  const validate = async requestOBject => {
    try {
      const result = await AxiosHelper(
        requestOBject,
        props.control.ServiceValidateName
      );
      //check for error
      if (result.error) {
        console.log(result.messages);
        CreateError(Mdispatch, result.mesasges);
        //if validate had a success
      } else {
        if (result.QuantityOk) {
          await setProcess(requestOBject);
        } else {
          setAskuser(result.AskCaller)
          setMessage(result.Messages);
          setFlag(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  //sumbit function to handle user  submit
  const handleSubmit = e => {
    e.preventDefault();
    //create action to the quantity to the user information
    //create request object
    const requestOBject = {
      authenticationToken: localStorage.getItem('AuthenticationToken'), //auth token
      entity: entity, //control Entity
      controlId: controlId, //control Id
      flowId: flow.Flow.Id, //flow id
      processSession: processSession, //process session token
      controlValue: value //control value to string from JSOM
    };
    //call the validate function
    if (!value) CreateError(Mdispatch, 'Δώσε μια τιμή ');
    else validate(requestOBject);
  };
  //handle input change
  const handleInputChange = e => {
    e.preventDefault();
    setValue(e.target.value);
  };
  //when component renders focus the form
  useEffect(() => {
    async function getValue(requestOBject) {
      try {
        const result = await AxiosHelper(
          requestOBject,
          control.ServiceGetValue
        );
        setTransactionPackage(result.DataJson);
        setLoading(false);
      } catch (error) {
        CreateError(Mdispatch, 'Πρόβλημα Server');
        console.log(error);
      }
    }
    setLoading(true);
    const requestOBject = {
      authenticationToken: localStorage.getItem('AuthenticationToken'), //auth token
      entity: entity, //control Entity
      controlId: controlId, //control Id
      flowId: flow.Flow.Id, //flow id
      processSession: processSession, //process session token
      controlValue: '' //control value to string from JSOM
    };
    getValue(requestOBject);
  }, [entity, control, flow, controlId, processSession, Mdispatch]);
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
              <form onSubmit={handleSubmit} className="search-form-container">
                <div className="search-container-nav">
                  <GoBackButton
                    processSession={props.processSession}
                    previousStep={props.previousStep}
                    currentStep={props.currentStep}
                    goToStep={props.goToStep}
                  />
                  <>
                    <label>{props.control.Label}</label>
                  </>
                </div>
                <div className="quantity-input">
                  <input
                    autoFocus
                    value={value}
                    onChange={handleInputChange}
                    placeholder="Δώσε αριθμό..."
                    type="number"
                  />
                  <label>{transactionPackage}</label>
                </div>
              </form>
            </div>
            <div className="message-container">{message}</div>
            {flag && askuser && (
              <div>
                <div onClick={handleContinue} className="list-item">
                  Συνέχεια
                </div>
                <div onClick={handleAbort} className="list-item">
                  Ακύρωση
                </div>
              </div>
            )}
            {flag && !askuser && (
              <div>
                <div onClick={handleAbort} className="list-item">
                  Συνέχεια
                </div>
              </div>
            )}
          </div>
        </div>
      </FadeIn>
    );
}

export default React.memo(TextBox);
