/* FINAL STEP OF THE PROCESS PROCEDURE */
import React, { useState, useEffect, useContext } from 'react';
import AxiosHelper from '../Services/AxiosHelper';
import Loading from '../Buttons/Loading';
import '../../styles/Process/finalstep.css';
import { StepsContext } from '../Context/StepsProvider';
import { ErrorContext } from '../Context/ErrorProvider';
import CreateError from '../../helpers/CreateError';
const FinalProcessStep = ({
  control,
  flowId,
  processSession,
  updateProcessSession,
  updateControls,
  goToStep,
  updateDisplayButton
}) => {
  const [loading, setloading] = useState(true);
  const [message, setMessage] = useState('');
  const [nextStep, setnextStep] = useState(1);
  const { Mdispatch } = useContext(ErrorContext);
  const { dispatch } = useContext(StepsContext);
  const [loaded, setloaded] = useState(false);

  const handleContinue = () => {
    goToStep(nextStep);
    const steps_action = {
      type: 'clear',
      index: nextStep - 1
    };
    dispatch(steps_action);
    updateDisplayButton(nextStep - 1, false);
  };

  useEffect(() => {
    async function getData() {
      const requestOBject = {
        authenticationToken: localStorage.getItem('AuthenticationToken'), //auth token
        processSession: processSession
      };
      const result = await AxiosHelper(requestOBject, control.ServiceGetValue);
      if (result.error) {
        CreateError(Mdispatch, result.messages);
      } else {
        dispatch({ type: 'add', value: result.FlowPath });
        if (result.ProcessTerminated) {
          setMessage(result.DisplayResultMessage);
          setnextStep(result.GoToFlowStep);
          updateProcessSession(result.ProcessSession);
          if (result.DisplayResultMessage.length === 0)
            goToStep(result.GoToFlowStep);
        } else {
          goToStep(result.GoToFlowStep);
          if (result.DisplayControlCommands) {
            updateDisplayButton(result.GoToFlowStep - 1, true);
          }
        }
      }
    }
    if (!loaded) {
      getData();
      setloaded(true);
    }
    setloading(false);
  }, [
    Mdispatch,
    control,
    flowId,
    processSession,
    goToStep,
    updateControls,
    updateProcessSession,
    loaded,
    updateDisplayButton,
    dispatch
  ]);
  if (loading) return <Loading />;
  else
    return (
      <div className="final-step-container">
        <div className="message-container">{message}</div>
        {message.length > 0 && (
          <div onClick={handleContinue} className="list-item">
            Συνέχεια
          </div>
        )}
      </div>
    );
};

export default FinalProcessStep;
