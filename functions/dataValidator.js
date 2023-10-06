function isChampsValid(category, data) {
    if (category === 'transport') {
        return typeof data.powertype !== 'undefined' && typeof data.roundTrip !== 'undefined'
        && typeof data.created_time !== 'undefined' && typeof data.distance !== 'undefined'
        && typeof data.day !== 'undefined' && typeof data.userId !== 'undefined'
        && typeof data.transport !== 'undefined' && typeof data.isPeriodic !== 'undefined'
        && typeof data.passengers !== 'undefined' && typeof data.periodicity !== 'undefined';
    } else if (category === 'food') {
        return typeof data.mainComponent !== 'undefined' && typeof data.sideComponent !== 'undefined'
        && typeof data.created_time !== 'undefined' && typeof data.portions !== 'undefined'
        && typeof data.day !== 'undefined' && typeof data.userId !== 'undefined'
        && typeof data.food !== 'undefined' && typeof data.isPeriodic !== 'undefined'
        && typeof data.periodicity !== 'undefined';
    } else if (category === 'energy') {
        return typeof data.powertype !== 'undefined' && typeof data.periodicity !== 'undefined'
        && typeof data.created_time !== 'undefined' && typeof data.volume !== 'undefined'
        && typeof data.day !== 'undefined' && typeof data.userId !== 'undefined'
        && typeof data.energy !== 'undefined' && typeof data.isPeriodic !== 'undefined'
        && typeof data.peopleSharing !== 'undefined';
    } else {
        return false;
    }
 }

 function isParametersValidOnCreate(category, data) {
    const userId = typeof data.userId !== 'undefined';
    if (category === 'transport') {
        return userId && typeof data.transport !== 'undefined';
    } else if (category === 'food') {
        return userId && typeof data.food !== 'undefined';
    } else if (category === 'energy') {
        return userId && typeof data.energy !== 'undefined';
    } else {
        return false;
    }
 }
 
 
 module.exports = isChampsValid;
 module.exports = isParametersValidOnCreate;