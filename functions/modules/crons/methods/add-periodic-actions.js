const dayjs = require('dayjs');

const Logger = require('../../../logger-setup');

const { dbInstance } = require('../../../db-setup');

const {
    getPeriodicActions,
} = require('../../actions/methods/get-periodic-actions');
const { createAction } = require('../../actions/methods/create-action');

module.exports.addPeriodicActions = async function () {
    try {
        const db = await dbInstance();

        const periodicActionsSnapshot = await getPeriodicActions(db);

        if (periodicActionsSnapshot.docs.length > 0) {
            const periodicActions = periodicActionsSnapshot.docs.map((doc) =>
                doc.data()
            );

            for (const action of periodicActions) {
                const periodicity = action.periodicity;

                if (periodicity.length > 0) {
                    const dayMatch = isDayMatching(periodicity);

                    if (dayMatch) {
                        await createAction(db, action);
                    }
                }
            }

            Logger.info('Periodic action successfully created.');
        }
    } catch (error) {
        Logger.error(`Error creating periodic actions: ${error}`);
    }
};

function isDayMatching(periodicity) {
    const today = dayjs().format('dddd');

    switch (today) {
        case 'Monday':
            return periodicity.includes('L');
        case 'Tuesday':
            return periodicity.includes('Ma');
        case 'Wednesday':
            return periodicity.includes('Me');
        case 'Thursday':
            return periodicity.includes('J');
        case 'Friday':
            return periodicity.includes('V');
        case 'Saturday':
            return periodicity.includes('S');
        case 'Sunday':
            return periodicity.includes('D');
        default:
            return false;
    }
}
