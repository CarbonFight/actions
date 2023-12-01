const dayjs = require("dayjs");
const customParseFormat = require('dayjs/plugin/customParseFormat')
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')

dayjs.extend(customParseFormat)
dayjs.extend(utc)
dayjs.extend(timezone)

dayjs.tz.setDefault('Europe/Paris')

/**
 * Formats a given date for database storage in the format 'DDMMYYYY'.
 *
 * @param {Date} date - The date object to be formatted.
 * @returns {string} - The formatted date string.
 */
function formatDateForDB(date) {
    return dayjs(date).format('DDMMYYYY');
}

/**
 * Parses a date from a given database format using dayjs.
 *
 * @param {string} format - The date string to parse in the 'DDMMYYYY' format.
 * @returns {dayjs} - A dayjs object representing the parsed date.
 */
function parseDateFromDbFormat(format) {
    return dayjs(format, 'DDMMYYYY')
}

/**
 * Checks if a given date is current day.
 *
 * @param {Date} date - The date to be checked.
 * @returns {boolean} - True if the date is current day, otherwise false.
 */
function isCurrentDay(date) {
    return dayjs(date).diff(dayjs(), 'days') === 0;
}

/**
 * Checks if a given date falls within the current week.
 *
 * @param {Date} date - The date to be checked.
 * @returns {boolean} - True if the date is within the current week, otherwise false.
 */
function isCurrentWeek(date) {
    const diff = dayjs(date).diff(dayjs(), 'days');
    return 0 >= diff && diff > -7;
}

/**
 * Checks if a given date falls within the current month.
 *
 * @param {Date} date - The date to be checked.
 * @returns {boolean} - True if the date is within the current month, otherwise false.
 */
function isCurrentMonth(date) {
    return 0 >= dayjs(date).diff(dayjs(), 'days') && dayjs(date).diff(dayjs(), 'days') > -31;
}

/**
 * Checks if a given date falls within the current year.
 *
 * @param {Date} date - The date to be checked.
 * @returns {boolean} - True if the date is within the current year, otherwise false.
 */
function isCurrentYear(date) {
    return dayjs(date).year() === dayjs().year();
}

module.exports = {
    formatDateForDB,
    isCurrentDay,
    isCurrentWeek,
    isCurrentMonth,
    isCurrentYear,
    parseDateFromDbFormat,
}