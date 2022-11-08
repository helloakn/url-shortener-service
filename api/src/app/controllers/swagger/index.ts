export default {
  "swagger": "2.0",
  "info": {
    "title": ".:: URL Shortener Service ::.",
    "description": "Remark: DateFormat must be dd-mm-yyyy",
    "version": "1.0.0"
  },
  "produces": ["application/json"],
  "paths": {
    "/api/shortenedurl/generate": {
      "post": {
        
        "tags": ["User API"],
        
        "summary":"Generate the short url",
        "description":"Generate the short url",
        "x-swagger-router-controller": "home",
        "operationId": "generate",
        "parameters": [
          { "name": "url", "in": "formData", "required": true, "type": "string" },
          { "name": "expire_date", "in": "formData", "required": true, "type": "string", "format":"date"},
          { "name": "expire_time", "in": "formData", "required": false, "type":"hh:mm"}
        ],
        "responses": {}
      },
    },
    "/api/shortenedurl/retrieve-url": {
      "post": {
        "description":"retrieve the full url with generated short code",
        "summary":"retrieve the full url with generated short code",
        "tags": ["User API"],
        "x-swagger-router-controller": "home",
        "operationId": "cc",
        "parameters": [
          { "name": "code", "in": "formData", "required": true, "type": "string" }
        ],
        "responses": {}
      },
      
    },
    "/api/admin/login": {
      "post": {
        "description":"You can input any email and any password, *api will generate token*",
        "summary":" : login to get token",
        "operationId": "login",
        "tags": ["Admin Api"],
        "parameters": [
          { "name": "email", "in": "formData", "description":"abc@abc.com any email" ,"required": true, "type":"string"},
          { "name": "password", "in": "formData", "description":"123456 or any password" ,"required": true, "type":"string"}
        ],
        "responses": {}
      }
    },
    "/api/admin/shortenedurl/getlist": {
      "post": {
        "summary":" : Retrieve the list of shortcode url , full url and exp time",
        "description":" : Retrieve the list of shortcode url , full url and exp time",
        "operationId": "getlist",
        "tags": ["Admin Api"],
        "parameters": [
          { "name": "Authorization", "in": "header", "description":"authorizatio header. example => Bearer <Token>" ,"required": true, "type":"string"},
          { "name": "row_count", "in": "formData", "description":"for the pagination, how many records you wish to retrieve per request." ,"required": false, "type":"string"},
          { "name": "page_at", "in": "formData", "description":"which page do u want to go" ,"required": false, "type":"string"},
          { "name": "search", "in": "formData", "description":"search for code or full url" ,"required": false, "type":"string"}
        ],
        "responses": {}
      }
    },
    "/api/admin/shortenedurl/delete": {
      "delete": {
        "operationId": "delete",
        "tags": ["Admin Api"],
        "parameters": [
          { "name": "Authorization", "in": "header", "description":"authorizatio header. example => Bearer <Token>" ,"required": true, "type":"string"},
          { "name": "code", "in": "formData", "required": true, "type": "string" }
        ],
        "responses": {}
      }
    }

  }
}