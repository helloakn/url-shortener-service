import { createClient ,RedisClientType} from 'redis';
import * as redis from "redis";

import config from '@/core/common/config'
redis.createClient();

let redisClient: RedisClientType;

(async () => {
  //redisClient = redis.createClient();
  redisClient = createClient(
  {
    //url: 'redis://alice:foobared@awesome.redis.server:6380'
    url: `redis://${config.RedisConfig.host}:${config.RedisConfig.port}`
  })

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();


export class CacheLayer {
  public connection : RedisClientType ;

  constructor(){
    this.connection = redisClient
  }
  async getData(_key:string):Promise<string|null>{
    let me = this;
    return new Promise(async (resolve)=>{
      resolve(await me.connection.get(_key));
    });
    
  }
}