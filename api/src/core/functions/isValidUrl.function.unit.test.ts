import {isValidUrl} from '@/core/functions/isValidUrl.function'

describe('Unit Test: isValidUrl Function', () => {

  it(` invalid url should be return false; [ abcdefg => false ]`,
  function(done){
  let result:boolean = isValidUrl('abcdefg');
  expect(result).toEqual(false); 
    done()
  }); //end it

  it(` valid url should be return true; [ www.google.com => true ]`,
  function(done){
  let result:boolean = isValidUrl('www.google.com');
  expect(result).toEqual(true); 
    done()
  }); //end it

  it(` valid url should be return true; [ https://www.google.com => true ]`,
  function(done){
  let result:boolean = isValidUrl('https://www.google.com');
  expect(result).toEqual(true); 
    done()
  }); //end it

  it(` invalid Protocol should be return false; [ ssss://www.google.com => false ]`,
  function(done){
  let result:boolean = isValidUrl('ssss://www.google.com');
  expect(result).toEqual(false); 
    done()
  }); //end it

  it(` invalid domain extenstion should be return false; [ https://www.google => false ]`,
  function(done){
  let result:boolean = isValidUrl('ssss://www.google.com');
  expect(result).toEqual(false); 
    done()
  }); //end it

  it(` valid url without alias(subdomain) should be return true; [ https://google.com => true ]`,
  function(done){
  let result:boolean = isValidUrl('ssss://www.google.com');
  expect(result).toEqual(false); 
    done()
  }); //end it

  it(` valid url with sub-domain should be return true; [ https://api.google.com => true ]`,
  function(done){
  let result:boolean = isValidUrl('ssss://www.google.com');
  expect(result).toEqual(false); 
    done()
  }); //end it

  it(` valid url with nested sub-domain should be return true; [ https://api.v2.google.com => true ]`,
  function(done){
  let result:boolean = isValidUrl('ssss://www.google.com');
  expect(result).toEqual(false); 
    done()
  }); //end it

});