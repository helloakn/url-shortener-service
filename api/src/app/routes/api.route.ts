
import { THttpApplication} from '../../core/types/http.types';
import { RequestMethod } from '../../core/common/enums';

import {ShortenedUrlController} from '../controllers/shortenedurl/shortenedurl.controller'

export const RouteApi=(httpSrv: THttpApplication)=>{
  const shortenedUrlController = new ShortenedUrlController(httpSrv);

  //url=>{prefix}/{url}
  //shortenedurl/test
  shortenedUrlController
    .prefix('shortenedurl')
    .action([RequestMethod.Post,RequestMethod.Get],"/test",shortenedUrlController.TestMethod)
}