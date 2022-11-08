import {IProperty,TMsg} from '@/core/types/validator.types'
export function funIsInjectionInput<T extends IProperty>(me: T,errMsg?:string): T {
  const validWord = (word:string) => {
    return String(word)
        .match(/^[A-Za-z0-9]+$/);
  }; 
  const obj:Promise<TMsg> = new Promise((resolve) => {
    if(me._value==undefined){
      errMsg = errMsg==undefined?'This is not Valid Input':errMsg
      me.Errors.push(errMsg);
      resolve(errMsg)
    }
    else if(!validWord(me._value)){
      errMsg = errMsg==undefined?'This is not Valid Input':errMsg
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