import Controller from '@/core/common/controller.common'
import { THttpApplication,THttpRequest, THttpResponse } from '@/core/types/http.types';

import { TestEvent } from './test';
import { GenerateEvent } from './events/generate.event';

export class ShortenedUrlController extends Controller{
  constructor(public httpServer: THttpApplication){
    super(httpServer);
  }

  TestFunction = async (req: THttpRequest, res: THttpResponse) => TestEvent<Controller>(this,req,res)

  GenerateUrlFunction = async (req: THttpRequest, res: THttpResponse) => GenerateEvent<Controller>(this,req,res)

  
}
