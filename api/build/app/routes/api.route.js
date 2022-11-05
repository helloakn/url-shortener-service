"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteApi = void 0;
const enums_1 = require("../../core/common/enums");
const shortenedurl_controller_1 = require("../controllers/shortenedurl/shortenedurl.controller");
const RouteApi = (httpSrv) => {
    const shortenedUrlController = new shortenedurl_controller_1.ShortenedUrlController(httpSrv);
    shortenedUrlController
        .prefix('shortenedurl')
        .action([enums_1.RequestMethod.Post, enums_1.RequestMethod.Get], "/test", shortenedUrlController.TestMethod);
};
exports.RouteApi = RouteApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLnJvdXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9yb3V0ZXMvYXBpLnJvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLG1EQUF3RDtBQUV4RCxpR0FBMEY7QUFFbkYsTUFBTSxRQUFRLEdBQUMsQ0FBQyxPQUF5QixFQUFDLEVBQUU7SUFDakQsTUFBTSxzQkFBc0IsR0FBRyxJQUFJLGdEQUFzQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBSW5FLHNCQUFzQjtTQUNuQixNQUFNLENBQUMsY0FBYyxDQUFDO1NBQ3RCLE1BQU0sQ0FBQyxDQUFDLHFCQUFhLENBQUMsSUFBSSxFQUFDLHFCQUFhLENBQUMsR0FBRyxDQUFDLEVBQUMsT0FBTyxFQUFDLHNCQUFzQixDQUFDLFVBQVUsQ0FBQyxDQUFBO0FBQzdGLENBQUMsQ0FBQTtBQVJZLFFBQUEsUUFBUSxZQVFwQiJ9