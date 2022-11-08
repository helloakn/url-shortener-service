import {IProperty,TMsg} from '@/core/types/validator.types'
export function funIsEmail<T extends IProperty>(me: T,errMsg?:string): T {
  const validateEmail = (email:string) => {
    return String(email)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  }; 
  const obj:Promise<TMsg> = new Promise((resolve) => {
    if(me._value==undefined){
      errMsg = errMsg==undefined?'This is not eMail address':errMsg
      me.Errors.push(errMsg);
      resolve(errMsg)
    }
    else if(!validateEmail(me._value)){
      errMsg = errMsg==undefined?'This is not eMail address':errMsg
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