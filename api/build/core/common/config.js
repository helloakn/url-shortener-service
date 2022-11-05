"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
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
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvY29tbW9uL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLG9EQUEyQjtBQUUzQixnQkFBTSxDQUFDLE1BQU0sRUFBRSxDQUFBO0FBRWYsa0JBQWU7SUFDYixjQUFjLEVBQUU7UUFDZCxJQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLElBQUksV0FBVztRQUMvQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLElBQUksSUFBSTtRQUN4QyxJQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLElBQUksTUFBTTtRQUN6QyxRQUFRLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsSUFBSSxTQUFTO1FBQ25ELFFBQVEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixJQUFJLEtBQUs7S0FDakQ7SUFDRCxZQUFZLEVBQUU7UUFDWixJQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJO1FBQzFDLFNBQVMsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsSUFBSSxHQUFHO0tBQ3hDO0lBQ0QsSUFBSSxFQUFFO1FBQ0osS0FBSyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxJQUFJLHFGQUFxRjtLQUN0SDtDQUNGLENBQUEifQ==