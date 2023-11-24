const dayjs = require('dayjs');

/**
 * Calculates the length of a streak in a given array of dates.
 *
 * A streak is defined as consecutive dates, where each date is followed by the next one.
 *
 * @param {Array<string>} dates - An array of date strings.
 * @returns {number} - The length of the streak in the given array of dates.
 */
module.exports.daysInStreak = function(dates) {
    const dateTimestamps = dates.map(date => dayjs(date).valueOf());

    const sortedDateTimestamps = dateTimestamps.sort((a, b) => b - a);

    let streakCount = 1;

    for (let i = 0; i < sortedDateTimestamps.length - 1; i++) {
        const current = dayjs(sortedDateTimestamps[i]);
        const next = sortedDateTimestamps[i + 1] ? dayjs(sortedDateTimestamps[i + 1]).add(1, 'day') : null;

        if (next && current.isSame(next, 'day')) {
            streakCount++;
        } else {
            break;
        }
    }

    return streakCount;
};
