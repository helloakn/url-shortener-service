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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEvent = void 0;
const enums_1 = require("../../../core/common/enums");
const { Success } = enums_1.StatusCode;
function TestEvent(me, req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const formData = req.body;
        const msgBody = { message: "Successfully Added" };
        me.response(res, Success.OK, msgBody);
    });
}
exports.TestEvent = TestEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcHAvY29udHJvbGxlcnMvc2hvcnRlbmVkdXJsL3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBTUEsc0RBQXFEO0FBQ3JELE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxrQkFBVSxDQUFBO0FBRTlCLFNBQXNCLFNBQVMsQ0FBd0IsRUFBSyxFQUFFLEdBQWlCLEVBQUUsR0FBa0I7O1FBQ2pHLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDMUIsTUFBTSxPQUFPLEdBQXdCLEVBQUMsT0FBTyxFQUFDLG9CQUFvQixFQUFDLENBQUM7UUFDcEUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUMsT0FBTyxDQUFDLEVBQUUsRUFBQyxPQUFPLENBQUMsQ0FBQztJQUN0QyxDQUFDO0NBQUE7QUFKRCw4QkFJQyJ9