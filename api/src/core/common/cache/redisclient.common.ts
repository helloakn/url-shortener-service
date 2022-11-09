//import { createClient } from 'redis';
import * as redis from "redis";

import config from '@/core/common/config'
const {RedisConfig} = config
const url = `redis://${RedisConfig.user}:${RedisConfig.password}@${RedisConfig.host}:${RedisConfig.port}`
const redisClient = redis.createClient({url:url})

try{
  redisClient.connect();
}
catch(err){
  console.log('[first] you have to make sure the redis information.')
  console.warn(err)
  
}


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
  delete(_key:string):void{
    this.cacheConnection.del(_key)
  }

  async setData(_key:string,_value:string,_exdate:string):Promise<string|null>{
    let me = this;
    return new Promise(async (resolve)=>{
      /*
      * setting expire time, 
      * refrence https://redis.io/commands/set/
      * EX seconds
      * PX milliseconds
      * EXAT timestamp-seconds 
      * PXAT timestamp-milliseconds 
      */ 
      resolve(await me.cacheConnection.set(_key,_value,{'PX':(new Date(_exdate)).getTime()}));
    });
  }
}