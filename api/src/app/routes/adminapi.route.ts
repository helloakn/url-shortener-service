
import { THttpApplication} from '@/core/types/http.types';
//import { RequestMethod } from '../../core/common/enums';
import { RequestMethod } from '@/core/common/enums';
import { AdminAuthController } from '@/app/controllers/admin/login/login.controller';
import { ShortenedUrlAdminController } from '@/app/controllers/admin/shortenedurl/shortenedurl.admin.controller'

export const RouteAdminApi=(httpSrv: THttpApplication)=>{
  const asurlControl = new ShortenedUrlAdminController(httpSrv);
  const adminAuthController = new AdminAuthController(httpSrv);

  //url=>{prefix}/{url}

  //api/admin/login
  adminAuthController
    .prefix('api/admin')
    // end point => api/admin/login
    .route(
      [RequestMethod.Post],
      "/login",adminAuthController.LogInFunction)

  asurlControl
    .prefix('api/admin')  
    .route(
      [RequestMethod.Post],
      "/shortenedurl/getlist",
      asurlControl.middleware('admin',asurlControl.GetListFunction)
    )
    .route(
      [RequestMethod.Post],
      "/shortenedurl/delete",
      asurlControl.middleware('admin',asurlControl.DeleteFunction)
    )
    
  }