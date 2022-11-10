import http from 'http'
import request from 'supertest'
import {Server as Svr} from "@/core/http/server";

//jest.setTimeout(5000);
//jest.setTimeout(50);

let serverClass: Svr;
let prefix: string = '/api/shortenedurl'
http.createServer
let restApiSvr: http.Server;

let tmpGeneratedCode: string = '';



beforeAll(done => {
    serverClass = new Svr(); 
    //http = serverClass.init();
    serverClass.configure();
    restApiSvr = http.createServer(serverClass.httpSvr)
    restApiSvr.listen(serverClass.port);
    
    done()
});


describe('USER API Integration Tests :', () => {

  describe('Retrieve Short Url API : ', () => {

    it('It should return 400 Bad Request status code and error message', 
    function(done){
      request(serverClass.httpSvr)
      .post(`${prefix}/retrieve-url`)
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

    it('retrieve with fake value, It should return 404 NotFound status code and error message', 
    function(done){
      request(serverClass.httpSvr)
      .post(`${prefix}/retrieve-url`)
      .expect(404)
      .send({
        'code':'akn'
      })
      .expect('Content-Type', /json/)
      .expect({
        "message": "Not Found."
      },done);//end expect
    })// end it

    it('retrieve with sql injection, It should return 400 Bad Request status code and error message', 
    function(done){
      request(serverClass.httpSvr)
      .post(`${prefix}/retrieve-url`)
      .expect(400)
      .send({
        'code':"akn'--"
      })
      .expect('Content-Type', /json/)
      .expect({
        "errors": {
            "code": [
                "not acceptable input"
            ]
        }
      },done);//end expect
    })// end it

    it('Generate one short code|url, it should be return 200 status code', 
    function(done){
        request(serverClass.httpSvr).post("/api/shortenedurl/generate")
        .send({
          'expire_time':'23:35',
          'expire_date':'2023-11-21',
          'url':'https://www.aungkyawnyunt.com'
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => { 
          expect(response.body.message).toEqual('Successfully Generated');
          tmpGeneratedCode = response.body.data.code
          done();
        })
        .catch(err => done(err));
    });//end it
    
    type TR = request.Response | any;
    let isDatabase:boolean = true;
    const delay = (t:number) => new Promise(resolve => setTimeout(resolve, t));
    for(let index=1;index<=8;index++){
      
      it(`${index} times request , it should be retrieve from ${isDatabase?'database':'cache'}`,
      function(done){
        delay(30).then(() => {
          isDatabase = index<8
          request(serverClass.httpSvr).post("/api/shortenedurl/retrieve-url")
          .send({
            'code':tmpGeneratedCode,
          })
          .expect('Content-Type', /json/)
          .expect(200)
          .then(response => { 
            expect(response.body.data.from).toEqual(`${isDatabase?'database':'cache'}`);
            done();
          })
            
        });
      });//end it 
    }

    for(let index=8;index<=15;index++){
      isDatabase = false;
      it(`${index} times request , it should be retrieve from ${isDatabase?'database':'cache'}`,
      function(done){
        delay(30).then(() => {
          
          request(serverClass.httpSvr).post("/api/shortenedurl/retrieve-url")
          .send({
            'code':tmpGeneratedCode,
          })
          .expect('Content-Type', /json/)
          .expect(200)
          .then(response => { 
            expect(response.body.data.from).toEqual(`${isDatabase?'database':'cache'}`);
            done();
          })
            
        });
      });//end it 
    }
  

      


  });


});

afterAll(done => {
  // terminate the app.
  restApiSvr.close();
  done()
});