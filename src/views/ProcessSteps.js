/* PROCESS STEPS PAGE DISPLAYS THE CURRENT FLOW CONTROLS  */
import React, { useEffect, useContext, useState, memo } from 'react';
import { withRouter } from 'react-router-dom';
import StepWizard from 'react-step-wizard';
import Searchable from '../components/Process/Searchable';
import { FlowContext } from '../components/Context/FlowProvider';
import { StepsContext } from '../components/Context/StepsProvider';
import { ErrorContext } from '../components/Context/ErrorProvider';
import createError from '../helpers/CreateError';
import '../styles/Process/processSteps.css';
import '../styles/ProductControl/productcontrol.css';
import FinalProcessStep from './../components/Process/FinalProcessStep';
import DataList from '../components/Process/DataList';
import AxiosHelper from '../components/Services/AxiosHelper';
import EndProcess from '../components/Services/EndProcess';
import ProductControlStep from '../components/ProductControl/ProductControlStep';
import TextBox from '../components/ProductControl/TextBox';
import DrawerNav from '../components/Navbar/DrawerNav';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import HomeIcon from '@material-ui/icons/Home';
import Paper from '@material-ui/core/Paper';
import StepsInformationMenu from '../components/Process/StepsInformationMenu';
import ScanControl from '../components/Process/ScanControl';
import ErrorBoundary from '../components/Error/ErrorBoundary';
import NavbarComponent from '../components/Navbar/NavbarComponent';
import { withTheme } from 'styled-components/macro';

// import Info from '../components/Process/Info';
const ProcessSteps = memo(function ProcessSteps(props) {
  const [processSession, setProcessSesion] = useState('');
  const { flow } = useContext(FlowContext);
  const [controls, setControls] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { Mdispatch } = useContext(ErrorContext);
  const { steps } = useContext(StepsContext);
  const push = props.history.push;
  const [drawer, setdrawer] = useState(false);
  const title = localStorage.getItem('title');
  //function to close Drawer
  const closeDrawer = () => {
    setdrawer(!drawer);
  };
  //function to updateDisplayButton in any control
  const updateDisplayButton = (index_to_update, value) => {
    let newArray = [];
    //loop through every control
    controls.forEach((control, index) => {
      //match the update index
      if (index === index_to_update) {
        //update the value
        let temp = control;
        if (temp.Commands[0]) temp.Commands[0].DisplayButton = value;
        newArray.push(control);
      } else {
        //push to the new array
        newArray.push(control);
      }
    });
    setControls(newArray);
  };

  //function that can update process session
  const updateProcessSession = PSession => {
    setProcessSesion(PSession);
  };
  useEffect(() => {
    //if we dont have flow then redirect to userpage
    if (Object.keys(flow).length === 0) {
      push('/userpage');
      return;
    }

    //function to get process token and start process
    const getToken = async () => {
      const authenticationToken = localStorage.getItem('AuthenticationToken');
      //construct request body
      const requestBody = {
        authenticationToken: authenticationToken,
        flowId: flow.Flow.Id,
        processName: flow.Flow.ProcessName,
        processId: flow.Flow.ProcessId
      };
      //axios Request with StartProcess Param
      const result = await AxiosHelper(requestBody, 'StartProcess');
      if (result.error) {
        createError(Mdispatch, result.messages);
      } else {
        setControls(flow.Flow.Controls);
        setProcessSesion(result.ProcessSession);
        setLoaded(true);
      }
    };
    //if we dont have process Session
    if (!processSession) getToken();
  }, [push, flow, processSession, Mdispatch]);
  let controlsArray = [];
  //if we got the required information then render then controls array
  if (loaded) {
    controls.forEach((control, index) => {
      //if type is ScanControl or Searchble
      if (control.Type === 'Searchable') {
        controlsArray.push(
          <Searchable
            index={index}
            key={control.Id}
            control={control}
            processSession={processSession}
            flowId={flow.Flow.Id}
          />
        );
      }
      //if type is ProductControl(SPECIAL CASE )
      else if (control.Type === 'ProductControl') {
        controlsArray.push(
          <ProductControlStep
            index={index}
            key={control.Id}
            control={control}
            processSession={processSession}
            flowId={flow.Flow.Id}
            updateDisplayButton={updateDisplayButton}
          />
        );
        //if control type is DataList
      } else if (control.Type === 'DataList') {
        controlsArray.push(
          <DataList
            index={index}
            key={control.Id}
            control={control}
            processSession={processSession}
            flowId={flow.Flow.Id}
          />
        );
      } else if (control.Type === 'TextBox') {
        controlsArray.push(
          <TextBox
            index={index}
            key={control.Id}
            control={control}
            processSession={processSession}
            flowId={flow.Flow.Id}
          />
        );
      } else if (control.Type === 'FinalProcessStep') {
        controlsArray.push(
          <FinalProcessStep
            index={index}
            key={control.Id}
            control={control}
            processSession={processSession}
            updateProcessSession={updateProcessSession}
            updateDisplayButton={updateDisplayButton}
          />
        );
      } else if (control.Type === 'ScanControl') {
        controlsArray.push(
          <ScanControl
            index={index}
            key={control.Id}
            control={control}
            processSession={processSession}
            updateProcessSession={updateProcessSession}
          />
        );
      }
    });
  }

  return (
    <ErrorBoundary>
      <div className="process-container">
        <NavbarComponent
          backgroundColor={props.theme.special}
          title={title}
          processSession={processSession}
        />
        <div className="process-navigation">
          <div>
            <HomeIcon
              onClick={() => {
                EndProcess(
                  localStorage.getItem('AuthenticationToken'),
                  processSession
                );
                props.history.push('/userpage');
              }}
              className="home-icon"
            />
          </div>
          <div className="flow-title">{title}</div>
          <div>
            <DrawerNav
              processSession={processSession}
              close={closeDrawer}
              state={drawer}
            />
            {drawer ? (
              <ToggleOffIcon className="drawer-button-off" />
            ) : (
              <ToggleOnIcon
                onClick={() => setdrawer(!drawer)}
                className="drawer-button"
              />
            )}
            {/* <Info /> */}
          </div>
        </div>

        {steps && <StepsInformationMenu steps={steps} />}
        <div className="process-steps">
          <StepWizard transitions={{}} isLazyMount={true} initialStep={1}>
            {controlsArray}
          </StepWizard>
        </div>
      </div>
    </ErrorBoundary>
  );
});
export default withRouter(withTheme(ProcessSteps));
