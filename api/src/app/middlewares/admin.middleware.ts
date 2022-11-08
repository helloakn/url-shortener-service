
// import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

// import Controller from '@/core/common/controller.common'
// import { 
//   THttpRequest,THttpResponse,
//   IEvent
// } from '@/core/types';

// import config from '@/core/common/config'

// import {StatusCode} from '@/core/common/enums'
// const { Success, ClientError } = StatusCode

// export interface CustomRequest extends THttpRequest {
//   token: string | JwtPayload;
// }

// export class AdminAuthController extends Controller{
//   middleware(callBack:IEvent):IEvent=>{
//     return async (req: THttpRequest, res: THttpResponse)=>{
//       try {
//         const token:string |undefined= req.header('Authorization')?.replace('Bearer ', '');
//         if (!token) {
//           throw new Error(); 
//         }
//         if (token==null || token=='' || token == undefined){
//           this.response(res,ClientError.Forbidden)
//         }
//         else{
//           const decoded = jwt.verify(token, config.JKey.admin);
//           (req as CustomRequest).token = decoded;
//           callBack(req,res);
//         }
//       }catch (err) {
//         this.response(res,ClientError.Forbidden)
//       }
//     }
//   }
// }