const functions = require('firebase-functions')
const map = require('../../utils/dataMapper')
const updateStats = require('../stats')
const {
    isParametersValidOnCreate,
    validateTransportAction,
    validateFoodAction,
    validateEnergyAction,
} = require('./validation')
const Logger = require('../../logger-setup')

exports.update = functions
    .region('europe-west6')
    .firestore.document('/actions/{documentId}')
    .onUpdate(async (change) => {
        const data = change.after.data()
        const category = data.category
        try {
            const co2eBefore = change.before.data().co2e
            const co2eCurrent = change.after.data().co2e
            if (co2eCurrent !== co2eBefore) {
                const co2e = co2eCurrent - co2eBefore
                Logger.error('updateStats is not triggered safely.')
                //TODO: remove
                //validateTransportAction(data)
                //await updateStats(category, data.userId, co2e)
            } else {
                let isValid = false
                if (category === 'transport') {
                    isValid = validateTransportAction(data)
                } else if (category === 'food') {
                    isValid = validateFoodAction(data)
                } else if (category === 'energy') {
                    isValid = validateEnergyAction(data)
                }
                if (!isValid) {
                    change.after.ref.delete()
                    throw new Error(
                        `Action has been deleted, parameter missing in document :  ${JSON.stringify(
                            change.after.data(),
                        )}`,
                    )
                }
            }
        } catch (error) {
            throw new Error(`${category} calculation failed, ${error}`)
        }
    })

exports.create = functions
    .region('europe-west6')
    .firestore.document('/actions/{documentId}')
    .onCreate(async (snap) => {
        try {
            const data = snap.data()
            const category = data.category
            const isValid = isParametersValidOnCreate(category, data)
            if (isValid) {
                const value = map(category, data)
                await snap.ref.set(value)
            } else {
                await snap.ref.delete()
                throw new Error(
                    `Action has been deleted, parameter missing in document :  ${JSON.stringify(
                        snap.data(),
                    )}`,
                )
            }
            await Logger.error('updateStats is not triggered safely.')
            //updateStats(category, data.userId)
        } catch (error) {
            throw new Error(
                `${snap.data().category} calculation failed, ${error}`,
            )
        }
    })

exports.delete = functions
    .region('europe-west6')
    .firestore.document('/actions/{documentId}')
    .onDelete(async (snap) => {
        try {
            const data = snap.data()
            const category = data.category
            Logger.error('updateStats is not triggered safely.')
            //await updateStats(category, data.userId, co2e)
        } catch (error) {
            throw new Error(`${snap.data().category} delete failed, ${error}`)
        }
    })
