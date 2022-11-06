export default {
  "swagger": "2.0",
  "info": {
    "title": ".:: URL Shortener Service ::.",
    "description": "Remark: DateFormat must be dd-mm-yyyy",
    "version": "1.0.0"
  },
  "produces": ["application/json"],
  "paths": {
    "/shortenedurl/generate": {
      "post": {
        "tags": ["User API"],
        "summary":"this is summary",
        "description":"aaa aaa",
        "x-swagger-router-controller": "home",
        "operationId": "cc",
        "parameters": [
          { "name": "url", "in": "formData", "required": true, "type": "string" },
          { "name": "date", "in": "formData", "required": true, "type": "string", "format":"date"},
          { "name": "time", "in": "formData", "required": false, "type":"hh:mm"}
        ],
        "responses": {}
      },
    },
    "/shortenedurl/decodeurl": {
      "post": {
        "description":"aaa",
        "tags": ["User API"],
        "x-swagger-router-controller": "home",
        "operationId": "cc",
        "parameters": [
          { "name": "code", "in": "formData", "required": true, "type": "string" }
        ],
        "responses": {}
      },
      
    },
    "/admin/login": {
      
      "post": {
        "summary":" : login to get token",
        "operationId": "index",
        "tags": ["Admin Api"],
        "parameters": [
          { "name": "username", "in": "formData", "description":"authorizatio header." ,"required": true, "type":"string"}
          { "name": "password", "in": "formData", "description":"ss." ,"required": true, "type":"string"}
        ],
        "responses": {}
      }
    },
    "/admin/shortcodeurl": {
      "post": {
        "summary":" : Retrieve the list of shortcode url , full url and exp time",
        "description":" : Retrieve the list of shortcode url , full url and exp time",
        "operationId": "index",
        "tags": ["Admin Api"],
        "parameters": [
          { "name": "Bearer", "in": "header", "description":"authorizatio header." ,"required": true, "type":"string"}
        ],
        "responses": {}
      }
    },
    "/admin/shortcodeurl/delete": {
      "delete": {
        "operationId": "index",
        "tags": ["Admin Api"],
        "parameters": [
          { "name": "Bearer", "in": "header", "description":"authorizatio header." ,"required": true, "type":"string"}
        ],
        "responses": {}
      }
    }

  }
}