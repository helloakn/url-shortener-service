import {customRuleFunction} from './rules/customRule.types'
import { funIsEmpty } from './rules/isEmpty.rules'
import { funIsMin } from './rules/isMin.rules'
import { funIsMax } from './rules/isMax.rules'
import { funIsTime } from './rules/isTime.rules'

import {TMsg} from '@/core/types/validator.types'

export namespace InputValidation {
  export class Rules{

    Errors: Array<string> = []
    PromiseList:Promise<TMsg>[] = [];

    constructor(public _key:string,public _value:string|number|boolean|any){}

    customRule=(_callBack:(me:Rules)=> Promise<boolean>|boolean,errMsg?: string)=>customRuleFunction<Rules>(this,_callBack,errMsg)

    isMin=(minLength:number,errMsg?: string)=>funIsMin<Rules>(this,minLength,errMsg)

    isMax=(maxLength:number,errMsg?: string)=>funIsMax<Rules>(this,maxLength,errMsg)

    isEmpty=(errMsg?: string)=>funIsEmpty<Rules>(this,errMsg)

    isValidTime=(errMsg?: string)=>funIsTime<Rules>(this,errMsg)

    evulate=():void=>{
      console.log(this.Errors)
    }
  }
}