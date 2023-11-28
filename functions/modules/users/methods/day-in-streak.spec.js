const { generateUser } = require('../../../data/users.dataset');
const { dayInStreak } = require('./day-in-streak');

describe('dayInStreak: verifying consecutive day streaks in user connection history', () => {
    it('should return true: the last connection day is a consecutive day', () => {
        const user = generateUser({
            numberOfHistoryDates: 5,
            historyDatesShouldFollow: true,
        });

        expect(dayInStreak(user.connection_history)).toEqual(true);
    });

    it('should return false: the last connection day is not a consecutive day', () => {
        const user = generateUser({
            numberOfHistoryDates: 10,
            historyDatesShouldFollow: false,
        });

        expect(dayInStreak(user.connection_history)).toEqual(false);
    });
});
