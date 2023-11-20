const { dbInstance } = require('../../db-setup');
const { challengeMappings } = require('./model');

module.exports.updateChallenges = async function (newStats, uid) {
    const updates = {};

    /* Check if challenges need to be updated according to `stats` conditions 
        in the `challengeMappings` object.  */
    for (const [statKey, conditions] of Object.entries(challengeMappings)) {
        conditions.forEach(({ key: challengeKey, condition }) => {
            if (condition(newStats[statKey])) {
                updates[challengeKey] = true;
            }
        });
    }

    /* Perform single update if any modified `stats` document fields that are mapped
         to the `challenges` document fields */
    if (Object.keys(updates).length > 0) {
        const db = dbInstance();
        await db
            .collection('challenges')
            .where('uid', '==', uid)
            .limit(1)
            .get()
            .then((query) => query.docs[0].ref.update(updates));
    }
};
