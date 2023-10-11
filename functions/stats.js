async function updateStats(category, userId, co2e) {
    if (category === 'transport') {
        return await updateTransportStats(userId, co2e);
    } else if (category === 'food') {
        return await updateFoodStats(userId, co2e);
    } else if (category === 'energy') {
        return await updateEnergyStats(userId, co2e);
    } else {
        return null;
    }
 }

async function updateTransportStats(userId) {
  //todo implement
}

async function updateFoodStats(userId) {
  //todo implement
}


async function updateEnergyStats(userId) {
  //todo implement
}

module.exports = updateStats;