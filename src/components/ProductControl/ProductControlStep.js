/* PRODUCT CONTROL STEP(FIRST STEP OF THE PRODUCT PROCESS) */
import React, {
  memo,
  useContext,
  useCallback,
  useState,
  useEffect,
  useRef
} from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ProductListItem from '../Lists/ProductListItem';
import { ErrorContext } from '../Context/ErrorProvider';
import Loading from '../Buttons/Loading';
import AxiosHelper from '../Services/AxiosHelper';
import CloseRecieptButton from '../Buttons/CloseRecieptButton';
import '../../styles/ProductControl/productcontrol.css';
import RequestOBjectConstructor from '../../helpers/RequestObjectConstructor';
import ExecuteProcess from '../Services/ExecuteProcess';
import CreateError from '../../helpers/CreateError';
import { StepsContext } from '../Context/StepsProvider';
import { GoBackButton } from '../Buttons/GoBackButton';
import FadeIn from 'react-fade-in';
import DelayLoading from '../../helpers/DelayLoading';
import usePaginate from '../../hooks/usePaginate';
import Paginate from '../Paginate/Paginate';

const ProductControlStep = memo(function ProductControlStep(props) {
  const [value, setValue] = useState('');
  const [data, setData] = useState([]);
  const { dispatch } = useContext(StepsContext);
  const { Mdispatch } = useContext(ErrorContext);
  const [loading, setLoading] = useState(false);
  const { page, numberOfPages, changePage, currentPage } = usePaginate({
    data,
    value,
    dFields: props.control.DisplayFields.split(',')
  });
  const searchRef = useRef();
  const { nextStep } = props;

  //create a ref with the form ,so form gets focused when component renders
  useEffect(() => {
    if (searchRef.current) searchRef.current.focus();
    //init user information about product if user hasnt searched yet
  });
  const handleSubmit = e => {
    e.preventDefault();
    GetPurchaseOrders();
  };
  useEffect(() => {
    //if steps changed ,update is ok and its time to move to the next step
    if (props.updateFlag) nextStep();
  }, [props.updateFlag, nextStep]);
  async function closeReceipt() {
    try {
      setLoading(true);
      let result = await ExecuteProcess(
        localStorage.getItem('AuthenticationToken'),
        'CloseReceipt',
        props.processSession,
        props.flowID
      );
      if (result.error) {
        CreateError(Mdispatch, result.messages);
      } else {
        props.lastStep();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleClick = useCallback(
    async item => {
      try {
        async function setValueFunction(item) {
          try {
            let requestOBject = RequestOBjectConstructor(
              localStorage.getItem('AuthenticationToken'), //auth token
              props.control.Entity, //control Entity
              props.control.Id, //control Id
              props.flowId, //flow id
              props.processSession //process session token;
            );
            //convert control value to string
            requestOBject.controlValue = JSON.stringify(item);
            const result = await AxiosHelper(
              requestOBject,
              props.control.ServiceSetValue
            );
            //if error alert about the error
            if (result.error) {
              CreateError(Mdispatch, result.messages);
              return { error: true };
            } else {
              console.log(result);
              props.goToStep(result.GoToFlowStep);
              dispatch({ type: 'add', value: result.FlowPath });
              //else return the result
            }
          } catch (error) {
            console.log(error);
            CreateError(Mdispatch, 'Πρόβλημα Server');
          }
        }
        setValueFunction(item);
      } catch (error) {
        console.log(error);
        CreateError(Mdispatch, 'why');
      }
    },
    [props, Mdispatch, dispatch]
  );
  // useEffect(() => {
  //   if (data.length === 1) handleClick(data[0]);
  // }, [data, handleClick]);
  const GetPurchaseOrders = async () => {
    try {
      setLoading(true);
      //create the request object
      const requestOBject = {
        authenticationToken: localStorage.getItem('AuthenticationToken'), //auth token
        entity: props.control.Entity, //control Entity
        controlId: props.control.Id, //control Id
        flowId: props.flowId, //flow id
        processSession: props.processSession, //process session token
        controlValue: value //control value
      };
      //get data from the server
      const response = await AxiosHelper(
        requestOBject,
        props.control.ServiceGetValue
      );
      //   if the response was ok
      if (response.error) {
        CreateError(Mdispatch, response.messages);
        setValue('');
        setLoading(false);
      } else {
        const result = await JSON.parse(response.DataJson);
        setData(result);
        setValue('');
        setLoading(false);
      }
    } catch (error) {
      CreateError(Mdispatch, 'Πρόβλημα Server');
      console.log(error);
    }
  };
  const handleInputChange = e => {
    e.preventDefault();
    setValue(e.target.value);
  };

  let listData = [];

  listData = page.map(item => {
    return (
      <ProductListItem
        handleClick={handleClick}
        source="product"
        key={item.Id}
        item={item}
        DisplayFields={props.control.DisplayFields}
      />
    );
  });

  if (loading)
    return (
      <DelayLoading delay={350}>
        <Loading />;
      </DelayLoading>
    );
  else
    return (
      <FadeIn transitionDuration={300}>
        <div className="searchable-container">
          <div className="search-container">
            <form onSubmit={handleSubmit} className="search-form-container">
              <div className="product-container-nav">
                <GoBackButton
                  processSession={props.processSession}
                  previousStep={props.previousStep}
                  currentStep={props.currentStep}
                  goToStep={props.goToStep}
                  updateDisplayButton={props.updateDisplayButton}
                />
                <div>
                  <label>{props.control.Label}</label>
                </div>
                {props.control.Commands &&
                  props.control.Commands.length > 0 &&
                  props.control.Commands[0].DisplayButton && (
                    <CloseRecieptButton
                      handleClick={closeReceipt}
                      className="close-reciept-button"
                    />
                  )}
              </div>
              <div>
                <input
                  value={value}
                  ref={searchRef}
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
          <Paginate
            handleClick={changePage}
            numberOfPages={numberOfPages}
            activePage={currentPage}
          />
        </div>
      </FadeIn>
    );
});

export default ProductControlStep;
