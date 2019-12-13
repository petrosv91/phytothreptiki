/* TYPE SEARCHABLE CONTROL */
import React, { useState, useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import '../../styles/Process/searchable.css';
import SearchIcon from '@material-ui/icons/Search';
import ListItem from '../../components/Lists/ListItem';
import RequestOBjectConstructor from '../../helpers/RequestObjectConstructor';
import { ServiceValidate } from '../Services/ServiceValidate';
import { ServiceSetValue } from '../Services/ServiceSetValue';
import { ErrorContext } from '../Context/ErrorProvider';
import createError from '../../helpers/CreateError';
import Loading from '../Buttons/Loading';
import { GoBackButton } from '../Buttons/GoBackButton';
import DelayLoading from '../../helpers/DelayLoading';
import FadeIn from 'react-fade-in';
import usePaginate from '../../hooks/usePaginate';
import Paginate from '../Paginate/Paginate';
function Searchable(props) {
  const [value, setValue] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [reqObj, setReqObj] = useState({});
  const { Mdispatch } = useContext(ErrorContext);
  const { page, numberOfPages, changePage, currentPage } = usePaginate({
    data,
    value,
    dFields: props.control.DisplayFields.split(',')
  });

  //form submit function
  const handleSubmit = async e => {
    setLoading(true);
    e.preventDefault();
    if (listData.length === 1) {
      const item = listData[0].props.item;
      const NewRequestObject = {
        ...reqObj,
        controlValue: JSON.stringify(item)
      };

      const result = await ServiceSetValue(
        NewRequestObject,
        props.control.ServiceSetValue
      );
      if (!result.error) {
        props.goToStep(result.GoToFlowStep);
      } else {
        createError(Mdispatch, result.messages);
      }
    } else {
      createError(Mdispatch, 'Επέλεξε μια επιλογή');
    }
    setLoading(false);
  };
  //function to handle search and filter results
  useEffect(() => {
    let requestOBject = RequestOBjectConstructor(
      localStorage.getItem('AuthenticationToken'), //auth token
      props.control.Entity, //control Entity
      props.control.Id, //control Id
      props.flowId, //flow id
      props.processSession //process session token);
    );
    setReqObj(requestOBject);
    async function getData() {
      //if its first render get the data
      if (loaded === false) {
        setLoaded(true);
        setLoading(true);
        //first search with * so we get all the data
        requestOBject.controlValue = '*';
        const result = await ServiceValidate(
          requestOBject,
          props.control.ServiceGetValue
        );
        if (result.error) {
          createError(Mdispatch, result.messages);
        } else {
          setData(result);
        }
        setLoading(false);
        //set that we loaded the init data
      }
    }
    getData();
  }, [
    props,
    props.currentStep,
    loaded,
    props.control.DisplayFields,
    data,
    value,
    props.nextStep,
    Mdispatch
  ]);
  const listData = page.map(item => {
    return (
      <ListItem
        ServiceSetValue={props.control.ServiceSetValue}
        requestOBject={reqObj}
        index={props.index}
        key={item.Id}
        item={item}
        DisplayFields={props.control.DisplayFields}
        goToStep={props.goToStep}
      />
    );
  });
  //handle input change
  const handleInputChange = e => {
    e.preventDefault();
    setValue(e.target.value);
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
              <form onSubmit={handleSubmit} className="search-form-container">
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
            <div className="results-container">{listData}</div>
          </div>
          <Paginate
            handleClick={changePage}
            numberOfPages={numberOfPages}
            activePage={currentPage}
          />
        </div>
      </FadeIn>
    );
}

export default withRouter(Searchable);
