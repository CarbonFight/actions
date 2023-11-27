const functions = require('firebase-functions');
const Logger = require('../../logger-setup');
const { isParametersValidOnCreate } = require('./validation');
const { updateStats } = require('../stats/methods/update-stats');
const { createActionModel } = require('./model');

exports.update = functions
    .region('europe-west6')
    .firestore.document('/actions/{documentId}')
    .onUpdate(async (change) => {
        const data = change.after.data();
        const category = data.category;

        const co2eBefore = change.before.data().co2e;
        const co2eCurrent = change.after.data().co2e;

        const validationResult = isParametersValidOnCreate(category, data);

        if (!validationResult.success) {
            await change.after.ref.delete();
            Logger.error(validationResult);
            return validationResult.error;
        }

        if (co2eCurrent !== co2eBefore) {
            const co2e = co2eCurrent - co2eBefore;
            await updateStats(category, data.userId, co2e);
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

        const value = createActionModel(category, data);
        await snap.ref.set(value);

        await updateStats(category, data.userId);
    });

exports.delete = functions
    .region('europe-west6')
    .firestore.document('/actions/{documentId}')
    .onDelete(async (snap) => {
        try {
            const data = snap.data();
            await updateStats(data.category, data.userId, data.co2e);
        } catch (error) {
            throw new Error(`${snap.data().category} delete failed, ${error}`);
        }
    });
