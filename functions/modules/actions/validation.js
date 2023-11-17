const { object, string, number, boolean, array } = require('zod');

const baseSchema = object({
    uid: string(),
    created_time: string(),
    country: string(),
    category: string(),
    co2e: number(),
    count: number(),
    emission_factor: number(),
    isPeriodic: boolean(),
});

const transportSchema = baseSchema.merge(
    object({
        action: string(),
        option: string(),
        peopleSharing: number(),
        roundtrip: boolean(),
    })
);

const foodSchema = baseSchema.merge(
    object({
        action: string(),
        option: string(),
        side: array(string()),
    })
);

const energySchema = baseSchema.merge(
    object({
        action: string(),
        option: string(),
        peopleSharing: number(),
        periodicity: array(string()),
    })
);

exports.validateActionModel = function (actionObject) {
    return baseSchema.safeParse(actionObject).success;
};

exports.validateTransportAction = function (actionObject) {
    return transportSchema.safeParse(actionObject).success;
};

exports.validateFoodAction = function (actionObject) {
    return foodSchema.safeParse(actionObject).success;
};

exports.validateEnergyAction = function (actionObject) {
    return energySchema.safeParse(actionObject).success;
};

exports.isParametersValidOnCreate = function (category, data) {
    const userId = typeof data.uid !== 'undefined';

    if (category === 'transport') {
        return userId && transportSchema.pick({
            uid: data.uid,
            action: data.action,
            option: data.option,
            peopleSharing: data.peopleSharing,
            roundtrip: data.roundtrip,
        }).safeParse(data).success;
    } else if (category === 'food') {
        return userId && foodSchema.pick({
            uid: data.uid,
            action: data.action,
            option: data.option,
            side: data.side,
        }).safeParse(data).success;
    } else if (category === 'energy') {
        return userId && energySchema.pick({
            uid: data.uid,
            action: data.action,
            option: data.option,
            peopleSharing: data.peopleSharing,
            periodicity: data.periodicity,
        }).safeParse(data).success;
    } else {
        return false;
    }
};
