// Set Paris Timezone (default is UTC, even if function TimeZone is Paris)
process.env.TZ = 'Europe/Paris';

// Calculate Date objects for all periods
const day0 = new Date();
day0.setHours(0, 0, 0, 0);
const day0end = new Date();
day0end.setHours(23, 59, 59, 999);
const day1 = new Date(new Date().setDate(day0.getDate() - 1));
day1.setHours(0, 0, 0, 0);
const day2 = new Date(new Date().setDate(day0.getDate() - 2));
day2.setHours(0, 0, 0, 0);
const day3 = new Date(new Date().setDate(day0.getDate() - 3));
day3.setHours(0, 0, 0, 0);
const day4 = new Date(new Date().setDate(day0.getDate() - 4));
day4.setHours(0, 0, 0, 0);
const day5 = new Date(new Date().setDate(day0.getDate() - 5));
day5.setHours(0, 0, 0, 0);
const day6 = new Date(new Date().setDate(day0.getDate() - 6));
day6.setHours(0, 0, 0, 0);
const day7 = new Date(new Date().setDate(day0.getDate() - 7));
day7.setHours(0, 0, 0, 0);

const week0 = new Date(
  new Date().setDate(
    day0.getDate() - day0.getDay() + (day0.getDay() === 0 ? -6 : 1),
  ),
);
week0.setHours(0, 0, 0, 0);
const week1 = new Date(new Date().setDate(week0.getDate() - 7));
week1.setHours(0, 0, 0, 0);
const week2 = new Date(new Date().setDate(week0.getDate() - 14));
week2.setHours(0, 0, 0, 0);
const week3 = new Date(new Date().setDate(week0.getDate() - 21));
week3.setHours(0, 0, 0, 0);

const y = day0.getFullYear();
const m = day0.getMonth();
const month0 = new Date(y, m, 1);
month0.setHours(0, 0, 0, 0);
const month1 = new Date(y, m - 1, 1);
month1.setHours(0, 0, 0, 0);
const month2 = new Date(y, m - 2, 1);
month2.setHours(0, 0, 0, 0);
const month3 = new Date(y, m - 3, 1);
month3.setHours(0, 0, 0, 0);

const date = new Date();
// This Day DD/MM/YYYYY
const day = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
// Days label
const days = [
  'Dimanche',
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
];
// Today day name
const dayName = days[date.getDay()];

module.exports = {
  day0,
  day0end,
  day1,
  day2,
  day3,
  day4,
  day5,
  day6,
  day7,
  week0,
  week1,
  week2,
  week3,
  month0,
  month1,
  month2,
  month3,
  date,
  day,
  dayName,
};
