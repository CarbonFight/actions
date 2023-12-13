const { badgesList } = require('../modules/badges/methods/validate-badges');

const emptyBadges = Object.fromEntries(
    Object.keys(badgesList).map((key) => [key, false])
);
const completedBadges = Object.fromEntries(
    Object.keys(badgesList).map((key) => [key, true])
);

module.exports = {
    allEmpty: {
        uid: 'tm8nhYrYSPFOKJgdonAt',
        ...emptyBadges,
    },
    allCompleted: {
        uid: 'tm8nhYrYSPFOKJgdonAt',
        ...completedBadges,
    },
};
