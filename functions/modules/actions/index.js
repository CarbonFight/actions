const functions = require('firebase-functions');
const Logger = require('../../logger-setup');
const { isParametersValidOnCreate } = require('./validation');

exports.update = functions
    .region('europe-west6')
    .firestore.document('/actions/{documentId}')
    .onUpdate(async (change) => {
        const data = change.after.data();
        const category = data.category;

        const co2eBefore = change.before.data().co2e;
        const co2eCurrent = change.after.data().co2e;

        if (co2eCurrent === co2eBefore) {
            const validationResult = isParametersValidOnCreate(category, data);

            if (!validationResult.success) {
                await change.after.ref.delete();
                Logger.error(validationResult);
                return validationResult.error;
            }
        }
    });

exports.create = functions
    .region('europe-west6')
    .firestore.document('/actions/{documentId}')
    .onCreate(async (snap) => {
        const data = snap.data();
        const category = data.category;

        const validationResult = isParametersValidOnCreate(category, data);

        if (!validationResult.success) {
            await snap.ref.delete();
            Logger.error(validationResult);
            return validationResult.error;
        }

        await snap.ref.set(data);
    });
