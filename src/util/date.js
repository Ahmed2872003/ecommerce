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

class CustomDate extends Date {
  // eslint-disable-next-line no-useless-constructor
  constructor(date) {
    super(date);
  }

  getDateAfter(nOfDays) {
    nOfDays = Number.parseInt(nOfDays);

    if (Number.isNaN(nOfDays) || nOfDays < 0) return null;

    return new CustomDate(this.getTime() + nOfDays * 24 * 60 * 60 * 1000);
  }

  getInfo() {
    const dayName = days[this.getDay()];

    const dayNumberOfMonth = this.getDate();

    const monthName = months[this.getMonth()];

    const monthNumber = this.getMonth() + 1;

    const year = this.getFullYear();

    return {
      day: { name: dayName, numberInMonth: dayNumberOfMonth },
      month: { name: monthName, number: monthNumber },
      year,
    };
  }

  toString() {
    const dateInfo = this.getInfo();

    return `${dateInfo.month.name} ${dateInfo.day.numberInMonth}, ${dateInfo.year}`;
  }
  equals(date) {
    if (date instanceof Date) return this.getTime() === date.getTime();

    return false;
  }
}

export { CustomDate };
