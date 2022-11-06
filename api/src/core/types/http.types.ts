import Express from 'express';

import { Validator } from '@/core/common/validator';
import {TResponseErrorObject} from './validator.types'
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

/* ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 
* Custom Objects
*
* */

/*
* TResponseSuccessMsg =>
* { message:"success"}
*/
export type TResponseSuccessMsg = { message: string}

/*
* TDic => 
* { "key1":"value1","key2":"value2"...}
*/
export type TDic = {
  [key: string]: string | number | Date | null
}

/*
* TResponseSuccessWithData =>
* {
*   message:"success",
*   data:{ "key1":"value1","key2":"value2"...}
* }
*/
export type TResponseSuccessWithData = {
  message: string,
  data: TDic
}
/*
* TPaginateNData =>
* {
*    pagination: {
*      totalRecord:10,
*      countPerPage:10,
*      totalPage:10,
*      current_records:10,
*      page_at:10,
*   },
*   message:"success",
*   data:{ "key1":"value1","key2":"value2"...}
* }
*/
export type TPaginateNData = {
  pagination: {
    totalRecord:number,
    countPerPage:number,
    totalPage:number,
    current_records:number,
    page_at:number,
  },
  data: TDic
}

/*
* TResponseSuccessWithPaginateData =>
* {
*   message: "success",
*   body:{
*    pagination: {
*      totalRecord:10,
*      countPerPage:10,
*      totalPage:10,
*      current_records:10,
*      page_at:10,
*     },
*     message:"success",
*     data:{ "key1":"value1","key2":"value2"...}
*   }
* }
*/
export type TResponseSuccessWithPaginateData = {
  message: string,
  body:TPaginateNData
}
export type TResponseMsgBody = TResponseSuccessMsg 
| TResponseSuccessWithData | TResponseSuccessWithPaginateData 
| TResponseErrorObject 

// *** Contrller
export interface IController {
  validator: Validator,
  response:(res:THttpResponse,responseCode: number,responseData?:TResponseMsgBody)=>void
}