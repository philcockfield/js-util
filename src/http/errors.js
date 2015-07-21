import _ from 'lodash';


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
