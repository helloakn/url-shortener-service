import { Table } from "@/core/common/database/table.common"
import { TPaginateNData } from "@/core/types";
import { timeDiff, formatDate, generateCode ,generateRandomNumer} from '@/core/functions';

export interface TShortenedURL {
  id?: number,
  short_code: string,
  url: string,
  expiration_date_time: string,
  hitcount: number,
  created_at?: Date,
  updated_at?: Date,
  deleted_at?: Date
}

export class ShortenedURLModel<T  extends { id?: number }> extends Table<T> {
  constructor(){
    super("tblShortenedURL")
  }

  async checkCode(_code:string):Promise<T>{
    return new Promise((resolve,reject)=>{
      let query: string = `SELECT * FROM ${this.tableName} WHERE short_code ='${_code}'`;
      this.dbConnection.query(query, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        if (res.length) {
          resolve(res[0]);
          return;
        }
        else{
          resolve(null as any);
          return;
        }
      });
    });
  }
  async incrementHitCount(_code:string): Promise<T>{
    //return await this.updateData({hitcount:num},` short_code='${_code}'`)
    return new Promise(resolve=>{
      let queryString = `UPDATE ${this.tableName} SET hitcount=hitcount+1 WHERE short_code='${_code}'`
      this.dbConnection.query(queryString, (err, res) => {
        if (err) {
      //    console.log("error: ", err);
          resolve(res);
          return;
        }
        resolve(res);
      });
    });
  }

  async getList(search:string='',row_count: number,page_at: number) : Promise<TPaginateNData>{
    return new Promise(resolve=>{
      
      let query:string = `SELECT short_code, url, hitcount from ${this.tableName}`;
      if(search!=''){
        query += ` WHERE short_code LIKE "%${search}%" OR url LIKE "%${search}%" AND deleted_at IS NULL `
      }
      else{
        query += ` WHERE deleted_at IS NULL `
      }
      query += ' ORDER BY hitcount DESC'
      let results = this.paginate(query,row_count,page_at)
      resolve(results);
    });
  }

  DeleteByCode(_code: string): Promise<any>{
    let me = this;
    var formatted_date = formatDate(new Date(),"yyyy-MM-dd h:mm:ss"); //now.toLocaleString(); //moment(now).format('YYYY-MM-DD HH:MM:SS');
   
    return new Promise((resolve,reject) => {
      me.dbConnection.query(`UPDATE ${this.tableName} set deleted_at='${formatted_date}' WHERE deleted_at IS NULL AND short_code='${_code}'`, (err, res) => {
       // console.log('res',res)
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
      });// end sql command
    });// end Promise
  } // end Delete By ID Functions
}
