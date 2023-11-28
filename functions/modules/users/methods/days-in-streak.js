const dayjs = require('dayjs');

/**
 * Calculates the length of a streak in a given array of timestamps.
 *
 * A streak is defined as consecutive dates, where each date is followed by the next one.
 *
 * @param {Array<string>} dates - An array of timestamps strings.
 * @returns {number} - The length of the streak in the given array of timestamps.
 */
module.exports.daysInStreak = (timestamps) => {
    if (timestamps.length < 2) return false;

    timestamps.sort((a, b) => a - b);

    // Timestamp from firestore have a special type `Timestamp { _seconds: 1701331498, _nanoseconds: 616000000 }`
    // Parse in order to get same result from Firestore and Local emulator
    const parsedTimestamps =
        timestamps[0]._seconds && timestamps[0]._nanoseconds
            ? timestamps.map((t) => t.toDate())
            : timestamps;

    let streakCount = 1;

    for (let i = 1; i < parsedTimestamps.length; i++) {
        const currentDay = dayjs(parsedTimestamps[i]);
        const previousDay = dayjs(parsedTimestamps[i - 1]);

        if (currentDay.isSame(previousDay.add(1, 'day'), 'day')) {
            streakCount++;
        } else {
            streakCount = 1;
        }
    }

    return streakCount;
};
