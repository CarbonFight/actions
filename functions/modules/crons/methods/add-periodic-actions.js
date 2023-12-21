const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc);
dayjs.extend(timezone);

const Logger = require('../../../logger-setup');

const { dbInstance } = require('../../../db-setup');

const {
    getPeriodicActions,
    getDepreciationActions,
} = require('../../actions/methods/get-periodic-actions');
const { createAction } = require('../../actions/methods/create-action');

dayjs.tz.setDefault('Europe/Paris');
process.env.TZ = 'Europe/Paris';

module.exports.addPeriodicActions = async function () {
    try {
        const db = await dbInstance();

        const today = dayjs().format('dddd');
        Logger.info(`Today: ${today}`);

        const periodicActionsSnapshot = await getPeriodicActions(db);

        if (periodicActionsSnapshot.docs.length > 0) {
            const periodicActions = periodicActionsSnapshot.docs.map((doc) =>
                doc.data()
            );

            for (const action of periodicActions) {
                const periodicity = action.periodicity;

                // periodic action without day periodicity (eg: energy/gaz contracts...)
                if (!periodicity && !action.yearEndPurchase) {
                    await createAction(db, action);
                }

                // periodic action with periodicity (eg: monday, tuesday...)
                if (periodicity && periodicity.length > 0) {
                    const dayMatch = isDayMatching(periodicity, today);

                    if (dayMatch) {
                        await createAction(db, action);
                    }
                }
            }

            Logger.info('Periodic actions successfully created.');
        }

        const depreciationActionsSnapshot = await getDepreciationActions(db);

        if (depreciationActionsSnapshot.docs.length > 0) {
            const depreciationActions = depreciationActionsSnapshot.docs
                .map((doc) => {
                    return doc.data();
                })
                .filter((action) => action.yearEndPurchase.length === 4);

            if (depreciationActions.length > 0) {
                for (const action of depreciationActions) {
                    Logger.info(`Creating action for user ${action.uid}`);
                    await createAction(db, action);
                }
            }

            Logger.info('Depreciation actions successfully created.');
        }
    } catch (error) {
        Logger.error(`Error creating periodic actions: ${error}`);
    }
};

function isDayMatching(periodicity, today) {
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
