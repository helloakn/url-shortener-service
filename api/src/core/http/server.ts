import express from 'express';
import * as bodyparser from 'body-parser';
import cors from 'cors'

import config from '../common/config'

const { ServerConfig } = config

export default class Server {
  private httpSvr: express.Application;
  #port: number | string = ServerConfig.PORT;

  constructor(){
    this.httpSvr = express();
  }

  init(): void{
    this.httpSvr.use(bodyparser.json());
    this.httpSvr.use(bodyparser.urlencoded({     // to support URL-encoded bodies
      extended: true
    })); 
    this.httpSvr.use(cors());
    this.httpSvr.use(express.json({ limit: '1000MB' }));

    this.httpSvr.listen(this.#port, () => {
      console.log(`Server running at http://localhost:${this.#port}`)
    });
  }
}