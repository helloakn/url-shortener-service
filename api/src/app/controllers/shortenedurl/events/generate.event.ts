import { 
  THttpRequest,THttpResponse,
  IController,
  TValidateResult,
  TResponseSuccessWithData,
  TDic
 } from '@/core/types';

import {StatusCode} from '@/core/common/enums'
const { Success, ClientError } = StatusCode

import { timeDiff, formatDate, generateCode ,generateRandomNumer} from '@/core/functions';

import { ShortenedURLModel, TShortenedURL } from '@/app/models/shortenedUrl.model';

import config from '@/core/common/config' 

export async function GenerateEvent<T extends IController>(me: T, req: THttpRequest, res: THttpResponse): Promise<void> {
  const formData = req.body;
  // Begin Validation
  await me.validator.Rule(
    async v=>{
      v.input('url',formData.url)
        .isValidUrl("Please provide valid url address")
      v.input('expire_date',formData.expire_date)
        .isEmpty("not allow empty")
        .isValidDateFormat("date format is wrong")
        .customRule( 
          ():boolean=>{
            // expiration date time must be greater than current datet time
            let expDateTime = formData.expire_date+' '+(formData.expire_time||'00:00')
            let tDiff: number = timeDiff(formatDate(new Date(),"yyyy-MM-dd h:mm:tt"),expDateTime)
            return tDiff>1;
          }
        ,'Expiration Date must be greater than current Date');

      v.input('expire_time',formData.expire_time)
        .customRule( 
          // if formData.expire_time is null/undefine, we do not need to validate
          // else we have to validate time format and time lenght. min : 00:00 and max: 23:59
          (that):boolean=>{
            if(!(formData.expire_time == undefined || formData.expire_time =='')){
              that.isValidTime('Format is {hh:mm}')
            }
            return true;
          }
        ,'');
    }
  )
  // End Validation
  const vResult: TValidateResult = await me.validator.validate();
  if(vResult.status){
    let i: number = 1;
    const shortenedUrlModel = new ShortenedURLModel<TShortenedURL>();
    //categoryModel.hello();
    
    let insertData=async (_code:string):Promise<TShortenedURL>=>{
      return new Promise(async (resolve,reject)=>{
        let data : TShortenedURL = {
          short_code: _code,
          url: formData.url ,
          expiration_date_time: formData.expire_date+' '+(formData.expire_time||'00:00'),
          hitcount: 0,
          created_at: new Date(formatDate(new Date(),"yyyy-MM-dd h:mm:tt")),
          updated_at: new Date(formatDate(new Date(),"yyyy-MM-dd h:mm:tt"))
        }
        let result = await shortenedUrlModel.checkCode(gCode);
        if(result==null){
          let insertedRecord = await shortenedUrlModel.insert(data)
          resolve(insertedRecord) 
        }
        else{
          gCode= generateCode(generateRandomNumer(5,24));
          // function recursive call till unique code
          resolve(await insertData(gCode)) 
        }
      });
      
    }
    let gCode: string = generateCode(generateRandomNumer(5,24));
    let insertedRw = await insertData(gCode);
    //let objInsertedRw:TDic =insertedRw as unknown as TDic;
    //objInsertedRw['short_url'] = "http://"+config.ServerConfig.HOST +'/u/'+insertedRw.short_code
    // or
    let objInsertedRw:TDic = {
      'code':insertedRw.short_code,
      'short_url':"http://"+config.ServerConfig.HOST +`:${config.ServerConfig.PORT}/u/`+insertedRw.short_code,
      'expiration_date_time':insertedRw.expiration_date_time
    }
    
    let returnData:TResponseSuccessWithData = {
      message:"Successfully Generated",
      data:objInsertedRw
    };
    me.response(res,Success.OK,returnData);
  }
  else{
    me.response(res,ClientError.BadRequest,{errors:vResult.errors})
  }
  
}