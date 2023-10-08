import { Injectable } from '@nestjs/common';

@Injectable()
export class ErrorService {
  /**
   * handle errors
   * @param {Object} error
   * @param {Object | String} error.err the error message or object
   * @param {Request} error.req request object
   * @param {Response} error.res response object
   * @param {Next} error.next next object
   */
  handler({
    err,
    req,
    res,
    next,
  }: {
    err: any;
    req?: any;
    res?: any;
    next?: any;
  }) {
    //console.log(err);
    console.log('errorHandler...');
    // console.error({ err,  })

    if (typeof err == 'string') err = { message: err };
    let statusCode = 500;
    let errObject: {
      level: string;
      error: any;
      message: string;
      statusCode: number;
      req: any;
    } = {
      level: 'error',
      error: true,
      message: 'unknown error',
      statusCode: 500,
      req: {},
    };
    errObject.level = 'error';

    if (err) {
      errObject.error = err;
      if (typeof err == 'object') {
        if (err.errors) errObject.error = err.errors;
        if (err.message) {
          errObject.message = err.message;
        }
        if (err.name) {
          if (err.name == 'ValidationError') {
            statusCode = 409;
          }
          if (err.name == 'TokenExpiredError') {
            statusCode = 401;
          }
        }
      }
    }

    errObject.statusCode = statusCode;
    if (!errObject.message) errObject.message = 'error';

    // console.log(errObject,'object')
    if (req) {
      errObject.req = {};
      errObject.req.ip =
        req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      errObject.req.user = req.user;
    }
    console.log(errObject);
    if (res) {
      console.log('error returned with res');
      return res.status(statusCode).json(errObject);
    }
    console.log('errObject no res');
    return errObject;
  }
}
