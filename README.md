# contract_manager_module_prodio

`contract_manager_module_prodio` is NodeJS client for the `contract_manager_services_prodio API`. 


# Prerequisite (Things to do before installing this module):
 * Clone its dependency repository first on your server git clone https://github.com/ProdioDesignWorks/contract_manager_services_prodio.git
 * Navigate to your repo cd contract_manager_services_prodio
 * Install dependencies npm install
 * Start service node . or npm start or node server/server.js
 * Open http://localhost:3050/explorer/ in your browser
 * If you've pm2 installed then use this pm2 start server/server.js --name="CM_SERVICE"
 * When you install `contract_manager_module_prodio`, it will ask question for the BASE_URL of this `CM_SERVICE` - eventually.



# Features!
  
### Functions

* Connect Account with eSignGenie

* Add/Remove Personalized Fields

* Add/Edit/Delete Templates

* Send Custom Contracts


# Installation

$ npm install contract_manager_module_prodio@latest --save


# FIRST STEP

The QBO has Oauth2.0 Authentication process. So it requires to verify our app FOR THE VERY FIRST TIME MANUALLY, with the QB App created to get app access token, then from next time the code will auto create the refresh token, before the expiration of the current token.

1. You will need to login into QuickBooks developer account.

2. You will have to create a app ( sometimes there is already default app created ).

3. You will have to insert your API Callback URL in the app settings page.

4. You will have to copy `clientId` and `clientSecret` keys from the app settings, and put inside the `QBConfig.json` file.

5. You can make different different apps for diff diff environments.

6. After you the APIs on the host and its running -- use this URL to verify once.

http://{DOMAIN}:3050/api/Oauth2Data/connectQuickBooks

7. Note that, this is One Time Process, which has to be done prior using the APIs.

8. After successful connection, you will see a JSON displayed on the browser. You will have to ignore that.

  
# Initialization 
Require the contract_manager_module_prodio module and initialize the quickbooks npm module client.
```JSX

 const contractManagerClass = require('contract_manager_module_prodio');
 const contractManagerObj = new contractManagerClass(BASE_URL); //BASE_URL => is the url where its loopback apis are running. eg. (http://localhost:3050/api/)
 ``` 


### Method

`1. CREATE PERSONALIZED FIELDS:`

 	The very first and MANUAL step is to create all of your custom database fields which you may wants to map onto Contract/Agreement, you need to add those inside the eSignGenie
 	Dashboard manually.. then you have to save them in this api also.


### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `ADD_PERSONALIZED_FIELDS` | key which defines the type of action to be performed | YES |
| `meta` | json | [SAMPLE_META_INFO](/jsons/add_fields.json) | Json having business details. | YES |


#### Example

```JSX
	const payload = {
	    "action": "ADD_PERSONALIZED_FIELDS",
	    "meta": SAMPLE_META_INFO
	};
	//adding personalized fields into the module
	contractManagerObj.execute(payload, function(response) {
	    if (typeof response == "string" || typeof response === "string") {
	        response = JSON.parse(response);
	    }

	    if (!isNull(response.data)) {
	        let serverResponse = response["data"];
	        if (typeof serverResponse == "string" || typeof serverResponse === "string") {
	            serverResponse = JSON.parse(response["data"]);
	        }

	        if (!isNull(serverResponse.error)) {
	            //Error Response
	            return cb(new HttpErrors.InternalServerError(response.data.error.message, {
	                expose: false
	            }));
	        } else {
	            // HTTP : 200 , Success Response , Merchant Successfully Created!!
	            return cb(null, response.data);
	        }
	    } else {
	        if (!isNull(response["response"])) {
	            let serverResponse = response["response"]["data"];
	            if (typeof serverResponse == "string" || typeof serverResponse === "string") {
	                serverResponse = JSON.parse(response["response"]["data"]);
	            }

	            let serverResponseError = serverResponse["error"];
	            if (typeof serverResponseError == "string" || typeof serverResponseError === "string") {
	                serverResponseError = JSON.parse(serverResponseError["error"]);
	            }

	            let _msg = isNull(serverResponseError["message"]) ? 'Internal Server Error' : serverResponseError["message"];

	            //Error Response
	            return cb(new HttpErrors.InternalServerError(_msg, {
	                expose: false
	            }));
	        } else {
	            let _msg = isNull(response["data"]["message"]) ? 'Internal Server Error' : response["data"]["message"];

	            //Error Response
	            return cb(new HttpErrors.InternalServerError(_msg, {
	                expose: false
	            }));
	        }
	    }
	});
```

