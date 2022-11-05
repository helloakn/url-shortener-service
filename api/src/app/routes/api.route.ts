
import { THttpApplication} from '../../core/types/http.types';
import { RequestMethod } from '../../core/common/enums';

import {ShortenedUrlController} from '../controllers/shortenedurl/shortenedurl.controller'

export const RouteApi=(httpSrv: THttpApplication)=>{
  const shortenedUrlController = new ShortenedUrlController(httpSrv);

  //url=>{prefix}/{url}
  //shortenedurl/test
  shortenedUrlController
    .prefix('shortenedurl')
    //shortenedurl/test
    .action([RequestMethod.Post,RequestMethod.Get],"/test",shortenedUrlController.TestFunction)
    //shortenedurl/generateshortcode
    .action([RequestMethod.Post],"/generate",shortenedUrlController.GenerateUrlFunction)
}