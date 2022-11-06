
import { THttpApplication} from '../../core/types/http.types';

import {RouteApi} from './api.route'
import {RouteSwagger} from './swagger.route'

export const RouteConfig=(httpSrv: THttpApplication)=>{
  RouteApi(httpSrv)
  RouteSwagger(httpSrv)
}



