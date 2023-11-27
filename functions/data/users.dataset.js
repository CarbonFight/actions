const falso = require('@ngneat/falso');
const dayjs = require('dayjs');

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

module.exports.generateUser = () => ({
    connection_history: [
        dayjs(falso.randRecentDate()).format('DD/MM/YYYY'),
        dayjs(falso.randPastDate()).format('DD/MM/YYYY'),
    ],
    created_time: dayjs(falso.randPastDate()).unix(),
    display_name: falso.randFullName(),
    email: falso.randEmail(),
    first_Name: falso.randFirstName(),
    skipHowto: falso.randBoolean(),
    last_Name: falso.randLastName(),
    photo_url: falso.randAvatar(),
    sponsor: generateSponsorCode(),
    sponsorship_code: generateSponsorCode(),
    target: generateTarget(),
    team: generateTeam(),
    uid: falso.randUuid(),
});
