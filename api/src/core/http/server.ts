import express from 'express';
import * as bodyparser from 'body-parser';
import http from 'http'
import cors from 'cors'
import expressFileUpload from 'express-fileupload'

import {RouteConfig} from '@/app/routes/index.route'
import config from '@/core/common/config'
const { ServerConfig } = config

export class Server{
  public httpSvr: express.Application;
  port: number | string = ServerConfig.PORT;
  constructor(){
    this.httpSvr = express();
  }
 
  configure(){
    this.httpSvr.use(bodyparser.json());
    this.httpSvr.use(bodyparser.urlencoded({     // to support URL-encoded bodies
      extended: true
    })); 
    this.httpSvr.use(cors());
    this.httpSvr.use(express.json({ limit: '1000MB' }));

    this.httpSvr.use(expressFileUpload(
      {
          useTempFiles : false,
          tempFileDir : '/tmp/'
      }
    ));
    RouteConfig(this.httpSvr);
  }
  
  init(){
    this.configure();
    // this.httpSvr.listen(this.#port, () => {
    //  // console.log(`Server running at http://localhost:${this.#port}`)
    // });
    http.createServer(this.httpSvr).listen(this.port)
    
  }
}