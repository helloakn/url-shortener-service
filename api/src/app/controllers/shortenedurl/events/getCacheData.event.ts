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

import config from '@/core/common/config' 
import { CacheLayer } from '@/core/common/cache/redisclient.common';

export async function GetCacheDataEvent<T extends IController>(me: T, req: THttpRequest, res: THttpResponse,_callBack:IEvent): Promise<void> {
  const formData = req.body;
  // // Begin Validation
  await me.validator.Rule(
    async v=>{
      v.input('code',formData.code).isMax(25,"maximum length of the code is 25")
    }
  )
  // End Validation
  const vResult: TValidateResult = await me.validator.validate();
  if(vResult.status){
    const cacheLayer:CacheLayer = new CacheLayer();
    let fullUrl = await cacheLayer.getData(formData.code);
    console.log("fullUrl",fullUrl)
    console.log('GetCacheDataEvent');
    if(fullUrl==null){
      _callBack(req,res);
    }
    else{
      let responseData:TDic = {
        'code':formData.code,
        'full_url':fullUrl,
        'from':'cache'
      }
      let returnData:TResponseSuccessWithData = {
        message:"Successfully Generated",
        data:responseData
      };
      // => update hitcount +1
      me.response(res,Success.OK,returnData);
    }
  }
  else{
    me.response(res,ClientError.BadRequest,{errors:vResult.errors})
  }
  
}