import {IProperty,TMsg} from '@/core/types/validator.types'
import { isValidUrl } from '@/core/functions';

export function funIsValidUrl<T extends IProperty>(me: T,errMsg?:string): T {
  const obj:Promise<TMsg> = new Promise((resolve) => {
    if(me._value==undefined){
      errMsg = errMsg==undefined?'Should not be empty':errMsg
      me.Errors.push(errMsg);
      resolve(errMsg)
    }
    else if(!isValidUrl(me._value)){
      errMsg = errMsg==undefined?'Invalid Url':errMsg
      me.Errors.push(errMsg);
      resolve(errMsg)
    }
    else{
      resolve(false)
    }
  }); //Promise

  me.PromiseList.push(obj);
  return me;
}