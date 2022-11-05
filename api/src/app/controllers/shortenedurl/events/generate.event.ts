import { 
  THttpRequest,THttpResponse,
  TResponseSuccessMsg,
  IController,
  TValidateResult
 } from '../../../../core/types';

import {StatusCode} from '../../../../core/common/enums'
const { Success } = StatusCode

export async function GenerateEvent<T extends IController>(me: T, req: THttpRequest, res: THttpResponse): Promise<void> {
  const formData = req.body;
  console.log('formData',formData)
  await me.validator.Rule(
    async v=>{
      v.input('url',formData.url)
        .isEmpty()
        .isMin(10,"minimumm is 10")
        .isMax(12,"no")
    }
  )

  const vResult: TValidateResult = await me.validator.validate();
    console.log('vResult',vResult)
  if(vResult.status){

    const msgBody: TResponseSuccessMsg = {message:"Successfully Added"};
    me.response(res,Success.OK,msgBody);
  }
  else{
    const msgBody: TResponseSuccessMsg = {message:"Validation Failed"};
    me.response(res,Success.OK,msgBody);
  }
  
}