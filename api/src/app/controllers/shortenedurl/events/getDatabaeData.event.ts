import { 
  THttpRequest,THttpResponse,
  IController,
  TValidateResult,
  TResponseSuccessWithData,
  TDic
 } from '@/core/types';

import {StatusCode} from '@/core/common/enums'
const { Success, ClientError } = StatusCode

import { timeDiff, formatDate, generateCode ,generateRandomNumer} from '@/core/functions';

import { ShortenedURLModel, TShortenedURL } from '@/app/models/shortenedUrl.model';

import config from '@/core/common/config' 

export async function GetDatabaeDataEvent<T extends IController>(me: T, req: THttpRequest, res: THttpResponse): Promise<void> {
  const formData = req.body;
  // Begin Validation
  await me.validator.Rule(
    async v=>{
      v.input('code',formData.code).isValidUrl("Please provide valid url address")
    }
  )
  // End Validation
  const vResult: TValidateResult = await me.validator.validate();
  if(vResult.status){
    let objInsertedRw:TDic = {
      'code':formData.code,
      'full_url':'this is full data',
    }
    let returnData:TResponseSuccessWithData = {
      message:"Successfully Generated",
      data:objInsertedRw
    };
    me.response(res,Success.OK,returnData);
  }
  else{
    me.response(res,ClientError.BadRequest,{errors:vResult.errors})
  }
  
  
}