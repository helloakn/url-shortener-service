import { Table } from "@/core/common/database/table.common"

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
}