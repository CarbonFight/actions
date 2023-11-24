const { generateUser } = require("../../../data/users.dataset");
const { daysInStreak } = require('./days-in-streak');

describe('daysInStreak: check the number of consecutive days in a streak', () => {
    it('should return the correct streak count from days in user connection history', () => {
        const X = 5;
        const user = generateUser({ numberOfHistoryDates: X, historyDatesShouldFollow: true });

        expect(daysInStreak(user.connection_history)).toBe(X);
    });

    it('should return 1 if there is no streak from the most recent date', () => {
        const user = generateUser({ numberOfHistoryDates: 10, historyDatesShouldFollow: false });

        expect(daysInStreak(user.connection_history)).toBe(1);
    });
});
