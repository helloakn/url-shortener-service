import {timeDiff} from '@/core/functions/timeDiff.function'

describe('Unit Test: timeDiff Function', () => {
  // Date format  : yyyy-MM-dd h:mm:tt
  // formula is secondDate - firstDate
  // 1 minute = 60 second
  // 1 hour = 60 minute
  // timeDiff return in minute
  it(`2022-12-02 21:00:00 - 2022-12-01 21:00:00 = 1440 // 60*24 = 1440 minutes per day `,
  function(done){
  let firstDate = '2022-12-01 21:00:00'
  let secondDate = '2022-12-02 21:00:00'

  let result:number = timeDiff(firstDate,secondDate)
  expect(result).toEqual(60*24); // 60*24 = 1440 minutes per day
    done()
  }); //end it
});