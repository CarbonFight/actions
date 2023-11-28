const Logger = require('../../../logger-setup');

const { dbInstance } = require('../../../db-setup');

const { getUsers } = require('../../users/methods/get-users');
const { getUserActions } = require('../../actions/methods/get-actions-by-user');
const { resetDailyStats } = require('../../stats/methods/reset-daily-stats');

module.exports.resetDailyStats = async function () {
    try {
        const db = await dbInstance();

        const usersSnapshot = await getUsers(db);

        if (usersSnapshot.docs.length > 0) {
            const users = usersSnapshot.docs.map((doc) => doc.data().uid);

            for (const userId of users) {
                const actionsSnapshot = await getUserActions(db, userId);

                // Check if the user has only non-periodic actions
                const hasOnlyNonPeriodicActions = actionsSnapshot.docs.every(
                    (doc) => !doc.data().isPeriodic
                );

                // If no periodic action, reset daily stats
                if (hasOnlyNonPeriodicActions) {
                    await resetDailyStats(db, userId);
                }
            }

            Logger.info('Daily stats have been successfully reset.');
        }
    } catch (error) {
        Logger.error(`Error resetting daily stats: ${error}`);
    }
};