`2. REMOVE PERSONALIZED FIELDS:`

 	If you ever remove personalized fields from dashboard, make sure you also remove them from the module.


### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `REMOVE_PERSONALIZED_FIELDS` | key which defines the type of action to be performed | YES |
| `meta` | json | [SAMPLE_META_INFO](/jsons/remove_fields.json) | Json having business details. | YES |


`3. CREATE TEMPLATE:`

 	You can create multiple templates and keep it for later use.
 	Note that here the module accepts the RemotePDF url, so you need to upload your pdf document to some host like AWS S3..and then pass the s3 url to this function.
 	In the response you will get "embeddedURL" from eSignGenie which you have to open inside of your application as Iframe or normal. 


### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `CREATE_TEMPLATE` | key which defines the type of action to be performed | YES |
| `meta` | json | [SAMPLE_META_INFO](/jsons/create_template.json) | Json having business details. | YES |


`4. EDIT TEMPLATE:`

 	You can edit already created template.


### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `EDIT_TEMPLATE` | key which defines the type of action to be performed | YES |
| `meta` | json | [SAMPLE_META_INFO](/jsons/edit_template.json) | Json having business details. | YES |


`5. GET TEMPLATE DETAILS:`

 	This will return all the details about the specific template.


### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `GET_TEMPLATE_DETAILS` | key which defines the type of action to be performed | YES |
| `meta` | json | [SAMPLE_META_INFO](/jsons/get_template_details.json) | Json having business details. | YES |


`6. DELETE TEMPLATE:`

 	This will DELETE specific template already saved.


### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `DELETE_TEMPLATE` | key which defines the type of action to be performed | YES |
| `meta` | json | [SAMPLE_META_INFO](/jsons/delete_template.json) | Json having business details. | YES |


`7. LIST ALL TEMPLATES:`

 	This will return all the templates saved so far with respect to any business/site.


### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `LIST_TEMPLATES` | key which defines the type of action to be performed | YES |
| `meta` | json | [SAMPLE_META_INFO](/jsons/list_all_templates.json) | Json having business details. | YES |


`8. CREATE CONTRACT:`

 	You can convert a template into contract by providing the actual values of custom fields added inside the template. So in this function you have to pass all the personalized fields created with their actual values which you want to see with respect to particular receiver.
 	The contract can also contrain multiple templates init.
 	You just have to the required template Ids in the array.


### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `CREATE_CONTRACT` | key which defines the type of action to be performed | YES |
| `meta` | json | [SAMPLE_META_INFO](/jsons/create_contract.json) | Json having business details. | YES |


`9. EDIT CONTRACT:`

 	You can edit basic information about the contract.


### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `EDIT_CONTRACT` | key which defines the type of action to be performed | YES |
| `meta` | json | [SAMPLE_META_INFO](/jsons/edit_contract.json) | Json having business details. | YES |


`10. DELETE CONTRACT:`

 	You can delete the specific contract.


### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `DELETE_CONTRACT` | key which defines the type of action to be performed | YES |
| `meta` | json | [SAMPLE_META_INFO](/jsons/delete_contract.json) | Json having business details. | YES |


`11. LIST ALL CONTRACTS:`

 	This will return listing of all contracts created so far with respect to a business.


### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `DELETE_CONTRACT` | key which defines the type of action to be performed | YES |
| `meta` | json | [SAMPLE_META_INFO](/jsons/delete_contract.json) | Json having business details. | YES |


`11. SEND CONTRACT:`

 	This will send the contract to the given receiver via email. ( if you want to send email via eSignGenie -- otherwise if you have your email system - then get the contractViewUrl from the create contract function - and send that url to your receivers )


### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `SEND_CONTRACT` | key which defines the type of action to be performed | YES |
| `meta` | json | [SAMPLE_META_INFO](/jsons/send_contract.json) | Json having business details. | YES |


`12. CEATE AND SEND CONTRACT:`

 	This will create and send the contract that time only to the given receiver via email. ( if you want to send email via eSignGenie -- otherwise if you have your email system - then get the contractViewUrl from the create contract function - and send that url to your receivers )


### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `CREATE_SEND_CONTRACT` | key which defines the type of action to be performed | YES |
| `meta` | json | [SAMPLE_META_INFO](/jsons/create_and_send_contract.json) | Json having business details. | YES |
