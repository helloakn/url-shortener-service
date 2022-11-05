export enum RequestMethod {
  Post = 'post',
  Get = 'get',
  Put = 'put',
  Delete = 'delete'
}

// export enum StatusCode{
//   Ok = 200,
//   Created =  201,
//   Accepted =  202,
//   NoContent =  204,
//   BadRequest =  400,
//   UnAuthorize =  401,
//   Forbidden =  403,
//   NotFound =  404,
//   NotAcceptable =  406,
//   UnSupportedMediaType =  415,
//   UpgradeRequired =  426,
//   TooManyRequests =  429
// } 

export const StatusCode = {
  Success:{
    OK:200,
    Created:201,
    Accepted:202,
    NoContent:204
  },
  Redirection:{
    MovePermanently:301,
    TemporaryRedirect:307,
    PermanentRedirect:308
  },
  ClientError:{
    BadRequest:400,
    Unauthorized:401,
    PaymentRequired:402,
    Forbidden:403,
    NotFound:404,
    MethodNotAllow:405,
    TooManyRequests:429
  }
}