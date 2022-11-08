
import { THttpApplication} from '@/core/types/http.types';
//import { RequestMethod } from '../../core/common/enums';
import { RequestMethod } from '@/core/common/enums';
import { AdminAuthController } from '../controllers/admin/login/adminAuth.controller';

export const RouteAdminApi=(httpSrv: THttpApplication)=>{
  const adminAuthController = new AdminAuthController(httpSrv);

  //url=>{prefix}/{url}

  //api/admin/login
  adminAuthController
    .prefix('api/admin')
    // end point => api/admin/login
    .action(
      [RequestMethod.Post],
      "/login",adminAuthController.LogInFunction)
    
  }