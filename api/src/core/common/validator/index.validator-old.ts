import { InputValidation } from "./input.rules";
import {TMsg,TValidateResult,TValidationResult} from '@/core/types/validator.types'

type TRuleClassList = InputValidation.Rules;
type notFound = null | undefined;

export class Validator{
  #rulesClassList: Array<TRuleClassList> = [];

  // static SRule = async (_callBack:Function): Promise<Validator> =>{
  //   const validator = new Validator();
  //   await  _callBack(validator);
  //   return validator;  
  // }
  Rule= async (_callBack:(_v:Validator) => Promise<Validator>|any): Promise<Validator> =>{
    this.#rulesClassList = [];
    await _callBack(this);
    return this; 
  }

  input(_key:string,_value:string|number|boolean|any): InputValidation.Rules  {
    const v = new InputValidation.Rules(_key,_value);
    this.#rulesClassList.push(v);
    return v
  }

  validate = async (): Promise<TValidateResult>=>{
    const tmpPList : Promise<TMsg>[] = []
    this.#rulesClassList.forEach((v:TRuleClassList)=>{
      v.PromiseList.forEach((tmg:Promise<TMsg>)=>{
        tmpPList.push(tmg)
      });
    });

    const me = this;
    const vResult: TValidationResult = {};

    const result:Promise<TValidateResult> = Promise.all(tmpPList).then(values=>{
      const c: notFound|TMsg = values.find(e=> (typeof e=='string'))
      me.#rulesClassList.forEach((v:TRuleClassList)=>{
        if(v.Errors.length!=0){
          vResult[v._key] = v.Errors
        }
      });
      return {
        status: typeof c == 'undefined'? true : false,
        errors:vResult
      }
      //return tf;
    });
    return result;
  }
}