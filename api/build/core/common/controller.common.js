"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Controller__prefix;
Object.defineProperty(exports, "__esModule", { value: true });
class Controller {
    constructor(httpServer) {
        this.httpServer = httpServer;
        _Controller__prefix.set(this, '');
    }
    prefix(url) {
        __classPrivateFieldSet(this, _Controller__prefix, url, "f");
        return this;
    }
    action(methods, url, event) {
        const _url = ('/' + __classPrivateFieldGet(this, _Controller__prefix, "f") + '/' + url).replace('//', '/');
        const route = this.httpServer.route(`${_url}`);
        methods.forEach(method => {
            switch (method) {
                case 'post':
                    route.post(event);
                    break;
                case 'get':
                    route.get(event);
                    break;
                case 'put':
                    route.put(event);
                    break;
                case 'delete':
                    route.delete(event);
                    break;
            }
        });
        return this;
    }
    response(res, responseCode, responseData) {
        res.setHeader('Content-Type', 'application/json');
        if (typeof responseData == 'undefined') {
            res.status(responseCode).send({});
        }
        else {
            res.status(responseCode).send(JSON.stringify(responseData));
        }
    }
}
exports.default = Controller;
_Controller__prefix = new WeakMap();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbGxlci5jb21tb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9jb21tb24vY29udHJvbGxlci5jb21tb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFPQSxNQUFxQixVQUFVO0lBSTdCLFlBQW1CLFVBQTRCO1FBQTVCLGVBQVUsR0FBVixVQUFVLENBQWtCO1FBRi9DLDhCQUFrQixFQUFFLEVBQUM7SUFFNkIsQ0FBQztJQUVuRCxNQUFNLENBQUMsR0FBVztRQUNoQix1QkFBQSxJQUFJLHVCQUFZLEdBQUcsTUFBQSxDQUFDO1FBQ3BCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNELE1BQU0sQ0FBQyxPQUErQixFQUFFLEdBQVcsRUFBRSxLQUFZO1FBSy9ELE1BQU0sSUFBSSxHQUFHLENBQUMsR0FBRyxHQUFHLHVCQUFBLElBQUksMkJBQVMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBQyxHQUFHLENBQUMsQ0FBQztRQUNqRSxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUM7UUFFL0MsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUEsRUFBRTtZQUN0QixRQUFPLE1BQU0sRUFBQztnQkFDWixLQUFLLE1BQU07b0JBQ1QsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDbEIsTUFBTTtnQkFFUixLQUFLLEtBQUs7b0JBQ1IsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDakIsTUFBTTtnQkFFUixLQUFLLEtBQUs7b0JBQ1IsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDakIsTUFBTTtnQkFFUixLQUFLLFFBQVE7b0JBQ1gsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDcEIsTUFBTTthQUVUO1FBQ0gsQ0FBQyxDQUFDLENBQUE7UUFDRixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxRQUFRLENBQUUsR0FBaUIsRUFBRSxZQUFvQixFQUFFLFlBQWlDO1FBQ2xGLEdBQUcsQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFFbEQsSUFBSSxPQUFPLFlBQVksSUFBSSxXQUFXLEVBQUU7WUFDdEMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDbkM7YUFDRztZQUNGLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztTQUM3RDtJQUNILENBQUM7Q0FFRjtBQXBERCw2QkFvREMifQ==