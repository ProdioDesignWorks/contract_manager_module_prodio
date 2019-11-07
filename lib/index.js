'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/** 
 * By Shashikant Sharma 
 * 
 * This code will take the user action and based on the user action and payload it will call the respective payment service.
 *  
 */
// eslint-disable-next-line import/prefer-default-export
var axios = require('axios');

var _require = require('flatted/cjs'),
    parse = _require.parse,
    stringify = _require.stringify;

var HttpErrors = require('http-errors');

var isNull = function isNull(val) {
  if (typeof val === 'string') {
    val = val.trim();
  }
  if (val === undefined || val === null || typeof val === 'undefined' || val === '' || val === 'undefined') {
    return true;
  }
  return false;
};

var isJson = function isJson(str) {
  try {
    var obj = JSON.parse(JSON.stringify(str));
    if (obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null) {
      return true;
    }
  } catch (err) {
    return false;
  }
  return false;
};

function ContractManagerServices(BASE_URL) {
  this.execute = function (payload, callback) {
    // action key calls api.
    if (payload.action) {
      switch (payload.action) {
        case "ADD_PERSONALIZED_FIELDS":
          return funAddPersonalizedFields(BASE_URL, payload, callback);
          break;
        case "REMOVE_PERSONALIZED_FIELDS":
          return funRemovePersonalizedFields(BASE_URL, payload, callback);
          break;
        case "CREATE_TEMPLATE":
          return funCreateTemplate(BASE_URL, payload, callback);
          break;
        case "EDIT_TEMPLATE":
          return funEditTemplate(BASE_URL, payload, callback);
          break;
        case "GET_TEMPLATE_DETAILS":
          return funGetTemplateDetails(BASE_URL, payload, callback);
          break;
        case "DELETE_TEMPLATE":
          return funDeleteTemplate(BASE_URL, payload, callback);
          break;
        case "LIST_TEMPLATES":
          return funListTemplates(BASE_URL, payload, callback);
          break;
        case "CREATE_CONTRACT":
          return funCreateContract(BASE_URL, payload, callback);
          break;
        case "EDIT_CONTRACT":
          return funEditContract(BASE_URL, payload, callback);
          break;
        case "DELETE_CONTRACT":
          return funDeleteContract(BASE_URL, payload, callback);
          break;
        case "LIST_CONTRACTS":
          return funListContracts(BASE_URL, payload, callback);
          break;
        case "CREATE_SEND_CONTRACT":
          return funCreateAndSendContract(BASE_URL, payload, callback);
          break;
        case "SEND_CONTRACT":
          return funSendContract(BASE_URL, payload, callback);
          break;
        case "ASSIGN_WEBHOOK_URL":
          return funAssignWebhook(BASE_URL, payload, callback);
          break;
        default:
          var errorMessage = 'Please add BaseUrl.';
          return errorMessage;
          break;
      }
    } else {
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
var funAddPersonalizedFields = function funAddPersonalizedFields(BASE_URL, payload, callback) {
  if (isNull(payload["meta"]["businessId"])) {
    return callback(new HttpErrors.BadRequest('businessId is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'PersonalizedFields/addPersonalizedFields';
  axios.post(url, payload).then(function (response) {
    //console.log(response)
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

/**
* This function will call create account in QBO.
* @param BASE_URL - the initial host url for the service apis.
* @param payload - the required payload JSON to perform the operations.
* @param callback - to send the response back to the requester.
*/
var funRemovePersonalizedFields = function funRemovePersonalizedFields(BASE_URL, payload, callback) {
  if (isNull(payload["meta"]["businessId"])) {
    return callback(new HttpErrors.BadRequest('businessId is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'PersonalizedFields/removePersonalizedFields';
  axios.post(url, payload).then(function (response) {
    //console.log(response)
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funCreateTemplate = function funCreateTemplate(BASE_URL, payload, callback) {
  if (isNull(payload["meta"]["businessId"])) {
    return callback(new HttpErrors.BadRequest('businessId is mandatory.', { expose: false }));
  }

  if (isNull(payload["meta"]["templateUrl"])) {
    return callback(new HttpErrors.BadRequest('templateUrl is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'Templates/createTemplate';
  axios.post(url, payload).then(function (response) {
    //console.log(response)
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funEditTemplate = function funEditTemplate(BASE_URL, payload, callback) {
  if (isNull(payload["meta"]["businessId"])) {
    //return callback(new HttpErrors.BadRequest('businessId is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'Templates/editTemplate';
  axios.post(url, payload).then(function (response) {
    //console.log(response)
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funGetTemplateDetails = function funGetTemplateDetails(BASE_URL, payload, callback) {
  if (isNull(payload["meta"]["templateId"])) {
    return callback(new HttpErrors.BadRequest('templateId is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'Templates/getTemplateDetails';
  axios.post(url, payload).then(function (response) {
    //console.log(response)
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funDeleteTemplate = function funDeleteTemplate(BASE_URL, payload, callback) {
  if (isNull(payload["meta"]["templateId"])) {
    return callback(new HttpErrors.BadRequest('templateId is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'Templates/deleteTemplate';
  axios.post(url, payload).then(function (response) {
    //console.log(response)
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funListTemplates = function funListTemplates(BASE_URL, payload, callback) {
  if (isNull(payload["meta"]["businessId"])) {
    return callback(new HttpErrors.BadRequest('businessId is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'Templates/listAllTemplates';
  axios.post(url, payload).then(function (response) {
    //console.log(response)
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funCreateContract = function funCreateContract(BASE_URL, payload, callback) {
  if (isNull(payload["meta"]["businessId"])) {
    return callback(new HttpErrors.BadRequest('businessId is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'Contracts/createContract';
  axios.post(url, payload).then(function (response) {
    //console.log(response)
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funEditContract = function funEditContract(BASE_URL, payload, callback) {
  if (isNull(payload["meta"]["businessId"])) {
    return callback(new HttpErrors.BadRequest('businessId is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'Contracts/editContract';
  axios.post(url, payload).then(function (response) {
    //console.log(response)
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funDeleteContract = function funDeleteContract(BASE_URL, payload, callback) {
  if (isNull(payload["meta"]["contractId"])) {
    return callback(new HttpErrors.BadRequest('contractId is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'Contracts/deleteContract';
  axios.post(url, payload).then(function (response) {
    //console.log(response)
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funListContracts = function funListContracts(BASE_URL, payload, callback) {
  if (isNull(payload["meta"]["businessId"])) {
    return callback(new HttpErrors.BadRequest('businessId is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'Contracts/listContracts';
  axios.post(url, payload).then(function (response) {
    //console.log(response)
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funCreateAndSendContract = function funCreateAndSendContract(BASE_URL, payload, callback) {
  if (isNull(payload["meta"]["businessId"])) {
    return callback(new HttpErrors.BadRequest('businessId is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'Contracts/createAndSendContract';
  axios.post(url, payload).then(function (response) {
    //console.log(response)
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funSendContract = function funSendContract(BASE_URL, payload, callback) {
  if (isNull(payload["meta"]["businessId"])) {
    return callback(new HttpErrors.BadRequest('businessId is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'Contracts/sendContract';
  axios.post(url, payload).then(function (response) {
    //console.log(response)
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

var funAssignWebhook = function funAssignWebhook(BASE_URL, payload, callback) {
  if (isNull(payload["meta"]["businessId"])) {
    return callback(new HttpErrors.BadRequest('businessId is mandatory.', { expose: false }));
  }

  var url = BASE_URL + 'BizProfile/saveWebhookUrlForBiz';
  axios.post(url, payload).then(function (response) {
    //console.log(response)
    return callback(response);
  }).catch(function (error) {
    var json = stringify(error);
    return callback(json);
  });
};

module.exports = ContractManagerServices;