const dayjs = require('dayjs');
module.exports = {
    carTrip: {
        uid: 'tm8nhYrYSPFOKJgdonAt',
        id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        created_time: dayjs(
            'Tue Nov 07 2023 16:47:35 GMT+0000 (Coordinated Universal Time)'
        ).unix(),
        country: 'FR',
        category: 'transport',
        action: 'car',
        option: 'Thermique',
        co2e: 595,
        count: 10,
        emission_factor: 119,
        peopleSharing: 2,
        roundtrip: true,
        isPeriodic: false,
    },
    metroTrip: {
        uid: 'tm8nhYrYSPFOKJgdonAt',
        id: '9a4bb9cc-357f-4ec2-9f0a-7e8e849f8fc9',
        created_time: dayjs('2023-11-21').unix(),
        country: 'FR',
        category: 'transport',
        action: 'metro',
        option: 'Paris',
        co2e: 20,
        count: 10,
        emission_factor: 2,
        roundtrip: false,
        isPeriodic: false,
    },

    fishRiceVegetablesMeal: {
        uid: 'tm8nhYrYSPFOKJgdonAt',
        id: 'c4128d54-4cb4-4a15-afab-b3d1464636f3',
        created_time: dayjs(
            'Tue Nov 07 2023 16:47:35 GMT+0000 (Coordinated Universal Time)'
        ).unix(),
        country: 'FR',
        category: 'food',
        action: 'main',
        option: 'Poisson',
        co2e: 767,
        count: 1,
        emission_factor: 100,
        side: ['Riz', 'Légumes'],
        isPeriodic: false,
    },

    electricityContract: {
        uid: 'tm8nhYrYSPFOKJgdonAt',
        id: '7420f743-70ae-4a5b-91e7-8765e04969c6',
        created_time: dayjs(
            'Tue Nov 07 2023 16:47:35 GMT+0000 (Coordinated Universal Time)'
        ).unix(),
        country: 'FR',
        category: 'energy',
        action: 'electricity',
        option: 'Mix Français',
        co2e: 21,
        count: 2244,
        emission_factor: 17,
        peopleSharing: 4,
        isPeriodic: true,
        periodicity: [
            'lundi',
            'mardi',
            'mercredi',
            'jeudi',
            'vendredi',
            'samedi',
            'dimanche',
        ],
    },

    dailyEspressoCoffees: {
        uid: 'tm8nhYrYSPFOKJgdonAt',
        id: 'a1445e7d-4bb9-4a08-99cc-b18a15c950f2',
        created_time: dayjs(
            'Tue Nov 07 2023 16:47:35 GMT+0000 (Coordinated Universal Time)'
        ).unix(),
        country: 'FR',
        category: 'food',
        action: 'coffee',
        option: 'Expresso',
        co2e: 200,
        count: 2,
        emission_factor: 100,
        isPeriodic: true,
        periodicity: [
            'lundi',
            'mardi',
            'mercredi',
            'jeudi',
            'vendredi',
            'samedi',
        ],
    },
};
