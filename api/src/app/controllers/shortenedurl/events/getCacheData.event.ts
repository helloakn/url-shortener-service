import { 
  THttpRequest,THttpResponse,
  IController,IEvent,IEventCallBack,
  TValidateResult,
  TResponseSuccessWithData,
  TDic
 } from '@/core/types';

import {StatusCode} from '@/core/common/enums'
const { Success, ClientError } = StatusCode

import { timeDiff, formatDate, generateCode ,generateRandomNumer} from '@/core/functions';

import { ShortenedURLModel, TShortenedURL } from '@/app/models/shortenedUrl.model';

import { CacheLayer } from '@/core/common/cache/redisclient.common';

export async function GetCacheDataEvent<T extends IController>(me: T, req: THttpRequest, res: THttpResponse,_callBack:IEvent): Promise<void> {
  const formData = req.body;
  // // Begin Validation
  await me.validator.Rule(
    async v=>{
      v.input('code',formData.code)
      .isEmpty("short code should not be empty")
      .isMax(25,"maximum length of the code is 25")
    }
  )
  // End Validation

  const vResult: TValidateResult = await me.validator.validate();
  if(vResult.status){
    const cacheLayer:CacheLayer = new CacheLayer();
    let fullUrl:string | null = await cacheLayer.getData(formData.code);
    if(fullUrl==null){
      /* 
      * if there is no data in Cache layer, 
      * we will forward this task to database layer.
      */
      _callBack(req,res);
    }
    else{
      /* 
      * incrementHitCount , 
      * we will keep hitcount increase for every single request
      * we will not wait this process to be finished, we will keep moving
      */
      (new ShortenedURLModel<TShortenedURL>()).incrementHitCount(formData.code)

      let responseData:TDic = {
        'code':formData.code,
        'full_url':fullUrl,
        'from':'cache'
      }
      let returnData:TResponseSuccessWithData = {
        message:"Successfully Generated",
        data:responseData
      };
      me.response(res,Success.OK,returnData);
    }
  }
  else{
    me.response(res,ClientError.BadRequest,{errors:vResult.errors})
  }
  
}