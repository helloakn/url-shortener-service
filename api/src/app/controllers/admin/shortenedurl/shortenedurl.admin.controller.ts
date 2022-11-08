import Controller from '@/core/common/controller.common'
import { THttpApplication,THttpRequest, THttpResponse, IEvent } from '@/core/types/http.types';

import { GenerateEvent } from './events/generate.event';

export class ShortenedUrlAdminController extends Controller{
  constructor(public httpServer: THttpApplication){
    super(httpServer);
  }

  GenerateUrlFunction = async (req: THttpRequest, res: THttpResponse) => GenerateEvent<Controller>(this,req,res)
  
}
