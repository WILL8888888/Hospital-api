function timeShow(time) {
  let  newTime = "";
  let date = new Date(time);
  let a = new Array("日","一","二","三","四","五","六");
  let year = String(date.getFullYear()),
      month = String(date.getMonth()+1),//月份是从0开始
      day = String(date.getDate()),
      hour = String(date.getHours()),
      min = String(date.getMinutes()),
      sec= String(date.getSeconds()),
      week = String(new Date().getDay());
      if(Number(hour)<10){
        hour = "0"+hour;
      }
      if(Number(min)<10){
        min="0"+min;
      }
      if(Number(sec)<10){
        sec = "0"+sec;
      }
  newTime = year + "-"+month+"-" +day +"  星期"+a[week] + " "+hour+":"+min+":"+sec;
  return newTime;
}

module.exports = {
  timeShow
}