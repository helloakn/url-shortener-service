import { 
  THttpRequest,THttpResponse,
  IController,
  TValidateResult,
  TResponseSuccessWithData,
  TPaginateNData,
  TResponseSuccessWithPaginateData,
  TDic
 } from '@/core/types';

import {StatusCode} from '@/core/common/enums'
const { Success, ClientError } = StatusCode

import { timeDiff, formatDate, generateCode ,generateRandomNumer} from '@/core/functions';

import { ShortenedURLModel, TShortenedURL } from '@/app/models/shortenedUrl.model';

export async function GetListFunctionEvent<T extends IController>(me: T, req: THttpRequest, res: THttpResponse): Promise<void> {
  const formData = req.body;
  // Begin Validation
  await me.validator.Rule(
    async v=>{
      v.input('page_at',formData.page_at)
        .isInjectionInput('not acceptable input')
        .isEmpty('Shoud not be empty')
        .isNumber('Must be number')

      v.input('row_count',formData.row_count)
        .isInjectionInput('not acceptable input')
        .isEmpty('Shoud not be empty')
        .isNumber('Must be number')

      v.input('search',formData.search)
        .isInjectionInput('not acceptable input')
        .customRule( 
          (that):boolean=>{
            if(!(formData.search == undefined || formData.search =='')){
              that.isMax(50,'Maximum length of the search word is 50')
            }
            return true;
          }
        ,'');
    }
  )
  // End Validation
  const vResult: TValidateResult = await me.validator.validate();
  if(vResult.status){
    const shortenedUrlModel = new ShortenedURLModel<TShortenedURL>();
    let searchWord:string = '';
    if(!(formData.search==undefined || formData.search=='')){
      searchWord =formData.search
    }

    let results:TPaginateNData = await shortenedUrlModel
    .getList(searchWord,formData.row_count,formData.page_at)

    if(results == null){ 
      me.response(res,Success.NoContent);
   }
   else{
     const msgBody: TResponseSuccessWithPaginateData = {
       message:"Success",
       //data:results.data as unknown as TDic
       body:results
     };
     me.response(res,Success.OK,msgBody);
   }
    
  }
  else{
    me.response(res,ClientError.BadRequest,{errors:vResult.errors})
  }
  
}