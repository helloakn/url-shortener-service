"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusCode = exports.RequestMethod = void 0;
var RequestMethod;
(function (RequestMethod) {
    RequestMethod["Post"] = "post";
    RequestMethod["Get"] = "get";
    RequestMethod["Put"] = "put";
    RequestMethod["Delete"] = "delete";
})(RequestMethod = exports.RequestMethod || (exports.RequestMethod = {}));
exports.StatusCode = {
    Success: {
        OK: 200,
        Created: 201,
        Accepted: 202,
        NoContent: 204
    },
    Redirection: {
        MovePermanently: 301,
        TemporaryRedirect: 307,
        PermanentRedirect: 308
    },
    ClientError: {
        BadRequest: 400,
        Unauthorized: 401,
        PaymentRequired: 402,
        Forbidden: 403,
        NotFound: 404,
        MethodNotAllow: 405,
        TooManyRequests: 429
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW51bXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9jb21tb24vZW51bXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsSUFBWSxhQUtYO0FBTEQsV0FBWSxhQUFhO0lBQ3ZCLDhCQUFhLENBQUE7SUFDYiw0QkFBVyxDQUFBO0lBQ1gsNEJBQVcsQ0FBQTtJQUNYLGtDQUFpQixDQUFBO0FBQ25CLENBQUMsRUFMVyxhQUFhLEdBQWIscUJBQWEsS0FBYixxQkFBYSxRQUt4QjtBQWlCWSxRQUFBLFVBQVUsR0FBRztJQUN4QixPQUFPLEVBQUM7UUFDTixFQUFFLEVBQUMsR0FBRztRQUNOLE9BQU8sRUFBQyxHQUFHO1FBQ1gsUUFBUSxFQUFDLEdBQUc7UUFDWixTQUFTLEVBQUMsR0FBRztLQUNkO0lBQ0QsV0FBVyxFQUFDO1FBQ1YsZUFBZSxFQUFDLEdBQUc7UUFDbkIsaUJBQWlCLEVBQUMsR0FBRztRQUNyQixpQkFBaUIsRUFBQyxHQUFHO0tBQ3RCO0lBQ0QsV0FBVyxFQUFDO1FBQ1YsVUFBVSxFQUFDLEdBQUc7UUFDZCxZQUFZLEVBQUMsR0FBRztRQUNoQixlQUFlLEVBQUMsR0FBRztRQUNuQixTQUFTLEVBQUMsR0FBRztRQUNiLFFBQVEsRUFBQyxHQUFHO1FBQ1osY0FBYyxFQUFDLEdBQUc7UUFDbEIsZUFBZSxFQUFDLEdBQUc7S0FDcEI7Q0FDRixDQUFBIn0=