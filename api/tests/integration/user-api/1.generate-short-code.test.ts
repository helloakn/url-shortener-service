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

  describe('Generate Short Url API : ', () => {
    it('It should return 400 Bad Request status code and error message',  (done) => {
      request(restApiSvr)
      .post(`${prefix}generate`)
      .expect(400)
      .expect('Content-Type', /json/)
      .expect({
        "errors": {
            "url": [
                "Please provide valid url address"
            ],
            "expire_date": [
                "not allow empty",
                "date format is wrong",
                "Expiration Date must be greater than current Date"
            ]
        }
      },done);//end expect
    })// end it

    it('test with Back Date, It should return 400 Bad Request status code and error message', (done) => {
      request(restApiSvr)
      .post(`${prefix}generate`)
      .send({
        'expire_time':'23:35',
        'expire_date':'2022-11-08',
        'url':'https://www.yahoo.com'
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .expect({
        "errors": {
            "expire_date": [
                "Expiration Date must be greater than current Date"
            ]
        }
      },done);
    })// end it

    it('test with invalid date time and incorrect url, It should return 400 Bad Request status code and error message', 
    function(done){
      request(restApiSvr)
      .post(`${prefix}generate`)
      .send({
        'expire_time':'2as5',
        'expire_date':'2022-11-1qeqe',
        'url':'hhooasdfom'
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .expect({
        "errors": {
            "url": [
                "Please provide valid url address"
            ],
            "expire_date": [
                "date format is wrong",
                "Expiration Date must be greater than current Date"
            ],
            "expire_time": [
                "Format is {hh:mm}"
            ]
        }
      },done);
    })// end it

    it('test with Valid data, It should return 200 success status code and return json object',
    function(done){
      request(restApiSvr)
      .post(`${prefix}generate`)
      .send({
        'expire_time':'23:35',
        'expire_date':'2023-11-21',
        'url':'https://www.google.com'
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => { 
        expect(response.body.message).toEqual('Successfully Generated');
        done();
      })
    })// end it

  });


});