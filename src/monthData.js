export default function getMonthInfo(year, month) {
  const months = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December"
  };
  let totalDays = new Date(year, month + 1, 0).getDate();
  let startDay = new Date(year, month, 1).getDay();
  let monthName = months[month];
  return {
    totalDays: totalDays,
    startDay: startDay,
    monthName: monthName
  };
}
