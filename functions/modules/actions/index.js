const functions = require('firebase-functions')
const Logger = require('../../logger-setup')
const {
    isParametersValidOnCreate,
    validateTransportAction,
    validateFoodAction,
    validateEnergyAction,
} = require('./validation')
const { updateStats } = require("../stats/methods/update-stats");
const { createActionModel } = require("./model");

exports.update = functions
    .region('europe-west6')
    .firestore.document('/actions/{documentId}')
    .onUpdate(async (change) => {
        const data = change.after.data()
        const category = data.category

        const co2eBefore = change.before.data().co2e;
        const co2eCurrent = change.after.data().co2e;

        if (co2eCurrent === co2eBefore) {
            let validationResult;
            if (category === 'transport') {
                validationResult = validateTransportAction(data);
            } else if (category === 'food') {
                validationResult = validateFoodAction(data);
            } else if (category === 'energy') {
                validationResult = validateEnergyAction(data);
            }

            if (!validationResult.success) {
                await change.after.ref.delete();
                Logger.error(validationResult)
                throw new Error(validationResult);
            }
        }
    })

exports.create = functions
    .region('europe-west6')
    .firestore.document('/actions/{documentId}')
    .onCreate(async (snap) => {
        const data = snap.data();
        const category = data.category;

        const validationResult = isParametersValidOnCreate(category, data);

        if (!validationResult.success) {
            await snap.ref.delete();
            Logger.error(validationResult)
            throw new Error(validationResult);
        }

        const value = createActionModel(category, data);
        await snap.ref.set(value);
    });

exports.delete = functions
    .region('europe-west6')
    .firestore.document('/actions/{documentId}')
    .onDelete(async (snap) => {
        try {
            const data = snap.data()
        } catch (error) {
            throw new Error(`${snap.data().category} delete failed, ${error}`)
        }
    })
