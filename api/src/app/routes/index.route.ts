
import { THttpApplication} from '../../core/types/http.types';

import {RouteApi} from './api.route'

export const RouteConfig=(httpSrv: THttpApplication)=>{
  RouteApi(httpSrv)
}



