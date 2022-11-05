# URL Shortener Service
[![NodeJs](https://img.shields.io/badge/nodejs-v18.6.0-green)](https://github.com/helloakn/url-shortener-service) 
[![Express](https://img.shields.io/badge/express-v^4.18.1-green)](https://github.com/helloakn/url-shortener-service) 
## Table of content
- Application Description
- Application Functionalities
- Git Conventional Commits Message
- Flow
- File Structure
- How To Run
- Acknowledgments
---

### Application Description
Create a URL-shortener service to shorten URLs.  
API clients will be able to create short URLs from a full length URL.  
It will also support redirecting the short urls to the correct url.

### Application Functionalities
#### Url Shortening
- An API Client can send a url and be returned a shortened URL.
- An API Client can specify an expiration time for URLs when creating shortened URL
- Handle visits to Shortened URLs, they must redirect to the original URL with a HTTP
302 redirect, 404 if not found.
- Visiting expired URLs must return HTTP 410
- Input URL should be validated and respond with error if not a valid URL
- Regex based blacklist for URLs, urls that match the blacklist respond with an error
- Hit counter for shortened URLs (increment with every hit)
#### Admin API
- Admin api (requiring token) to list
  - Short Code
  - Full Url
  - Expiry (if any)
  - Number of hits
- Above list can filter by Short Code and keyword on origin url.
- Admin api to delete a URL (after deletion shortened URLs must return HTTP 410 on visit)

### Git Conventional Commits Message
<pre>
<b><a href="#body">[Type] : Message</a></b>
<sub>Type =>  [Create], [Modify], [Fix], [Delete]</sub>
<sub>Message =>  Describe about the commit</sub>

<b><a href="#body">Example</a></b>
<sub>[Create] message event for bla bla bla</sub>
<sub>[Modify] message event for bla bla bla</sub>
<sub>[Fix] message event for bla bla bla</sub>
</pre>
### Flow
#### Chache Layer Flow
<img src="resources/cache-layer-flow.png" width="70%">

#### Admin API Flow
<img src="resources/admin-api-flow.png" width="70%">

### File Structure
```
-api
├── src                               # for typescripts
│   ├── app                           # 
│   │   ├── controllers
│   │   ├── middlewares
│   │   ├── routes
│   │   ├── controllers
│   ├── core                          # 
│   │   ├── common
│   │   │    └── interfacesNtypes  
│   │   ├── functions
│   │   ├── databases
│   │   ├── http

```

### How To Run
#### .env
```
REST_SERVER_HOST=0.0.0.0
REST_SERVER_PORT=9090

DB_SERVER_HOST=
DB_SERVER_PORT=
DB_SERVER_USR=
DB_SERVER_PASSWD=
DB_SERVER_DB_NAME=
```
### Acknowledgments
Thank you so much.
