const getToday = () => {

  const today = new Date();
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  return startOfDay;
}

const getPreviousDay = () => {

  const today = new Date();
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);

  return startOfDay;
}

const getFormattedDate = (period) => {

  const date = new Date(period);
  date.setMonth(date.getMonth(), date.getDate());
  const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  var day = date.getDate().toString().padStart(2,0);
  var month = months[date.getMonth()];
  var year = date.getFullYear();
  return `${day}${month}${year}`;
}

const hoursConverter = (num) => { 
      let hours = num;
      let rhours = Math.floor(hours);
      let minutes = (hours - rhours) * 60;
      let rminutes = Math.round(minutes);
      let lminutes = Math.floor(minutes);
      let seconds = (minutes - lminutes) * 60;
      let rseconds = Math.round(seconds);
      return rhours + " hora(s), " + rminutes + " minuto(s) e " + rseconds + " segundo(s).";  
}

const methods = {
  getToday,
  getFormattedDate,
  getPreviousDay,
  hoursConverter
}

export default methods;