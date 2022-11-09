import mysql from 'mysql'
import config from '../config'

const { DatabaseConfig } = config

export interface IDatabaseConfig {
  host: string;
  user: string;
  password: string;
  database: string;
}

const dbConnection : mysql.Connection = mysql.createConnection({
  host: DatabaseConfig.host,
  user: DatabaseConfig.user,
  password: DatabaseConfig.password,
  database: DatabaseConfig.database
});
//console.log('DatabaseConfig',DatabaseConfig)
//console.log('dbConnection',dbConnection)
dbConnection.connect(error => {
  if (error) throw error;
  //console.log("Successfully connected to the database.");
});

export type TMySqlConnection = mysql.Connection;

export class Database {
  public dbConnection : TMySqlConnection;

  constructor(){
    this.dbConnection = dbConnection
  }
}