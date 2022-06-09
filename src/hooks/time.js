const getToday = () => {

  const today = new Date();
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const timestamp = startOfDay / 1000;

  return timestamp;
}

const getFormattedDate = (unix) => {

  const date = new Date(unix * 1000);
  date.setMonth(date.getMonth() - 2, date.getDate());
  const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  var day = date.getDate().toString().padStart(2,0);
  var month = months[date.getMonth()];
  var year = date.getFullYear();
  return `${day}${month}${year}`;
}

const methods = {
  getToday,
  getFormattedDate
}

export default methods;