# URL Shortener Service
[![Star Count](https://img.shields.io/badge/dynamic/json?color=brightgreen&label=Star&query=stargazers_count&url=https%3A%2F%2Fapi.github.com%2Frepos%2Fhelloakn%2Furl-shortener-service)](https://github.com/helloakn/url-shortener-service) [![Licence](https://img.shields.io/badge/dynamic/json?color=informational&label=LICENCE&query=license.name&url=https%3A%2F%2Fapi.github.com%2Frepos%2Fhelloakn%2Furl-shortener-service)](https://github.com/helloakn/url-shortener-service) [![Language](https://img.shields.io/badge/dynamic/json?color=blueviolet&label=Language&query=language&url=https%3A%2F%2Fapi.github.com%2Frepos%2Fhelloakn%2Furl-shortener-service)](https://github.com/helloakn/url-shortener-service) 

[![NodeJs](https://img.shields.io/badge/nodejs-v18.6.0-green)](https://github.com/helloakn/url-shortener-service) 
[![Express](https://img.shields.io/badge/express-v^4.18.1-green)](https://github.com/helloakn/url-shortener-service) 
## Table of content
- [1] Application Description
- [2] Application Functionalities
- [3] Git Conventional Commits Message
- [4] Flow Diagram
- [5] File Structure
- [6] How To Run
  - [6.1] local machine without docker 
    - [6.1.1] configuration
    - [6.1.2] installation
    - [6.1.3] run
  - [6.2] local machine with docker ( Recommended )
    - [6.2.1] create docker network
    - [6.2.2] build images
    - [6.2.3] Create Containers
- [7] How To Test
- [8] OpenApi
- [9] Acknowledgments
---

### [1] Application Description
URL-shortener service to shorten URLs.  
API clients will be able to create short URLs from a full length URL.  
It will also support redirecting the short urls to the correct url.

### [2] Application Functionalities

<details>
 <summary>[2.1] Url Shortening</summary>
 
- An API Client can send a url and be returned a shortened URL. 
- An API Client can specify an expiration time for URLs when creating shortened URL 
- Handle visits to Shortened URLs, they must redirect to the original URL with a HTTP 
302 redirect, 404 if not found. 
- Visiting expired URLs must return HTTP 410 
- Input URL should be validated and respond with error if not a valid URL 
- Regex based blacklist for URLs, urls that match the blacklist respond with an error 
- Hit counter for shortened URLs (increment with every hit) 
</details>
<details>
<summary> [2.2] Admin API</summary> 

- Admin api (requiring token) to list 
  - Short Code 
  - Full Url 
  - Expiry (if any) 
  - Number of hits 
- Above list can filter by Short Code and keyword on origin url. 
- Admin api to delete a URL (after deletion shortened URLs must return HTTP 410 on visit) 
</details>

---

### [3] Git Conventional Commits Message
<pre>
<b><a href="#body">[Type] : Message</a></b>
<sub>Type =>  [Create], [Modify], [Fix], [Delete]</sub>
<sub>Message =>  Describe about the commit</sub>

<b><a href="#body">Example</a></b>
<sub>[Create] message event for bla bla bla</sub>
<sub>[Modify] message event for bla bla bla</sub>
<sub>[Fix] message event for bla bla bla</sub>
</pre>

---

### [4] Flow Diagram

#### [4.1] Chache Layer Flow
<img src="resources/cache-layer-flow.png" width="70%">

#### [4.2] Admin API Flow
<img src="resources/admin-api-flow.png" width="70%">

---

### [5] File Structure
```
-api
├── __tests__                         # for testing
│   └── integration                   # for all the integration tests 
├── src                               # for typescripts
│   ├── app                           # AS AS Open/Close Principle
│   │   ├── controllers
│   │   │    └─ ...
│   │   │       ├─ controller.ts
│   │   │       └─ events             
│   │   ├── middlewares               
│   │   ├── models                    # for database table
│   │   └── routes                    # for admin / user / swigger api routes
│   ├── core                          # AS Single Responsibility Principle
│   │   ├── common
│   │   │    ├── cache                # redis
│   │   │    ├── database             # mysql
│   │   │    └── validator  
│   │   │         └── rules           # we can add additional rules
│   │   │             └── ...
│   │   ├── functions                 # For Resuable functions
│   │   ├── http                      # For Express
│   │   ├── types
├...
├docker
├── config                            #
│   └── ...
├...
├── resources                         # images for readme file
│   └── ...
```

---

### [6] How To Run
We have to choose our environment that where we will host our application.  
In this moment, I will make cover for two environment.  

<details>
<summary> [6.1] local machine without docker </summary> 

first we need already installed node , mysql into machine.  
for second, we have to configure.  

<details>
<summary> [6.1.1] configuration </summary> 

create **.env** file ./api/.env with the following content  

(you have to replace with yours.)
```
REST_SERVER_HOST=localhost
REST_SERVER_PORT=9090

DB_SERVER_HOST=localhost
DB_SERVER_PORT=3306
DB_SERVER_USR=username
DB_SERVER_PASSWD=password
DB_SERVER_DB_NAME=databasename

REDIS_SERVER_HOST=redis-host
REDIS_SERVER_PORT=redis-port
```
</details>

<details>
<summary> [6.1.2] installation </summary> 

```
cd api
npm install
```
</details>

<details>
<summary> [6.1.3] run </summary> 

```
cd api
npm run dev
```
</details>
then we can access to http://localhost:9090 , you may need to check the port 
</details>

<details>
<summary> [6.2] local machine with docker ( Recommended ) </summary> 


<img src="resources/local-archie.png" width="70%">

##### [6.2.1] create docker network
```
docker network create \
  --driver=bridge \
  --subnet=172.3.0.0/16 \
  --ip-range=172.3.0.0/24 \
  urlshortenernetwork
```

##### [6.2.2] build images
<details>
<summary> database image </summary> 

```
docker build -t urlshortener:databaselayer \
  --build-arg db_host=localhost \
  --build-arg db_port=3306 \
  --build-arg  db_user=root \
  --build-arg db_password=password \
  --build-arg db_name=urlshortenerservice \
  --no-cache -f ./docker/databaseDockerfile .
```
</details>

<details>
<summary> application image </summary> 

```
docker build -t urlshortener:application \
  --no-cache -f ./docker/applicationDockerfile .
```
</details>

##### [6.2.3] Create Containers

<details>
<summary> cache container </summary> 

```
docker run --name cachecontainer \
--network=urlshortenernetwork \
--ip 172.3.0.15 \
-d redis
```
</details>

<details>
<summary> database container </summary> 

```
docker run -i -t -d --name databasecontainer \
  --network=urlshortenernetwork \
  --ip 172.3.0.10 \
  --privileged urlshortener:databaselayer
```
</details>

<details>
<summary> application container </summary> 

```
docker run -i -t -d --name applicationcontainer \
  -p 9090:9090 \
  --network=urlshortenernetwork \
  --ip 172.3.0.12 \
  --privileged urlshortener:application
```
</details>

clean all images of urlshortener
```
docker rmi $(docker images urlshortener -q) -f
```

</details>





For future, I will make cover for 
- ECR/ECS  
  <img src="resources/cloud-archie.png" width="70%">
- Lambda(Function/Layer/APIGateway)

---

### [7] How to Test
This test support only for "local machine without docker"  
<details>
 <summary> Unit Test</summary>
 
 command
 ```
 cd api
 npm run test:unit
 ```
 Screen Shoot for "Unit Testing"  
 <img src="resources/unit-test.png" width="70%">
</details>

<details>
 <summary> Integration Test</summary>
 
 command
 ```
 cd api
 npm run test:e2e
 ```
 Screen Shoot for "Integration Testing"  
 <img src="resources/integration-test.png" width="70%">
</details>

<details>
 <summary> Test all in once</summary>
 
 command
 ```
 cd api
 npm run test
 ```
 Screen Shoot for "All In One Testing"  
 <img src="resources/all-test.png" width="70%">
</details>

---

#### [8] OpenApi
Pls let me assume our api is http://localhost:9090 .  
So, our swagger url will be http://localhost:9090/swagger/  
Screen Shoot :  
<img src="resources/swagger-ss.png" width="70%">

### [9] Acknowledgments
Hello Visitor,
I just want to let you know what a pleasure it was.  
  
I am truly grateful for the opportunity to speak with you and I look forward to hearing from you soon.
