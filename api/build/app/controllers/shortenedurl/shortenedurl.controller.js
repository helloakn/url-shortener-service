"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortenedUrlController = void 0;
const controller_common_1 = __importDefault(require("../../../core/common/controller.common"));
const test_1 = require("./test");
class ShortenedUrlController extends controller_common_1.default {
    constructor(httpServer) {
        super(httpServer);
        this.httpServer = httpServer;
        this.TestMethod = (req, res) => __awaiter(this, void 0, void 0, function* () { return (0, test_1.TestEvent)(this, req, res); });
    }
}
exports.ShortenedUrlController = ShortenedUrlController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvcnRlbmVkdXJsLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBwL2NvbnRyb2xsZXJzL3Nob3J0ZW5lZHVybC9zaG9ydGVuZWR1cmwuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrRkFBK0Q7QUFHL0QsaUNBQW1DO0FBRW5DLE1BQWEsc0JBQXVCLFNBQVEsMkJBQVU7SUFDcEQsWUFBbUIsVUFBNEI7UUFDN0MsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBREQsZUFBVSxHQUFWLFVBQVUsQ0FBa0I7UUFJL0MsZUFBVSxHQUFHLENBQU8sR0FBaUIsRUFBRSxHQUFrQixFQUFFLEVBQUUsZ0RBQUMsT0FBQSxJQUFBLGdCQUFTLEVBQWEsSUFBSSxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQSxHQUFBLENBQUE7SUFGakcsQ0FBQztDQUtGO0FBUkQsd0RBUUMifQ==