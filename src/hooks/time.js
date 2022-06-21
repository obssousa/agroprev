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

const methods = {
  getToday,
  getFormattedDate,
  getPreviousDay
}

export default methods;