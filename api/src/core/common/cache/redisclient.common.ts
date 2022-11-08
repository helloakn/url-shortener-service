import { createClient } from 'redis';
import * as redis from "redis";

import config from '@/core/common/config'
const url = `redis://${config.RedisConfig.user}:${config.RedisConfig.password}@${config.RedisConfig.host}:${config.RedisConfig.port}`
console.log('url',url)
console.log('config.RedisConfig',config.RedisConfig)
const redisClient = redis.createClient(
  {url:url}
)
redisClient.connect();
export class CacheLayer {
  public cacheConnection : typeof redisClient ;

  constructor(){
    this.cacheConnection = redisClient
  }
  async getData(_key:string):Promise<string|null>{
    let me = this;
    return new Promise(async (resolve)=>{
      resolve(await me.cacheConnection.get(_key));
    });
  }

  async setData(_key:string,_value:string):Promise<string|null>{
    let me = this;
    return new Promise(async (resolve)=>{
      resolve(await me.cacheConnection.set(_key,_value));
    });
  }
}