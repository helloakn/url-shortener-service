
import { THttpApplication} from '@/core/types/http.types';

import {RouteApi} from './api.route'
import {RouteSwagger} from './swagger.route'
import {RouteAdminApi} from './adminapi.route'

export const RouteConfig=(httpSrv: THttpApplication)=>{
  RouteApi(httpSrv)
  RouteAdminApi(httpSrv)
  RouteSwagger(httpSrv)
}



