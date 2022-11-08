
import { THttpApplication} from '@/core/types/http.types';
//import { RequestMethod } from '../../core/common/enums';
import { RequestMethod } from '@/core/common/enums';

import {ShortenedUrlController} from '@/app/controllers/shortenedurl/shortenedurl.controller'

export const RouteApi=(httpSrv: THttpApplication)=>{
  const shortenedUrlController = new ShortenedUrlController(httpSrv);

  //url=>{prefix}/{url}
  //shortenedurl/test
  shortenedUrlController
    .prefix('shortenedurl')
    //shortenedurl/test
    .action([RequestMethod.Post,RequestMethod.Get],"/test",shortenedUrlController.TestFunction)
    //shortenedurl/generate
    .action([RequestMethod.Post],"/generate",shortenedUrlController.GenerateUrlFunction)
    // callback test
    .action([RequestMethod.Post],"/retrieve-url",
      shortenedUrlController.eventSerializer(
        shortenedUrlController.GetCacheData,
        shortenedUrlController.GetDatbaseData
      )
    )
  }