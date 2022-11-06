import {IProperty,TMsg} from '@/core/types/validator.types'

import { isValidDate } from '@/core/functions/isValidate.function';

export function funIsValidDateFormat<T extends IProperty>(me: T, errMsg?:string): T {
  const obj:Promise<TMsg> = new Promise((resolve) => {
    try {
      if(isValidDate(me._value)){
        resolve(false)
      }
      else{
        errMsg = errMsg==undefined?`not valid Date format`:errMsg
        me.Errors.push(errMsg);
        resolve(errMsg)
      }
    }
    catch(err) {
      errMsg = errMsg==undefined?`not valid Date`:errMsg
        me.Errors.push(errMsg);
        resolve(errMsg)
    }
  }); //Promise
  me.PromiseList.push(obj);
  return me;
}