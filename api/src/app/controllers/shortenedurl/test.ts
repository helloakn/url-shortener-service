import { 
  THttpRequest,THttpResponse,
  TResponseSuccessMsg,
  IController
 } from '../../../core/types/http.types';

import {StatusCode} from '../../../core/common/enums'
const { Success } = StatusCode

export async function TestEvent<T extends IController>(me: T, req: THttpRequest, res: THttpResponse): Promise<void> {
  const formData = req.body;
  const msgBody: TResponseSuccessMsg = {message:"Successfully Added"};
  me.response(res,Success.OK,msgBody);
}