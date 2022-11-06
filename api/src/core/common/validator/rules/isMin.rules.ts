import {IProperty,TMsg} from '@/core/types/validator.types'

export function funIsMin<T extends IProperty>(me: T, _min: number, errMsg?:string): T {
  const obj:Promise<TMsg> = new Promise((resolve) => {
    try {
      if(me._value.length>=_min){
        resolve(false)
      }
      else{
        errMsg = errMsg==undefined?`The minimum lenght must be ${_min}`:errMsg
        me.Errors.push(errMsg);
        resolve(errMsg)
      }
    }
    catch(err) {
      errMsg = errMsg==undefined?`The minimum lenght must be ${_min}`:errMsg
        me.Errors.push(errMsg);
        resolve(errMsg)
    }
  }); //Promise
  me.PromiseList.push(obj);
  return me;
}