import Controller from '../../../core/common/controller.common'
import { THttpApplication,THttpRequest, THttpResponse } from '../../../core/types/http.types';

import { TestEvent } from './test';

export class ShortenedUrlController extends Controller{
  constructor(public httpServer: THttpApplication){
    super(httpServer);
  }

  TestMethod = async (req: THttpRequest, res: THttpResponse) => TestEvent<Controller>(this,req,res)

  
}
