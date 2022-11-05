
import { 
  THttpApplication, 
  TRequestMethod, THttpResponse,TResponseSuccessMsg,
  IEvent
} from '../types/http.types';

export default class Controller{
  
  #_prefix:string = '';

  constructor(public httpServer: THttpApplication) {}

  prefix(url: string):Controller{
    this.#_prefix = url;
    return this;
  }
  action(methods : Array<TRequestMethod>, url: string, event:IEvent):Controller{
    /*
    * generate full url { prefix + url}
    * 
    * */
    const _url = ('/' + this.#_prefix + '/' + url).replace('//','/');
    const route = this.httpServer.route(`${_url}`);

    methods.forEach(method=>{
      switch(method){
        case 'post':
          route.post(event);
          break;
  
        case 'get':
          route.get(event);
          break;

        case 'put':
          route.put(event);
          break;

        case 'delete':
          route.delete(event);
          break;

      }//end Switch
    }) //end forEach
    return this;
  }
  
  response( res:THttpResponse, responseCode: number, responseData?:TResponseSuccessMsg):void{
    res.setHeader('Content-Type', 'application/json');
    
    if (typeof responseData == 'undefined') {
      res.status(responseCode).send({});
    }
    else{
      res.status(responseCode).send(JSON.stringify(responseData));
    }
  }

} 
