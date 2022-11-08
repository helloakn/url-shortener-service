
import { THttpApplication} from '@/core/types/http.types';
//import { RequestMethod } from '../../core/common/enums';
import { RequestMethod } from '@/core/common/enums';

import {ShortenedUrlController} from '@/app/controllers/shortenedurl/shortenedurl.controller'

export const RouteApi=(httpSrv: THttpApplication)=>{
  const shortenedUrlController = new ShortenedUrlController(httpSrv);

  //url=>{prefix}/{url}
  //api/shortenedurl/test
  shortenedUrlController
    .prefix('api/shortenedurl')
    // end point => api/shortenedurl/test
    .action([RequestMethod.Post,RequestMethod.Get],"/test",shortenedUrlController.TestFunction)
    // end point => api/shortenedurl/generate
    .action([RequestMethod.Post],"/generate",shortenedUrlController.GenerateUrlFunction)
    // end point => api/shortenedurl/retrieve-url
    .action([RequestMethod.Post],"/retrieve-url",
      /*
      * firstly we will search in cache, 
      * if not found in cache layer, we will move to database layer to keep searching
      */
      shortenedUrlController.eventSerializer( 
        shortenedUrlController.GetCacheData, // cache layer
        shortenedUrlController.GetDatbaseData // database layer
      )
    )
  }