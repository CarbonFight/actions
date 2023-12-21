const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault('Europe/Paris');
process.env.TZ = 'Europe/Paris';

module.exports.getPeriodicActions = async function (db) {
    return await db.collection('actions').where('isPeriodic', '==', true).get();
};

module.exports.getDepreciationActions = async function (db) {
    const actualYear = dayjs().format('YYYY');
    return await db
        .collection('actions')
        .where('yearEndPurchase', '>=', actualYear)
        .get();
};
