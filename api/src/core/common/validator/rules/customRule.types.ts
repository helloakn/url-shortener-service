import {IProperty,TMsg} from '@/core/types/validator.types'

export function customRuleFunction<T extends IProperty>(
    me: T,
    _callBack:(me:T)=> Promise<boolean>|boolean ,
    errMsg?:string
  ): T {
  const obj:Promise<TMsg> = new Promise(async (resolve) => {
    const callBackValue = await _callBack(me);
    console.log('callBackValue',callBackValue)
    if(callBackValue==false){
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