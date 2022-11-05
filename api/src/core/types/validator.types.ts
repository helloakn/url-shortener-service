export type TValidationResult = {
  [key: string]: Array<string>
}
export type TValidateResult = {status:boolean,errors:TValidationResult}

export type TMsg =  string | boolean

export interface IProperty {
  _value?: string|number|boolean|any,
  Errors: Array<string>,
  PromiseList:Promise<TMsg>[]
}



