import { 
  THttpRequest,THttpResponse,
  IController,
  TValidateResult,
  TResponseErrorObject,
  TResponseSuccessWithData,
  TDic
 } from '@/core/types';

import {StatusCode} from '@/core/common/enums'
const { Success, ClientError } = StatusCode

import { timeDiff, formatDate, generateCode ,generateRandomNumer} from '@/core/functions';

import { ShortenedURLModel, TShortenedURL } from '@/app/models/shortenedUrl.model';
import { CacheLayer } from '@/core/common/cache/redisclient.common';

import config from '@/core/common/config' 

export async function GetDatabaeDataEvent<T extends IController>(me: T, req: THttpRequest, res: THttpResponse): Promise<void> {
  const formData = req.body;
  // Begin Validation
  await me.validator.Rule(
    async v=>{
      v.input('code',formData.code).isEmpty('should not be empty').isMax(25,"maximum length of the code is 25")
    }
  )
  // End Validation
  const vResult: TValidateResult = await me.validator.validate();
  if(vResult.status){
    const shortenedUrlModel = new ShortenedURLModel<TShortenedURL>();
    let data = await shortenedUrlModel.findByKey('short_code',formData.code)
    console.log('data',data)
    if(data==null){
      //no data
      const msgBody: TResponseErrorObject = {errors:vResult.errors};
      me.response(res,ClientError.NotFound,{"message":"Not Found."})
    }
    else{
      let objInsertedRw:TDic = {
        'code':formData.code,
        'full_url':data.url,
        'from':'database'
      }
      let returnData:TResponseSuccessWithData = {
        message:"Successfully Retrieve",
        data:objInsertedRw
      };
      shortenedUrlModel.incrementHitCount(data.short_code,data.hitcount+1)
      if(data.hitcount>5){
        //incrementHitCount
        const cacheLayer:CacheLayer = new CacheLayer();
        cacheLayer.setData(data.short_code,data.url)
        console.log('push to redis')
      }
      me.response(res,Success.OK,returnData);
    }
    
  }
  else{
    me.response(res,ClientError.BadRequest,{errors:vResult.errors})
  }
  
  
}