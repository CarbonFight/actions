const functions = require('firebase-functions');
const { resetDailyStats } = require('./methods/resetDailyStats');

exports.scheduleResetDailyStats = functions
    .region('europe-west6')
    .pubsub.schedule('0 0 * * *')
    .timeZone('Europe/Paris')
    .onRun(async () => {
        await resetDailyStats();
    });
