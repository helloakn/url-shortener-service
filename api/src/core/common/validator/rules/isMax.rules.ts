import {IProperty,TMsg} from '../../../types/validator.types'

export function funIsMax<T extends IProperty>(me: T, _max: number, errMsg?:string): T {
  const obj:Promise<TMsg> = new Promise((resolve) => {
    try {
      if(me._value.length<=_max){
        resolve(false)
      }
      else{
        errMsg = errMsg==undefined?`The maximum lenght must be ${_max}`:errMsg
        me.Errors.push(errMsg);
        resolve(errMsg)
      }
    }
    catch(err) {
      errMsg = errMsg==undefined?`The maximum lenght must be ${_max}`:errMsg
        me.Errors.push(errMsg);
        resolve(errMsg)
    }
  }); //Promise
  me.PromiseList.push(obj);
  return me;
}