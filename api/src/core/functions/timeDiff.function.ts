export const timeDiff = (_startDate:string,_endDate:string): number=>{
  try{
    let sD = new Date(_startDate);
    
    let eD = new Date(_endDate);
    return ((eD.getTime() - sD.getTime())/1000)/60; //1000 => 1 second is 1000 mil sec // 1 minute = 60 sec
  }
  catch(err){
    return 0;
  }
}