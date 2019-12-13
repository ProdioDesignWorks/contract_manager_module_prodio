/** 
 * By Shashikant Sharma 
 * 
 * This code will take the user action and based on the user action and payload it will call the respective payment service.
 *  
 */ 
// eslint-disable-next-line import/prefer-default-export
const axios = require('axios');
const {parse, stringify} = require('flatted/cjs');
const HttpErrors = require('http-errors');

const isNull = function (val) {
  if (typeof val === 'string') { val = val.trim(); }
  if (val === undefined || val === null || typeof val === 'undefined' || val === '' || val === 'undefined') {
    return true;
  }
  return false;
};

const isJson = function (str) {
  try {
    var obj = JSON.parse(JSON.stringify(str));
    if (obj && typeof obj === 'object' && obj !== null) {
      return true;
    }
  } catch (err) {
    return false;
  }
  return false;
}

function ContractManagerServices(BASE_URL) {
  this.execute = function (payload,callback) {
    // action key calls api.
    if(payload.action){
      switch(payload.action){
        case "ADD_PERSONALIZED_FIELDS":
          return funAddPersonalizedFields(BASE_URL,payload,callback);
        break;
        case "REMOVE_PERSONALIZED_FIELDS":
          return funRemovePersonalizedFields(BASE_URL,payload,callback);
        break;
        case "CREATE_TEMPLATE":
          return funCreateTemplate(BASE_URL,payload,callback);
        break;
        case "EDIT_TEMPLATE":
          return funEditTemplate(BASE_URL,payload,callback);
        break;
        case "GET_TEMPLATE_DETAILS":
          return funGetTemplateDetails(BASE_URL,payload,callback);
        break;
        case "DELETE_TEMPLATE":
          return funDeleteTemplate(BASE_URL,payload,callback);
        break;
        case "LIST_TEMPLATES":
          return funListTemplates(BASE_URL,payload,callback);
        break;
        case "TEMPLATES_LIST_USER_DATA":
          return funGetTemplatesWithUser(BASE_URL,payload,callback);
        break;
        case "CREATE_CONTRACT":
          return funCreateContract(BASE_URL,payload,callback);
        break;
        case "EDIT_CONTRACT":
          return funEditContract(BASE_URL,payload,callback);
        break;
        case "DELETE_CONTRACT":
          return funDeleteContract(BASE_URL,payload,callback);
        break;
        case "LIST_CONTRACTS":
          return funListContracts(BASE_URL,payload,callback);
        break;
        case "LIST_CONTRACTS_FOR_USER":
          return funListContractsForUser(BASE_URL,payload,callback);
        break;
        case "USER_ALL_CONTRACTS":
          return funGetUserAllContracts(BASE_URL,payload,callback);
        break;
        case "CREATE_SEND_CONTRACT":
          return funCreateAndSendContract(BASE_URL,payload,callback);
        break;
        case "SEND_CONTRACT":
          return funSendContract(BASE_URL,payload,callback);
        break;
        case "ASSIGN_WEBHOOK_URL":
          return funAssignWebhook(BASE_URL,payload,callback);
        break;
        case "TEMPLATE_SIGNING_FIELDS_CHECK":
          return funCheckIfTemplateHasSigningFields(BASE_URL,payload,callback);
        break;
        default:
          let errorMessage = `Please add BaseUrl.`;
          return errorMessage;
        break;
      }
    }else{
      return "Please provide valid action";
    }

  };
}


