import { 
  THttpRequest,THttpResponse,
  IController,
  TValidateResult
 } from '@/core/types';

import {StatusCode} from '@/core/common/enums'
const { Success, ClientError } = StatusCode

import { timeDiff, formatDate } from '@/core/functions';

export async function GenerateEvent<T extends IController>(me: T, req: THttpRequest, res: THttpResponse): Promise<void> {
  const formData = req.body;
  // Begin Validation
  await me.validator.Rule(
    async v=>{
      v.input('url',formData.url).isValidUrl("Please provide valid url address")
      v.input('expire_date',formData.expire_date)
        .isEmpty("not allow empty")
        .isValidDateFormat("date format is wrong")
        .customRule( 
          ():boolean=>{
            // expiration date time must be greater than current datet time
            let expDateTime = formData.expire_date+' '+(formData.expire_time||'00:00')
            let tDiff: number = timeDiff(formatDate(new Date(),"yyyy-MM-dd h:mm:tt"),expDateTime)
            return tDiff>1;
          }
        ,'Expiration Date must be greater than current Date');

      v.input('expire_time',formData.expire_time)
        .customRule( 
          // if formData.expire_time is null/undefine, we do not need to validate
          // else we have to validate time format and time lenght. min : 00:00 and max: 23:59
          (that):boolean=>{
            if(!(formData.expire_time == undefined || formData.expire_time =='')){
              that.isValidTime('Format is {hh:mm}')
            }
            return true;
          }
        ,'');
    }
  )
  // End Validation
  const vResult: TValidateResult = await me.validator.validate();
  if(vResult.status){
    me.response(res,Success.OK,{message:"Successfully Generated"});
  }
  else{
    me.response(res,ClientError.BadRequest,{errors:vResult.errors})
  }
  
}