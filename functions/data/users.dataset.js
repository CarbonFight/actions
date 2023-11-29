const dayjs = require('dayjs');
const falso = require('@ngneat/falso');

function generateSponsorCode() {
    return Array.from({ length: 8 }, () =>
        String.fromCharCode(Math.floor(Math.random() * 26) + 65)
    ).join('-');
}

function generateTeam() {
    const teams = ['earth', 'sky', 'forest'];
    return falso.rand(teams);
}

function generateTarget() {
    const targets = [2, 4, 6, 8, 10];
    return falso.rand(targets);
}

module.exports.generateUser = (params = {}) => {
    const { numberOfHistoryDates = 2, historyDatesShouldFollow = false } =
        params;
    const addDays = (date, days) => dayjs(date).add(days, 'day').toDate();

    let connection_history;

    if (historyDatesShouldFollow) {
        const firstDate = falso.randRecentDate();
        connection_history = Array.from(
            { length: numberOfHistoryDates },
            (_, index) => addDays(firstDate, index)
        );
    } else {
        let prevDate = falso.randRecentDate();
        connection_history = Array.from(
            { length: numberOfHistoryDates },
            (_, index) => {
                const currentDate = addDays(prevDate, 2);
                prevDate = currentDate;
                return currentDate;
            }
        );
    }

    return {
        connection_history,
        created_time: falso.randPastDate(),
        display_name: falso.randFullName(),
        email: falso.randEmail(),
        first_Name: falso.randFirstName(),
        hasCompletedHowto: falso.randBoolean(),
        last_Name: falso.randLastName(),
        photo_url: falso.randAvatar(),
        sponsor: generateSponsorCode(),
        sponsorship_code: generateSponsorCode(),
        target: generateTarget(),
        team: generateTeam(),
        uid: falso.randUuid(),
    };
};