/**
* This function will call create account in QBO.
* @param BASE_URL - the initial host url for the service apis.
* @param payload - the required payload JSON to perform the operations.
* @param callback - to send the response back to the requester.
*/
const funAddPersonalizedFields = function (BASE_URL,payload,callback) {
  if (isNull(payload["meta"]["businessId"])) {
    return callback(new HttpErrors.BadRequest('businessId is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}PersonalizedFields/addPersonalizedFields`;
  axios.post(url, payload).then(response => {
    //console.log(response)
    return callback(response);
  })
  .catch((error) => {
    let json = stringify(error);
    return callback(json);
  });
}


/**
* This function will call create account in QBO.
* @param BASE_URL - the initial host url for the service apis.
* @param payload - the required payload JSON to perform the operations.
* @param callback - to send the response back to the requester.
*/
const funRemovePersonalizedFields = function (BASE_URL,payload,callback) {
  if (isNull(payload["meta"]["businessId"])) {
    return callback(new HttpErrors.BadRequest('businessId is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}PersonalizedFields/removePersonalizedFields`;
  axios.post(url, payload).then(response => {
    //console.log(response)
    return callback(response);
  })
  .catch((error) => {
    let json = stringify(error);
    return callback(json);
  });
}


const funCreateTemplate = function (BASE_URL,payload,callback) {
  if (isNull(payload["meta"]["businessId"])) {
    return callback(new HttpErrors.BadRequest('businessId is mandatory.', { expose: false }));
  }

  if (isNull(payload["meta"]["templateUrl"])) {
    return callback(new HttpErrors.BadRequest('templateUrl is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}Templates/createTemplate`;
  axios.post(url, payload).then(response => {
    //console.log(response)
    return callback(response);
  })
  .catch((error) => {
    let json = stringify(error);
    return callback(json);
  });
}


const funEditTemplate = function (BASE_URL,payload,callback) {
  if (isNull(payload["meta"]["businessId"])) {
    //return callback(new HttpErrors.BadRequest('businessId is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}Templates/editTemplate`;
  axios.post(url, payload).then(response => {
    //console.log(response)
    return callback(response);
  })
  .catch((error) => {
    let json = stringify(error);
    return callback(json);
  });
}


const funGetTemplateDetails = function (BASE_URL,payload,callback) {
  if (isNull(payload["meta"]["templateId"])) {
    return callback(new HttpErrors.BadRequest('templateId is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}Templates/getTemplateDetails`;
  axios.post(url, payload).then(response => {
    //console.log(response)
    return callback(response);
  })
  .catch((error) => {
    let json = stringify(error);
    return callback(json);
  });
}


const funDeleteTemplate = function (BASE_URL,payload,callback) {
  if (isNull(payload["meta"]["templateId"])) {
    return callback(new HttpErrors.BadRequest('templateId is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}Templates/deleteTemplate`;
  axios.post(url, payload).then(response => {
    //console.log(response)
    return callback(response);
  })
  .catch((error) => {
    let json = stringify(error);
    return callback(json);
  });
}


const funListTemplates = function (BASE_URL,payload,callback) {
  if (isNull(payload["meta"]["businessId"])) {
    return callback(new HttpErrors.BadRequest('businessId is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}Templates/listAllTemplates`;
  axios.post(url, payload).then(response => {
    //console.log(response)
    return callback(response);
  })
  .catch((error) => {
    let json = stringify(error);
    return callback(json);
  });
}

const funGetTemplatesWithUser = function (BASE_URL,payload,callback) {
  if (isNull(payload["meta"]["businessId"])) {
    return callback(new HttpErrors.BadRequest('businessId is mandatory.', { expose: false }));
  }

  if (isNull(payload["meta"]["emailId"])) {
    return callback(new HttpErrors.BadRequest('emailId is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}Templates/templatesWithUserData`;
  axios.post(url, payload).then(response => {
    //console.log(response)
    return callback(response);
  })
  .catch((error) => {
    let json = stringify(error);
    return callback(json);
  });
}


const funCreateContract = function (BASE_URL,payload,callback) {
  if (isNull(payload["meta"]["businessId"])) {
    return callback(new HttpErrors.BadRequest('businessId is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}Contracts/createContract`;
  axios.post(url, payload).then(response => {
    //console.log(response)
    return callback(response);
  })
  .catch((error) => {
    let json = stringify(error);
    return callback(json);
  });
}


const funEditContract = function (BASE_URL,payload,callback) {
  if (isNull(payload["meta"]["businessId"])) {
    return callback(new HttpErrors.BadRequest('businessId is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}Contracts/editContract`;
  axios.post(url, payload).then(response => {
    //console.log(response)
    return callback(response);
  })
  .catch((error) => {
    let json = stringify(error);
    return callback(json);
  });
}

const funDeleteContract = function (BASE_URL,payload,callback) {
  if (isNull(payload["meta"]["contractId"])) {
    return callback(new HttpErrors.BadRequest('contractId is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}Contracts/deleteContract`;
  axios.post(url, payload).then(response => {
    //console.log(response)
    return callback(response);
  })
  .catch((error) => {
    let json = stringify(error);
    return callback(json);
  });
}


const funListContracts = function (BASE_URL,payload,callback) {
  if (isNull(payload["meta"]["businessId"])) {
    return callback(new HttpErrors.BadRequest('businessId is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}Contracts/listContracts`;
  axios.post(url, payload).then(response => {
    //console.log(response)
    return callback(response);
  })
  .catch((error) => {
    let json = stringify(error);
    return callback(json);
  });
}

const funListContractsForUser = function (BASE_URL,payload,callback) {
  if (isNull(payload["meta"]["businessId"])) {
    return callback(new HttpErrors.BadRequest('businessId is mandatory.', { expose: false }));
  }

  if (isNull(payload["meta"]["emailId"])) {
    return callback(new HttpErrors.BadRequest('emailId is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}Contracts/listContractsForUser`;
  axios.post(url, payload).then(response => {
    //console.log(response)
    return callback(response);
  })
  .catch((error) => {
    let json = stringify(error);
    return callback(json);
  });
}

const funGetUserAllContracts = function (BASE_URL,payload,callback) {
  if (isNull(payload["meta"]["emailId"])) {
    return callback(new HttpErrors.BadRequest('emailId is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}Contracts/userAllContracts`;
  axios.post(url, payload).then(response => {
    //console.log(response)
    return callback(response);
  })
  .catch((error) => {
    let json = stringify(error);
    return callback(json);
  });
}

const funCreateAndSendContract = function (BASE_URL,payload,callback) {
  if (isNull(payload["meta"]["businessId"])) {
    return callback(new HttpErrors.BadRequest('businessId is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}Contracts/createAndSendContract`;
  axios.post(url, payload).then(response => {
    //console.log(response)
    return callback(response);
  })
  .catch((error) => {
    let json = stringify(error);
    return callback(json);
  });
}



const funSendContract = function (BASE_URL,payload,callback) {
  if (isNull(payload["meta"]["businessId"])) {
    return callback(new HttpErrors.BadRequest('businessId is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}Contracts/sendContract`;
  axios.post(url, payload).then(response => {
    //console.log(response)
    return callback(response);
  })
  .catch((error) => {
    let json = stringify(error);
    return callback(json);
  });
}



const funAssignWebhook = function (BASE_URL,payload,callback) {
  if (isNull(payload["meta"]["businessId"])) {
    return callback(new HttpErrors.BadRequest('businessId is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}BizProfile/saveWebhookUrlForBiz`
  axios.post(url, payload).then(response => {
    //console.log(response)
    return callback(response);
  })
  .catch((error) => {
    let json = stringify(error);
    return callback(json);
  });
}

const funCheckIfTemplateHasSigningFields = function (BASE_URL,payload,callback) {
  if (isNull(payload["meta"]["businessId"])) {
    return callback(new HttpErrors.BadRequest('businessId is mandatory.', { expose: false }));
  }

  if (isNull(payload["meta"]["templateId"])) {
    return callback(new HttpErrors.BadRequest('templateId is mandatory.', { expose: false }));
  }

  let url = `${BASE_URL}Templates/checkSigningFields`
  axios.post(url, payload).then(response => {
    //console.log(response)
    return callback(response);
  })
  .catch((error) => {
    let json = stringify(error);
    return callback(json);
  });
}



module.exports = ContractManagerServices;
