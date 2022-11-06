export type TValidationResult = {
  [key: string]: Array<string>
}
export type TValidateResult = {status:boolean,errors:TValidationResult}

export type TMsg =  string | boolean

export type TResponseErrorRow = {
  [key: string]: Array<string>
}

export type TResponseErrorObject = {
  [key: string]: TResponseErrorRow
}



export interface IProperty {
  _value?: string|number|boolean|any,
  Errors: Array<string>,
  PromiseList:Promise<TMsg>[]
}



