const dayjs = require("dayjs");

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
    isCurrentWeek,
    isCurrentMonth,
    isCurrentYear
}