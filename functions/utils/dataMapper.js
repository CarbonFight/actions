function map(category, data) {
    if (category === 'transport') {
        return initDataTransport(data)
    } else if (category === 'food') {
        return initDataFood(data)
    } else if (category === 'energy') {
        return initDataEnergy(data)
    } else {
        return false
    }
}

function initDataTransport(data) {
    const co2e = typeof data.co2e !== 'undefined' ? data.co2e : 0
    const powertype =
        typeof data.powertype !== 'undefined' ? data.powertype : ''
    const roundTrip =
        typeof data.roundTrip !== 'undefined' ? data.roundTrip : false
    const created_time =
        typeof data.created_time !== 'undefined' ? data.created_time : ''
    const distance = typeof data.distance !== 'undefined' ? data.distance : '0'
    const day = typeof data.day !== 'undefined' ? data.day : ''
    const passengers =
        typeof data.passengers !== 'undefined' ? data.passengers : '1'
    const periodicity =
        typeof data.periodicity !== 'undefined' ? data.periodicity : []
    const isPeriodic =
        typeof data.isPeriodic !== 'undefined' ? data.isPeriodic : false

    return {
        co2e,
        powertype,
        roundTrip,
        created_time,
        distance,
        day,
        userId: data.userId,
        transport: data.transport,
        isPeriodic,
        passengers,
        periodicity,
    }
}

function initDataFood(data) {
    const co2e = typeof data.co2e !== 'undefined' ? data.co2e : 0
    const mainComponent =
        typeof data.mainComponent !== 'undefined' ? data.mainComponent : ''
    const sideComponent =
        typeof data.sideComponent !== 'undefined' ? data.sideComponent : []
    const created_time =
        typeof data.created_time !== 'undefined'
            ? data.created_time
            : // TODO: fix date
              'dates.date'
    const portions = typeof data.portions !== 'undefined' ? data.portions : 1
    const day =
        typeof data.day !== 'undefined'
            ? data.day
            : // TODO: fix day
              'dates.day'
    const periodicity =
        typeof data.periodicity !== 'undefined' ? data.periodicity : []
    const isPeriodic =
        typeof data.isPeriodic !== 'undefined' ? data.isPeriodic : false

    return {
        co2e,
        mainComponent,
        created_time,
        portions,
        day,
        userId: data.userId,
        food: data.food,
        isPeriodic,
        periodicity,
        sideComponent,
    }
}

function initDataEnergy(data) {
    const co2e = typeof data.co2e !== 'undefined' ? data.co2e : 0
    const powertype =
        typeof data.powertype !== 'undefined' ? data.powertype : ''
    const created_time =
        typeof data.created_time !== 'undefined'
            ? data.created_time
            : // TODO: fix date
              'dates.date'
    const volume = typeof data.volume !== 'undefined' ? data.volume : '0'
    const day =
        typeof data.day !== 'undefined'
            ? data.day // TODO: fix day
            : 'dates.day'
    const peopleSharing =
        typeof data.peopleSharing !== 'undefined' ? data.peopleSharing : '1'
    const periodicity =
        typeof data.periodicity !== 'undefined'
            ? data.periodicity
            : [
                  'Lundi',
                  'Mardi',
                  'Mercredi',
                  'Jeudi',
                  'Vendredi',
                  'Samedi',
                  'Dimanche',
              ]
    const isPeriodic =
        typeof data.isPeriodic !== 'undefined' ? data.isPeriodic : true

    return {
        co2e,
        powertype,
        created_time,
        volume,
        day,
        userId: data.userId,
        energy: data.energy,
        isPeriodic,
        peopleSharing,
        periodicity,
    }
}

module.exports = map
