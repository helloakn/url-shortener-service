import { 
  THttpRequest,THttpResponse,
  TResponseSuccessMsg,TResponseErrorObject,
  IController,
  TValidateResult
 } from '@/core/types';

import {StatusCode} from '@/core/common/enums'
const { Success, ClientError } = StatusCode

import { timeDiff } from '@/core/functions/timeDiff.function';
import { formatDate } from '@/core/functions/formatDate';

export async function GenerateEvent<T extends IController>(me: T, req: THttpRequest, res: THttpResponse): Promise<void> {
  const formData = req.body;
  await me.validator.Rule(
    async v=>{
      v.input('url',formData.url).isEmpty().isMin(10,"minimumm is 10").isMax(12,"no")
      v.input('expire_date',formData.expire_date)
        .isEmpty("not allow empty")
        .isValidDateFormat("date format is wrong")
        .customRule( 
          ():boolean=>{
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

  const vResult: TValidateResult = await me.validator.validate();
  if(vResult.status){
    const msgBody: TResponseSuccessMsg = {message:"Successfully cc"};
    me.response(res,Success.OK,msgBody);
  }
  else{
    const msgBody: TResponseErrorObject = {errors:vResult.errors};
    me.response(res,ClientError.BadRequest,msgBody)
  }
  
}