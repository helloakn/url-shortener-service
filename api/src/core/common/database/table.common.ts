import {TPaginateNData, TDic} from '@/core/types/index'
import { Database } from './database.common';
import { timeDiff, formatDate, generateCode ,generateRandomNumer} from '@/core/functions';

interface IBaseModel<T> extends Database{
  tableName: string;
  insert(data: T): Promise<T>;
  getById(id:number) : T;
  paginate(query: string, row_count: number, page_at: number) : Promise<TPaginateNData>;
}

export class Table<T  extends { id?: number }> extends Database implements IBaseModel<T> {
  
  constructor(public tableName:string){
    super();
  }

  insert(data: T): Promise<T> {
    return new Promise<T>((resolve,reject) => {
      this.dbConnection.query(`INSERT INTO ${this.tableName} SET ?`, data, (err, res) => {
        if (err) {
          reject(err)
          return;
        }
        data.id = res.insertId
        resolve(data);
      });
    })
  }
  
  updateData = (newRecord: TDic,whereCase=""): Promise<T> => {
    let now = new Date();
    var formatted_date = formatDate(now,"yyyy-MM-dd h:mm:ss"); //now.toLocaleString(); //moment(now).format('YYYY-MM-DD HH:MM:SS');
    newRecord.updated_at = formatted_date;

    let queryArray = []
    type TColumn= string | number | Date | null;
    for(let key in newRecord){ 
      let value: TColumn = typeof newRecord[key] == 'string'||'Date'? "'"+newRecord[key]+"'":typeof newRecord[key] == 'number' ? newRecord[key] : ''
      //queryArray.push(` ${key}=${isNaN(newRecord[key])?"'"+newRecord[key]+"'":newRecord[key] }`);
      queryArray.push(`${key}=${value}`);
    }
    //console.log('queryArray =>',queryArray.join(','));
    let queryString = `UPDATE ${this.tableName} SET ${queryArray.join(',')} ${whereCase==""?"":" WHERE "+whereCase}`
   // console.log('queryString',queryString)
    return new Promise(resolve => {
      this.dbConnection.query(queryString, (err, res) => {
        if (err) {
      //    console.log("error: ", err);
          resolve(res);
          return;
        }
        resolve(res);
      });
    });// end Promise
  }//end getRecordById function

  findById(id:number): Promise<T>| null{
    return new Promise<T>((resolve,reject) => {
      let query: string = `SELECT * FROM ${this.tableName} WHERE id =${id} AND deleted_at IS NULL`;
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
    })
  }

  findByKey(columnName:string,value:string,includeSoftDeleted:boolean=true): Promise<T>| null{
    return new Promise<T>((resolve,reject) => {
      let query: string = `SELECT * FROM ${this.tableName} WHERE ${columnName} ='${value}' `+(includeSoftDeleted?'':' AND deleted_at IS NULL');
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
    })
  }

  paginate(query: string,row_count: number,page_at: number) : Promise<TPaginateNData>{
    page_at = page_at - 1;
    //row_count => total records per page.
    console.log('row_count',row_count,typeof row_count)
    return new Promise((resolve,reject) => {
      let totalPage = 0;
      let startFrom = 0;
      let cmdString = `SELECT count(*) as totalCount from (${query}) totalCount;`;
      let paginatecmdString = "";
      //console.log('cmdString',cmdString)
      this.dbConnection.query(cmdString, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        if (res.length) {
          totalPage = Math.ceil(res[0].totalCount / row_count);
          startFrom = page_at * row_count;
          //generate pagination query 
          paginatecmdString = query + ` LIMIT ${startFrom},${row_count}`;
          //console.log('paginatecmdString',paginatecmdString)
          this.dbConnection.query(paginatecmdString, (er, re) => {
            if (er) {
              reject(null);
              return;
            }
            else{
              resolve({
                  pagination:{
                    totalRecord:res[0].totalCount,
                    countPerPage:row_count*1 as number,
                    totalPage:totalPage,
                    current_records:re.length,
                    page_at:page_at+1,
                  },
                  data:re
              });
            }
          });//end pagination data
          return;
        }
        else{
          reject(null);
          return;
        }
      });//end total record

    });// end Promise

  }//end paginate function

  getById(id:number) : T {
    console.log(id)
    const i : T = {} as T;
    return i
  }

}