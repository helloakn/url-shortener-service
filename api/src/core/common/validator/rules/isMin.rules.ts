import {IProperty,TMsg} from '../../../types/validator.types'

export function funIsMin<T extends IProperty>(me: T, _min: number, errMsg?:string): T {
  console.log('funIsMin',_min)
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
  console.log('funIsMin me',_min)
  me.PromiseList.push(obj);
  return me;
}