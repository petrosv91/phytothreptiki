/* FUNCTION TO CREATE THE REQUEST OBJEECT */
const RequestObjectConstructor = (
  authenticationToken,
  entity,
  controlId,
  flowId,
  processSession
) => {
  const requestOBject = {
    authenticationToken, //auth token
    entity, //control Entity
    controlId, //control Id
    flowId, //flow id
    processSession //procDDess session token
  };
  return requestOBject;
};

export default RequestObjectConstructor;
