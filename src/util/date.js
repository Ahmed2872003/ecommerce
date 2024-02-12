const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const getDateAfter = (nOfDays, startDate) => {
  nOfDays = Number.parseInt(nOfDays);

  if (Number.isNaN(nOfDays) || nOfDays < 0 || !startDate) return null;

  return constructDateObj(
    new Date(startDate).getTime() + nOfDays * 24 * 60 * 60 * 1000
  );
};

const constructDateObj = (date) => {
  const dateObj = new Date(date);

  const dayName = days[dateObj.getDay()];

  const dayNumberOfMonth = dateObj.getDate();

  const monthName = months[dateObj.getMonth()];

  const monthNumber = dateObj.getMonth() + 1;

  const year = dateObj.getFullYear();

  return {
    day: { name: dayName, numberInMonth: dayNumberOfMonth },
    month: { name: monthName, number: monthNumber },
    year,
  };
};

export { constructDateObj, getDateAfter };
