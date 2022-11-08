import Controller from '@/core/common/controller.common'
import { THttpApplication,THttpRequest, THttpResponse, IEvent } from '@/core/types/http.types';

import { TestEvent } from './events/test.event';
import { GenerateEvent } from './events/generate.event';
import { GetCacheDataEvent } from './events/getCacheData.event';
import { GetDatabaeDataEvent } from './events/getDatabaeData.event';
export class ShortenedUrlController extends Controller{
  constructor(public httpServer: THttpApplication){
    super(httpServer);
  }

  TestFunction = async (req: THttpRequest, res: THttpResponse) => TestEvent<Controller>(this,req,res)

  GenerateUrlFunction = async (req: THttpRequest, res: THttpResponse) => GenerateEvent<Controller>(this,req,res)

  GetCacheData = async (req: THttpRequest, res: THttpResponse, callBack:IEvent) => GetCacheDataEvent<Controller>(this,req,res,callBack)

  GetDatbaseData = async (req: THttpRequest, res: THttpResponse) => GetDatabaeDataEvent<Controller>(this,req,res)

  
}
