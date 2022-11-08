import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import Controller from '@/core/common/controller.common'
import { THttpApplication,THttpRequest, THttpResponse, IEvent,
  TValidateResult,TResponseSuccessWithData} from '@/core/types';

import config from '@/core/common/config'
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
      const token = jwt.sign({ userAccount: 'administrator',authType:"admin" }, config.JKey.admin, { expiresIn: '7d' });
      let returnData:TResponseSuccessWithData = {
        message:"Successfully Login",
        data:{
          "token":token
        }
      };
      this.response(res,Success.OK,returnData);
    }
    else{
      this.response(res,ClientError.BadRequest,{errors:vResult.errors})
    }
    
  }

}
