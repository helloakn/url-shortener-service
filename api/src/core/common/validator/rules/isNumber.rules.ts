import {IProperty,TMsg} from '@/core/types/validator.types'

export function funIsNumber<T extends IProperty>(me: T,errMsg?:string): T {
  const obj:Promise<TMsg> = new Promise((resolve) => {
    if(me._value == undefined){
      errMsg = errMsg==undefined?' is not number.':errMsg
      me.Errors.push(errMsg);
      resolve(errMsg)
    }
    else if(isNaN(me._value)){
      errMsg = errMsg==undefined?' is not number.':errMsg
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