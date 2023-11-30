const Logger = require('../../../logger-setup');

const { dbInstance } = require('../../../db-setup');

const { getUsers } = require('../../users/methods/get-users');
const { resetDailyStats } = require('../../stats/methods/reset-daily-stats');

module.exports.resetDailyStats = async function () {
    try {
        const db = await dbInstance();

        const usersSnapshot = await getUsers(db);

        if (usersSnapshot.docs.length > 0) {
            const users = usersSnapshot.docs.map((doc) => doc.data().uid);

            for (const userId of users) {
                await resetDailyStats(db, userId);
            }

            Logger.info('Daily stats have been successfully reset.');
        }
    } catch (error) {
        Logger.error(`Error resetting daily stats: ${error}`);
    }
};
