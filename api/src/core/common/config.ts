import dotenv from "dotenv"

dotenv.config()

export default {
  RedisConfig: {
    host: process.env.REDIS_SERVER_HOST || 'localhost',
    port: process.env.REDIS_SERVER_PORT || 3333,
  },
  DatabaseConfig: {
    host: process.env.DB_SERVER_HOST || 'localhost',
    port: process.env.DB_SERVER_PORT || 3306,
    user: process.env.DB_SERVER_USR || 'root',
    password: process.env.DB_SERVER_PASSWD || 'sutaung',
    database: process.env.DB_SERVER_DB_NAME || 'akn'
  },
  ServerConfig: {
    PORT: process.env.REST_SERVER_PORT || 9999,
    HOST: process.env.REST_SERVER_HOST || '127.0.0.1',
    allowFrom: process.env.allowFrom || '*'
  },
  JKey: {
    admin: process.env.ADMIN_KEY || 'UIjHT^&*tyUHT^&*IKHUIHT&*UJHT^&3UJTYUIjHT^&*IKHU7IHyhT&*UJHT4^&UJTYUIjHT^&*tyUIKGT&'
  }
}