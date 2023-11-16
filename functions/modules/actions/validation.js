const { object, string, number, boolean } = require('zod');

const actionSchema = object({
    created_time: string(),
    day: string(),
    userId: string(),
    isPeriodic: boolean(),
    periodicity: string(),
});

const transportActionSchema = actionSchema.merge(
    object({
        powertype: string(),
        roundTrip: boolean(),
        distance: number(),
        transport: string(),
        passengers: number(),
    })
);

const foodActionSchema = actionSchema.merge(
    object({
        mainComponent: string(),
        sideComponent: string(),
        portions: number(),
        food: string(),
    })
);

const energyActionSchema = actionSchema.merge(
    object({
        powertype: string(),
        volume: number(),
        energy: string(),
        peopleSharing: number(),
    })
);

const isTransportParametersValid = (data) => transportActionSchema.pick({
    userId: data.userId,
    transport: data.transport
}).safeParse(data).success;

const isFoodParametersValid = (data) => foodActionSchema.pick({
    userId: data.userId,
    food: data.food
}).safeParse(data).success;

const isEnergyParametersValid = (data) => energyActionSchema.pick({
    userId: data.userId,
    energy: data.energy
}).safeParse(data).success;

exports.validateActionModel = function(actionObject) {
    return actionSchema.safeParse(actionObject).success;
};

exports.validateTransportAction = function(actionObject) {
    return transportActionSchema.safeParse(actionObject).success;
};

exports.validateFoodAction = function(actionObject) {
    return foodActionSchema.safeParse(actionObject).success;
};

exports.validateEnergyAction = function(actionObject) {
    return energyActionSchema.safeParse(actionObject).success;
};

exports.isParametersValidOnCreate = function(category, data) {
    const userId = typeof data.userId !== 'undefined';

    if (category === 'transport') {
        return userId && isTransportParametersValid(data);
    } else if (category === 'food') {
        return userId && isFoodParametersValid(data);
    } else if (category === 'energy') {
        return userId && isEnergyParametersValid(data);
    } else {
        return false;
    }
};
