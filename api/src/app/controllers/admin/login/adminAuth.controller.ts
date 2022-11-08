import Controller from '@/core/common/controller.common'
import { THttpApplication,THttpRequest, THttpResponse, IEvent } from '@/core/types/http.types';


export class AdminAuthController extends Controller{
  constructor(public httpServer: THttpApplication){
    super(httpServer);
  }

  LogInFunction = async (req: THttpRequest, res: THttpResponse) => {
    const formData = req.body;
    await this.validator.Rule(
      async v=>{
        // vv.input('email',formData.email).isValidUrl("Please provide valid url address")
        // .input('password',formData.password).isValidUrl("Please provide valid url address")
        
      }
    )
  }

}
