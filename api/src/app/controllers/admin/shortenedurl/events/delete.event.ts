import { 
  THttpRequest,THttpResponse,
  IController,
  TValidateResult,
  TResponseSuccessWithData,
  TResponseSuccessMsg,
  TPaginateNData,
  TResponseSuccessWithPaginateData,
  TDic
 } from '@/core/types';

import {StatusCode} from '@/core/common/enums'
const { Success, ClientError } = StatusCode

import { timeDiff, formatDate, generateCode ,generateRandomNumer} from '@/core/functions';

import { ShortenedURLModel, TShortenedURL } from '@/app/models/shortenedUrl.model';
import { CacheLayer } from '@/core/common/cache/redisclient.common';

export async function DeleteEvent<T extends IController>(me: T, req: THttpRequest, res: THttpResponse): Promise<void> {
  const formData = req.body;
  // Begin Validation
  await me.validator.Rule(
    async v=>{
      v.input('code',formData.code)
      .isInjectionInput('not acceptable input')
      .isEmpty("short code should not be empty")
      .isMax(25,"maximum length of the code is 25")
    }
  )
  // End Validation
  const vResult: TValidateResult = await me.validator.validate();
  if(vResult.status){
    const shortenedUrlModel = new ShortenedURLModel<TShortenedURL>();
    let result = await shortenedUrlModel.DeleteByCode(formData.code)
    console.log('result',result)
    if(result.affectedRows>=1){
      (new CacheLayer()).delete(formData.code)
      const msgBody: TResponseSuccessMsg = {message:"Successfully Deleted"};
      me.response(res,Success.OK,msgBody);
    }
    else{
      me.response(res,Success.NoContent)
    }
    
  }
  else{
    me.response(res,ClientError.BadRequest,{errors:vResult.errors})
  }
  
}