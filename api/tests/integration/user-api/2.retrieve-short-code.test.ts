import http from 'http'
import request from 'supertest'
import {Server as Svr} from "@/core/http/server";

jest.setTimeout(5000);

let serverClass: Svr;
let prefix: string = '/api/shortenedurl/'
http.createServer
let restApiSvr: http.Server;
beforeAll(done => {
    serverClass = new Svr(); 
    //http = serverClass.init();
    serverClass.configure();
    restApiSvr = http.createServer(serverClass.httpSvr)
    restApiSvr.listen(serverClass.port);
    
    done()
});
afterAll(done => {
  // terminate the app.
  restApiSvr.close();
  done()
});

describe('USER API Integration Tests :', () => {

  describe('Retrieve Short Url API : ', () => {
    it('It should return 400 Bad Request status code and error message', 
    function(done){
      request(serverClass.httpSvr)
      .post(`${prefix}retrieve-url`)
      .expect(400)
      .expect('Content-Type', /json/)
      .expect({
        "errors": {
            "code": [
                "not acceptable input",
                "short code should not be empty",
                "maximum length of the code is 25"
            ]
        }
      },done);//end expect
    })// end it


  });


});