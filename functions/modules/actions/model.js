exports.createActionModel = function (category) {
    if (category === 'transport') {
        return initEmptyDataTransport();
    } else if (category === 'food') {
        return initEmptyDataFood();
    } else if (category === 'energy') {
        return initEmptyDataEnergy();
    } else {
        return {};
    }
}

function initEmptyDataTransport() {
    return {
        co2e: 0,
        roundTrip: false,
        created_time: '',
        distance: 0,
        day: '',
        userId: '',
        transport: '',
        isPeriodic: false,
        passengers: 0,
        periodicity: [],
    };
}

function initEmptyDataFood() {
    return {
        co2e: 0,
        mainComponent: '',
        created_time: '',
        portions: 1,
        day: '',
        userId: '',
        food: '',
        isPeriodic: false,
        periodicity: [],
        sideComponent: [],
    };
}

function initEmptyDataEnergy() {
    return {
        co2e: 0,
        volume: 0,
        day: '',
        userId: '',
        energy: '',
        isPeriodic: true,
        peopleSharing: 0,
        periodicity: [],
    };
}
