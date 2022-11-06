import dotenv from "dotenv"

dotenv.config()

export default {
  DatabaseConfig: {
    host: process.env.DB_SERVER_HOST || 'localhost',
    port: process.env.DB_SERVER_PORT || 3306,
    user: process.env.DB_SERVER_USR || 'root',
    password: process.env.DB_SERVER_PASSWD || 'sutaung',
    database: process.env.DB_SERVER_DB_NAME || 'akn'
  },
  ServerConfig: {
    PORT: process.env.REST_SERVER_PORT || 9999,
    allowFrom: process.env.allowFrom || '*'
  },
  JKey: {
    admin: process.env.ADMIN_KEY || 'UIjHT^&*tyUHT^&*IKHUIHT&*UJHT^&3UJTYUIjHT^&*IKHU7IHyhT&*UJHT4^&UJTYUIjHT^&*tyUIKGT&'
  }
}