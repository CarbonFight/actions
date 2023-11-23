const functions = require('firebase-functions')
const { updateStatsNewDay } = require("./methods/updateStatsNewDay");

exports.scheduleUpdateStatsNewDay = functions
    .region('europe-west6')
    .pubsub.schedule('0 0 * * *')
    .timeZone('Europe/Paris')
    .onRun(async () => {
        await updateStatsNewDay()
    });
