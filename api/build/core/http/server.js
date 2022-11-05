"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Server_port;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyparser = __importStar(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const index_route_1 = require("../../app/routes/index.route");
const config_1 = __importDefault(require("../common/config"));
const { ServerConfig } = config_1.default;
class Server {
    constructor() {
        _Server_port.set(this, ServerConfig.PORT);
        this.httpSvr = (0, express_1.default)();
    }
    init() {
        this.httpSvr.use(bodyparser.json());
        this.httpSvr.use(bodyparser.urlencoded({
            extended: true
        }));
        this.httpSvr.use((0, cors_1.default)());
        this.httpSvr.use(express_1.default.json({ limit: '1000MB' }));
        (0, index_route_1.RouteConfig)(this.httpSvr);
        this.httpSvr.listen(__classPrivateFieldGet(this, _Server_port, "f"), () => {
            console.log(`Server running at http://localhost:${__classPrivateFieldGet(this, _Server_port, "f")}`);
        });
    }
}
exports.default = Server;
_Server_port = new WeakMap();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvaHR0cC9zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUE4QjtBQUM5Qix3REFBMEM7QUFDMUMsZ0RBQXVCO0FBRXZCLDhEQUF3RDtBQUN4RCw4REFBcUM7QUFDckMsTUFBTSxFQUFFLFlBQVksRUFBRSxHQUFHLGdCQUFNLENBQUE7QUFFL0IsTUFBcUIsTUFBTTtJQUl6QjtRQUZBLHVCQUF5QixZQUFZLENBQUMsSUFBSSxFQUFDO1FBR3pDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBQSxpQkFBTyxHQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELElBQUk7UUFDRixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDO1lBQ3JDLFFBQVEsRUFBRSxJQUFJO1NBQ2YsQ0FBQyxDQUFDLENBQUM7UUFDSixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFBLGNBQUksR0FBRSxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXBELElBQUEseUJBQVcsRUFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsdUJBQUEsSUFBSSxvQkFBTSxFQUFFLEdBQUcsRUFBRTtZQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLHNDQUFzQyx1QkFBQSxJQUFJLG9CQUFNLEVBQUUsQ0FBQyxDQUFBO1FBQ2pFLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBdEJELHlCQXNCQyJ9