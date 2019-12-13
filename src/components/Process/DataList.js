/* DATA LIST CONTROL */
import React, { memo, useState, useContext, useEffect } from 'react';
import RequestObjectConstructor from '../../helpers/RequestObjectConstructor';
import { ServiceValidate } from '../Services/ServiceValidate';
import ListItem from '../Lists/ListItem';
import '../../styles/DataList/datalist.css';
import { StepsContext } from '../Context/StepsProvider';
import Loading from '../../components/Buttons/Loading';
import { GoBackButton } from '../Buttons/GoBackButton';
import FadeIn from 'react-fade-in';
import DelayLoading from '../../helpers/DelayLoading';
const DataList = function({
  previousStep,
  index,
  goToStep,
  control,
  processSession,
  flowId,
  currentStep
}) {
  const [data, setData] = useState([]);
  const [reqObj, setreqObj] = useState({});
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(StepsContext);
  //when component renders
  useEffect(() => {
    //function to get data from server
    async function getData() {
      //use constructor to create the request object
      setLoading(true);
      let requestObject = RequestObjectConstructor(
        localStorage.getItem('AuthenticationToken'),
        control.Entity,
        control.Id,
        flowId,
        processSession
      );
      requestObject.controlValue = '';
      setreqObj(requestObject);
      //call service validate and get the result
      const result = await ServiceValidate(
        requestObject,
        control.ServiceGetValue
      );
      //if error exists
      if (result.error) {
        console.log(result.messages);
      }
      //else pass data into State
      else {
        setData(result);
      }
      setLoading(false);
    }
    const action = {
      type: 'clear',
      index: index
    };
    dispatch(action);
    getData();
  }, [control, flowId, processSession, dispatch, index]);
  const ListArray = data.map(item => {
    return (
      <ListItem
        ServiceSetValue={control.ServiceSetValue}
        index={index}
        key={item.Id}
        item={item}
        DisplayFields={control.DisplayFields}
        goToStep={goToStep}
        requestOBject={reqObj}
      />
    );
  });
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
              <GoBackButton
                processSession={processSession}
                previousStep={previousStep}
                currentStep={currentStep}
                goToStep={goToStep}
              />
              <label>{control.Label}</label>
            </div>
            {ListArray}
          </div>
        </div>
      </FadeIn>
    );
};
export default memo(DataList);
