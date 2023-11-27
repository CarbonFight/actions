const { object, string, number, boolean, array, coerce } = require('zod');

const Logger = require('../../logger-setup');

const baseSchema = object({
    uid: string(),
    created_time: coerce.date(),
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
        peopleSharing: number().optional(),
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
    return baseSchema.safeParse(actionObject);
};

exports.isParametersValidOnCreate = function (category, data) {
    const userId = typeof data.uid !== 'undefined';

    switch (category) {
        case 'transport':
            return userId && transportSchema.safeParse(data);
        case 'food':
            return userId && foodSchema.safeParse(data);
        case 'energy':
            return userId && energySchema.safeParse(data);
        default:
            Logger.error(`action category '${category}' not implemented`);
            return;
    }
};
