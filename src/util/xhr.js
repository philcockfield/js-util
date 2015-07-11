/* global XMLHttpRequest */
import _ from 'lodash';
import Promise from 'bluebird';


/**
* Describes an error that occured during an XMLHttpRequest operation.
*/
export class XhrError extends Error {
  constructor(xhr, message) {
    super();
    if (_.isEmpty(message)) { message = 'Failed while making Http request to server.'; }
    this.message = message;
    this.status = xhr.status;
    this.statusText = xhr.statusText;
  }
}


export class XhrParseError extends Error {
  constructor(xhr, err) {
    super();
    this.message = `Failed to parse: '${ xhr.responseText }'`;
    this.responseText = xhr.responseText;
    this.parseError = err;
  }
}


const isJson = (text) => {
  if (text.startsWith('{') && text.endsWith('}')) { return true; }
  if (text.startsWith('[') && text.endsWith(']')) { return true; }
  return false;
};


const handleComplete = (xhr, resolve, reject) => {
    if (xhr.status !== 200) {
      // Failed.
      reject(new XhrError(xhr, xhr.responseText));

    } else {

      // Success.
      let response = xhr.responseText;
      if (isJson(response)) {
        try { response = JSON.parse(response); }
        catch (err) {
          reject(new XhrParseError(xhr, err));
          return;
        }
      }
      resolve(response);
    }
};



let http = {
  XhrError: XhrError,
  XhrParseError: XhrParseError,

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
  get(url) {
    return new Promise((resolve, reject) => {
        let xhr = http.createXhr();
        xhr.open('GET', url, true);
        xhr.onload = () => handleComplete(xhr, resolve, reject);
        xhr.send();
    });
  },




  /**
  * Performs a POST operation against the given URL.
  * @param url: URL of the resource.
  * @return promise.
  */
  post(url, data) {
    return new Promise((resolve, reject) => {
        let xhr = http.createXhr();
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
              handleComplete(xhr, resolve, reject);
            }
        };
        if (_.isObject(data)) { data = JSON.stringify(data); }
        xhr.send(data);
    });
  }
};


export default http;
