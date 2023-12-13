const Logger = require('../../../logger-setup');
const { badgesList } = require('./validate-badges');
const { getBadgesByUid } = require('./get-badges-by-uuid');

module.exports.updateBadges = async function (db, uid, challengesObj) {
    const updates = {};

    for (const [badgeKey, badge] of Object.entries(badgesList)) {
        if (badge.condition(challengesObj)) {
            updates[badgeKey] = true;
        }
    }

    if (Object.keys(updates).length > 0) {
        const userBadges = await getBadgesByUid(db, uid);

        if (userBadges) {
            await userBadges.ref.update(updates);
        } else {
            Logger.error(
                `Can't update the badges doc for user with uid: ${uid}`
            );
        }
    }
};
