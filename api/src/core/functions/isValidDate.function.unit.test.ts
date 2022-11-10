import {isValidDate} from '@/core/functions/isValidDate.function'

/*
  * Example Uses 
  console.log(isValidDate("0000-00-00"));  // false
  console.log(isValidDate("2015-01-40"));  // false
  console.log(isValidDate("2016-11-25"));  // true
  console.log(isValidDate("1970-01-01"));  // true = epoch
  console.log(isValidDate("2016-02-29"));  // true = leap day
  console.log(isValidDate("2013-02-29"));  // false = not leap day
  */

describe('Unit Test: isValidDate Function', () => {

  it(` [0000-00-00] it should return false`,
  function(done){
  let result:boolean = isValidDate('0000-00-00');
  expect(result).toEqual(false); 
    done()
  }); //end it

  it(` [2015-01-40] it should return false`,
  function(done){
  let result:boolean = isValidDate('2015-01-40');
  expect(result).toEqual(false); 
    done()
  }); //end it

  it(` [2016-11-25] it should return false`,
  function(done){
  let result:boolean = isValidDate('2016-11-25');
  expect(result).toEqual(true); 
    done()
  }); //end it

  it(` [1970-01-01]: it should return true`,
  function(done){
  let result:boolean = isValidDate('1970-01-01');
  expect(result).toEqual(true); 
    done()
  }); //end it

  it(` leap day [2016-02-29]: it should return true`,
  function(done){
  let result:boolean = isValidDate('2016-02-29');
  expect(result).toEqual(true); 
    done()
  }); //end it

  it(` no leap day [2013-02-29]: it should return false`,
  function(done){
  let result:boolean = isValidDate('2013-02-29');
  expect(result).toEqual(false); 
    done()
  }); //end it

  it(` wrong format : it should return false`,
  function(done){
  let result:boolean = isValidDate('02-29');
  expect(result).toEqual(false); 
    done()
  }); //end it


});