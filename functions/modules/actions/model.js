exports.createActionModel = function (category, data) {
    if (category === 'transport') {
        return initEmptyDataTransport(data);
    } else if (category === 'food') {
        return initEmptyDataFood(data);
    } else if (category === 'energy') {
        return initEmptyDataEnergy(data);
    } else {
        throw new Error(`Category : "${category}" for action doesn't exist.`);
    }
}

function initEmptyDataTransport(data) {
    return {
        co2e: 0,
        roundTrip: false,
        created_time: '',
        distance: 0,
        day: '',
        uid: '',
        transport: '',
        isPeriodic: false,
        passengers: 0,
        periodicity: [],
        ...data
    };
}

function initEmptyDataFood(data) {
    return {
        co2e: 0,
        mainComponent: '',
        created_time: '',
        portions: 1,
        day: '',
        uid: '',
        food: '',
        isPeriodic: false,
        periodicity: [],
        sideComponent: [],
        ...data
    };
}

function initEmptyDataEnergy(data) {
    return {
        co2e: 0,
        volume: 0,
        day: '',
        uid: '',
        energy: '',
        isPeriodic: true,
        peopleSharing: 0,
        periodicity: [],
        ...data
    };
}
