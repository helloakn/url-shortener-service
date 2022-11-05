import {IProperty,TMsg} from '../../../types/validator.types'

export function funIsEmpty<T extends IProperty>(me: T,errMsg?:string): T {
  const obj:Promise<TMsg> = new Promise((resolve) => {
    if(me._value == undefined){
      errMsg = errMsg==undefined?' is empty.':errMsg
      me.Errors.push(errMsg);
      resolve(errMsg)
    }
    else if(me._value == ""){
      errMsg = errMsg==undefined?' is empty.':errMsg
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