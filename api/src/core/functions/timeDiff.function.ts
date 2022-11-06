export const timeDiff = (_startDate:string,_endDate:string): number=>{
  try{
    let sD = new Date(_startDate);
    
    let eD = new Date(_endDate);
    let res: number = ((eD.getTime() - sD.getTime())/1000)/60; //1000 => 1 second is 1000 mil sec // 1 minute = 60 sec
    console.log('_startDate date ',_startDate)
    console.log('expire date ',sD)
    console.log('_endDate date ',_endDate)
    console.log('expire date ',eD)
    console.log('res',res)
    return res;
  }
  catch(err){
    return 0;
  }
}