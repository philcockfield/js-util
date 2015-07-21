/* global XMLHttpRequest */
import _ from 'lodash';
import Promise from 'bluebird';


/**
 * Describes an error that occured during an XMLHttpRequest operation.
 */
export class HttpError extends Error {
  constructor(status, message, statusText) {
    super();
    if (_.isEmpty(message)) { message = 'Failed while making Http request to server.'; }
    this.message = message;
    this.status = status;
    this.statusText = statusText;
  }
}


/**
 * Describes an error resulting from parsing response
 * data from an HTTP request.
 */
export class HttpParseError extends Error {
  constructor(responseText, parseError) {
    super();
    this.message = `Failed to parse: '${ responseText }'`;
    this.responseText = responseText;
    this.parseError = parseError;
  }
}


const isJson = (text) => {
  if (_.isEmpty(text)) { return false; }
  if (text.startsWith('{') && text.endsWith('}')) { return true; }
  if (text.startsWith('[') && text.endsWith(']')) { return true; }
  return false;
};


const handleComplete = (xhr, resolve, reject) => {
    if (xhr.status !== 200) {
      // Failed.
      reject(new HttpError(xhr.status, xhr.responseText, xhr.statusText));

    } else {

      // Success.
      let response = xhr.responseText;
      if (isJson(response)) {
        try { response = JSON.parse(response); }
        catch (err) {
          reject(new HttpParseError(xhr.responseText, err));
          return;
        }
      }
      resolve(response);
    }
};



const send = (verb, url, data) => {
  return new Promise((resolve, reject) => {
      let xhr = api.createXhr();
      xhr.open(verb, url);
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            handleComplete(xhr, resolve, reject);
          }
      };
      if (_.isObject(data)) { data = JSON.stringify(data); }
      xhr.send(data);
  });
};




let api = {
  HttpError: HttpError,
  HttpParseError: HttpParseError,

  /**
  * Factory for the XHR object.
  * Swap this method out to a fake object for testing.
  */
  createXhr() {
    // NB: Only available when in the browser.
    return new XMLHttpRequest();
  },


  /**
  * Perform a GET operation against the given URL.
  * @param url: URL of the resource.
  * @return promise.
  */
  get(url, data) { return send('GET', url, data); },


  /**
  * Performs a POST operation against the given URL.
  *
  *   In REST/Resource-Oriented systems the POST verb
  *   means "create a new resource".
  *
  * @param url:   URL of the resource.
  * @param data:  The data to send (a primitive value or an object,
  *               will be transformed and sent as JSON).
  * @return promise.
  */
  post(url, data) { return send('POST', url, data); },


  /**
  * Performs a PUT operation against the given URL.
  *
  *   In REST/Resource-Oriented systems the PUT verb
  *   means "update a resource".
  *
  * @param url:   URL of the resource.
  * @param data:  The data to send (a primitive value or an object,
  *               will be transformed and sent as JSON).
  * @return promise.
  */
  put(url, data) { return send('PUT', url, data); },


  /**
  * Performs a DELETE operation against the given URL.
  *
  *   In REST/Resource-Oriented systems the DELETE verb
  *   means "remove the resource".
  *
  * @param url:   URL of the resource.
  * @return promise.
  */
  delete(url) { return send('DELETE', url); }


};



export default api;
