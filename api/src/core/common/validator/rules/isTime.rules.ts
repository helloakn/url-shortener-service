import {IProperty,TMsg} from '@/core/types/validator.types'

const isValidTime = (_time:string): boolean=>{
  return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(_time)
}
export function funIsTime<T extends IProperty>(me: T, errMsg?:string): T {
  const obj:Promise<TMsg> = new Promise((resolve) => {
    try {
      if(isValidTime(me._value)){
        resolve(false)
      }
      else{
        errMsg = errMsg==undefined?`not valid time format`:errMsg
        me.Errors.push(errMsg);
        resolve(errMsg)
      }
    }
    catch(err) {
      errMsg = errMsg==undefined?`not valid time`:errMsg
        me.Errors.push(errMsg);
        resolve(errMsg)
    }
  }); //Promise
  me.PromiseList.push(obj);
  return me;
}