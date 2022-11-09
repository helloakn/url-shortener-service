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

import { timeDiff, formatDate} from '@/core/functions';

import { ShortenedURLModel, TShortenedURL } from '@/app/models/shortenedUrl.model';
import { CacheLayer } from '@/core/common/cache/redisclient.common';
interface TdeletedAt {deleted_at:string};
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
    console.log('data',data!.deleted_at)
    if(data==null){
      //no data
      me.response(res,ClientError.NotFound,{"message":"Not Found."})
    }
    else if(!(data!.deleted_at==null || data!.deleted_at==undefined)){
      me.response(res,ClientError.Gone,{"message":"already deleted."})
    }
    else{
      let expTime = data.expiration_date_time;
      let nowTime = formatDate(new Date(),"yyyy-MM-dd h:mm:tt");
      if(timeDiff(nowTime,expTime)>1){
        //  valid date time
        console.group('expiration date time')
        console.log('exp',expTime)
        console.log('now',nowTime)
        console.log('result',timeDiff(nowTime,expTime))
        console.groupEnd()
        let objInsertedRw:TDic = {
          'code':formData.code,
          'full_url':data.url,
          'from':'database'
        }
        let returnData:TResponseSuccessWithData = {
          message:"Successfully Retrieve",
          data:objInsertedRw
        };
        /* 
        * incrementHitCount(...) , 
        * we will keep hitcount increase for every single request
        * we will not wait this process to be finished, we will keep moving
        */
        shortenedUrlModel.incrementHitCount(data.short_code)
        if(data.hitcount>5){
          /* 
          * we will assume as the popular record if hitcount reach to max 5  
          * and then we will submit it to cache layer,
          * we will not wait this process to be finished too
          */
          const cacheLayer:CacheLayer = new CacheLayer();
          //put to redis for cache
          cacheLayer.setData(data.short_code,data.url,data.expiration_date_time)
          
        }
        me.response(res,Success.OK,returnData);
      }
      else{
        //it is exp record
        console.group('expiration date time')
        console.log('exp',expTime)
        console.log('now',nowTime)
        console.log('result',timeDiff(nowTime,expTime))
        console.groupEnd()
        console.log('expired')
        me.response(res,ClientError.Gone,{"message":"Already Expired."})
      }
    }
    
  }
  else{
    me.response(res,ClientError.BadRequest,{errors:vResult.errors})
  }
  
  
}