exports.validateActionModel = function (actionObject) {
    return true
}

exports.validateTransportAction = function (actionObject) {
    return (
        typeof actionObject.powertype !== 'undefined' &&
        typeof actionObject.roundTrip !== 'undefined' &&
        typeof actionObject.created_time !== 'undefined' &&
        typeof actionObject.distance !== 'undefined' &&
        typeof actionObject.day !== 'undefined' &&
        typeof actionObject.userId !== 'undefined' &&
        typeof actionObject.transport !== 'undefined' &&
        typeof actionObject.isPeriodic !== 'undefined' &&
        typeof actionObject.passengers !== 'undefined' &&
        typeof actionObject.periodicity !== 'undefined'
    )
}

exports.validateFoodAction = function (actionObject) {
    return (
        typeof actionObject.mainComponent !== 'undefined' &&
        typeof actionObject.sideComponent !== 'undefined' &&
        typeof actionObject.created_time !== 'undefined' &&
        typeof actionObject.portions !== 'undefined' &&
        typeof actionObject.day !== 'undefined' &&
        typeof actionObject.userId !== 'undefined' &&
        typeof actionObject.food !== 'undefined' &&
        typeof actionObject.isPeriodic !== 'undefined' &&
        typeof actionObject.periodicity !== 'undefined'
    )
}

exports.validateEnergyAction = function (actionObject) {
    return (
        typeof actionObject.powertype !== 'undefined' &&
        typeof actionObject.periodicity !== 'undefined' &&
        typeof actionObject.created_time !== 'undefined' &&
        typeof actionObject.volume !== 'undefined' &&
        typeof actionObject.day !== 'undefined' &&
        typeof actionObject.userId !== 'undefined' &&
        typeof actionObject.energy !== 'undefined' &&
        typeof actionObject.isPeriodic !== 'undefined' &&
        typeof actionObject.peopleSharing !== 'undefined'
    )
}

exports.isParametersValidOnCreate = function (category, data) {
    const userId = typeof data.userId !== 'undefined'
    if (category === 'transport') {
        return userId && typeof data.transport !== 'undefined'
    } else if (category === 'food') {
        return userId && typeof data.food !== 'undefined'
    } else if (category === 'energy') {
        return userId && typeof data.energy !== 'undefined'
    } else {
        return false
    }
}
