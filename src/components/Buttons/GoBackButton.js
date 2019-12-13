/**
|--------------------------------------------------
| GO BACK BUTTON 
|--------------------------------------------------
*/
import React, { memo, useContext, useState } from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AxiosHelper from '../Services/AxiosHelper';
import CreateError from '../../helpers/CreateError';
import EndProcess from '../Services/EndProcess';
import { ErrorContext } from '../Context/ErrorProvider';
import { StepsContext } from '../Context/StepsProvider';
import GoBack from '../Services/GoBack';
import ModalComponent from '../Navbar/Modal';
import { withRouter } from 'react-router-dom';
const GoBackButtonMemo = memo(function GoBackButtonMemo({
  history,
  previousStep,
  currentStep,
  goToStep,
  processSession,
  updateDisplayButton
}) {
  const { Mdispatch } = useContext(ErrorContext);
  const { dispatch } = useContext(StepsContext);
  const [toggleModal, setToggleModal] = useState(false);
  const [message, setMessage] = useState('');
  const [command, setCommand] = useState('');
  const [serviceName, setServiceName] = useState('');
  const CancelProcess = async () => {
    try {
      const reqObjt = {
        authenticationToken: localStorage.getItem('AuthenticationToken'),
        commandName: command,
        processSession: processSession
      };
      const result = await AxiosHelper(reqObjt, serviceName);
      console.log(result);
      if (updateDisplayButton) updateDisplayButton(currentStep - 1, false);
      setToggleModal(false);
      if (result.Success) {
        CreateError(Mdispatch, result.DisplayResultMessage);
        dispatch({ type: 'add', value: result.FlowPath });
        goToStep(result.GoToFlowStep);
      }
    } catch (error) {
      console.log(error);
      CreateError(Mdispatch, 'Πρόβλημα Server');
    }
  };
  const cancel = () => {
    setToggleModal(false);
  };
  const handleBack = async () => {
    const authToken = localStorage.getItem('AuthenticationToken');
    //if we are in the first step then end Process
    if (currentStep === 1) {
      dispatch({ type: 'add', value: '' });
      EndProcess();
      history.push('/userpage');
    } else {
      const result = await GoBack(authToken, processSession);
      if (result.Success) {
        console.log(result);
        dispatch({ type: 'add', value: result.FlowPath });
        goToStep(result.GoToFlowStep);
      } else {
        if (result.AskCaller) {
          setCommand(result.ExecuteProcessCommandOnYes);
          setMessage(result.Messages);
          setServiceName(result.ExecuteWebServiceOnYes);
          setToggleModal(true);
        }
      }
    }
  };
  return (
    <>
      <ModalComponent
        CancelProcess={CancelProcess}
        message={message}
        state={toggleModal}
        cancel={cancel}
      />
      <div onClick={handleBack}>
        <ArrowBackIcon
          fontSize="large"
          className="search-container-nav-button"
        />
      </div>
    </>
  );
});
export const GoBackButton = withRouter(GoBackButtonMemo);
