import Controller from '@/core/common/controller.common'
import { THttpApplication,THttpRequest, THttpResponse, IEvent } from '@/core/types/http.types';

import { GetListFunctionEvent } from './events/getlist.event';
import { DeleteEvent } from './events/delete.event';

export class ShortenedUrlAdminController extends Controller{
  constructor(public httpServer: THttpApplication){
    super(httpServer);
  }

  GetListFunction = async (req: THttpRequest, res: THttpResponse) => GetListFunctionEvent<Controller>(this,req,res)

  DeleteFunction = async (req: THttpRequest, res: THttpResponse) => DeleteEvent<Controller>(this,req,res)
  
}
