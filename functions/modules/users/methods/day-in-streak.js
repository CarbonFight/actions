const dayjs = require('dayjs');

/**
 * Checks whether the last timestamp of a sorted array is the next day after the second-last timestamp.
 *
 * @param {Array<number>} timestamps - Array of timestamps.
 * @returns {boolean} - True if the last timestamp is the day after the second-last one, otherwise false.
 */
module.exports.dayInStreak = (timestamps) => {
    if (timestamps.length < 2) return false;

    timestamps.sort((a, b) => a - b);

    // Timestamp from firestore have a special type `Timestamp { _seconds: 1701331498, _nanoseconds: 616000000 }`
    // Parse in order to get same result from Firestore and Local
    const parsedTimestamps = (() => {
        if (timestamps[0]._seconds && timestamps[0]._nanoseconds) {
            return timestamps.map((t) => t.toDate());
        }

        return timestamps;
    })();

    const secondLastTimestamp = dayjs(
        parsedTimestamps[parsedTimestamps.length - 2]
    );
    const lastTimestamp = dayjs(parsedTimestamps[parsedTimestamps.length - 1]);

    return secondLastTimestamp.add(1, 'day').isSame(lastTimestamp, 'day');
};
