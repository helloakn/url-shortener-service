import Controller from '@/core/common/controller.common'
import { THttpApplication,THttpRequest, THttpResponse, IEvent,
  TValidateResult,TResponseSuccessWithData} from '@/core/types';

import {StatusCode} from '@/core/common/enums'
const { Success, ClientError } = StatusCode

export class AdminAuthController extends Controller{
  constructor(public httpServer: THttpApplication){
    super(httpServer);
  }

  LogInFunction = async (req: THttpRequest, res: THttpResponse) => {
    const formData = req.body;
    // Begin Validation
    await this.validator.Rule(
      async v=>{
        v.input('email',formData.email).isEmail("Please provide valid email address")
        v.input('password',formData.password).isEmpty("Should not be Empty")
      }
    )
    // End Validation

    const vResult: TValidateResult = await this.validator.validate();
    if(vResult.status){
      let returnData:TResponseSuccessWithData = {
        message:"Successfully Login",
        data:{
          "token":"this is token"
        }
      };
      this.response(res,Success.OK,returnData);
    }
    else{
      this.response(res,ClientError.BadRequest,{errors:vResult.errors})
    }
    
  }

}
