import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

import { 
  THttpApplication, 
  TRequestMethod, THttpRequest,THttpResponse,TResponseSuccessMsg,TResponseMsgBody,
  IEvent,IEventCallBack,CustomRequest
} from '@/core/types';

import {Validator} from './validator'
import config from '@/core/common/config'
import {StatusCode} from '@/core/common/enums'
const { Success, ClientError } = StatusCode

export default class Controller{

  public validator: Validator;
  #_prefix:string = '';

  constructor(public httpServer: THttpApplication) {
    this.validator = new Validator();
  }

  prefix(url: string):Controller{
    this.#_prefix = url;
    return this;
  }
  eventSerializer(firstEvent:IEventCallBack,secondEvent:IEvent):IEvent{

    return async (req: THttpRequest, res: THttpResponse)=>{
        return await firstEvent(req,res,secondEvent);
    }
  }
  route(methods : Array<TRequestMethod>, url: string, event:IEvent):Controller{
    /*
    * generate full url { prefix + url}
    * 
    * */
    const _url = ('/' + this.#_prefix + '/' + url).replace('//','/');
    const route = this.httpServer.route(`${_url}`);

    methods.forEach(method=>{
      switch(method){
        case 'post':
          route.post(event);
          break;
  
        case 'get':
          route.get(event);
          break;

        case 'put':
          route.put(event);
          break;

        case 'delete':
          route.delete(event);
          break;

      }//end Switch
    }) //end forEach
    return this;
  }
  
  response( res:THttpResponse, responseCode: number, responseData?:TResponseMsgBody):void{
    res.setHeader('Content-Type', 'application/json');
    
    if (typeof responseData == 'undefined') {
      res.status(responseCode).send({});
    }
    else{
      res.status(responseCode).send(JSON.stringify(responseData));
    }
  }

  middleware=(_type:string,_callBack:IEvent):IEvent=>{
    return async (req: THttpRequest, res: THttpResponse)=>{
      try {
        const token:string |undefined= req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
          throw new Error(); 
        }
        if (token==null || token=='' || token == undefined){
          this.response(res,ClientError.Forbidden)
        }
        else{
          const decoded = jwt.verify(token, _type=='admin'?config.JKey.admin:config.JKey.admin);
          (req as CustomRequest).token = decoded;
          _callBack(req,res);
        }
      }catch (err) {
        this.response(res,ClientError.Forbidden,{error:'unauthorize access'})
      }
    }
  }

} 