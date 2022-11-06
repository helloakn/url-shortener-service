import Express from 'express';

import { Validator } from '@/core/common/validator';
/*
Interfaces for Express
*/

export type THttpRequest = Express.Request;
export type THttpResponse = Express.Response;
export type THttpApplication = Express.Application;

/*
* HTTP Request
*
* */
// for resetAPI, let's allow only [post,get,put and delete]
export type TRequestMethod = "post" | "get" | "put" | "delete"

export interface IEvent {
  (req: THttpRequest, res: THttpResponse): void;
}

/*
* HTTP Responses
*
* */
export type TResponseSuccessMsg = {
  message: string
}


// *** Contrller
export interface IController {
  validator: Validator,
  response:(res:THttpResponse,responseCode: number,responseData?:TResponseSuccessMsg)=>void
}