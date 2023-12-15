const { object, string, number, boolean, array } = require('zod');

const Logger = require('../../logger-setup');

const baseSchema = object({
    uid: string(),
    created_time: object({}),
    country: string(),
    category: string(),
    action: string(),
    option: string().optional(),
    co2e: number(),
    count: number(),
    emission_factor: number(),
    isPeriodic: boolean(),
    periodicity: array(string()).optional(),
});

const purchaseDetailsSchema = object({
    newPurchase: boolean(),
    startDepreciation: object({}),
    endDepreciation: object({}),
});

const transportSchema = baseSchema.merge(
    object({
        peopleSharing: number().optional(),
        roundtrip: boolean().optional(),
    })
);

const foodSchema = baseSchema.merge(
    object({
        side: array(string()).optional(),
    })
);

const energySchema = baseSchema.merge(
    object({
        peopleSharing: number().optional(),
    })
);

const clothesSchema = baseSchema.merge(purchaseDetailsSchema);

const digitalSchema = baseSchema.merge(purchaseDetailsSchema);

exports.validateActionModel = function (actionObject) {
    return baseSchema.safeParse(actionObject);
};

exports.isParametersValidOnCreate = function (category, data) {
    const userId = typeof data.uid !== 'undefined';

    switch (category) {
        case 'Trajets':
            return userId && transportSchema.safeParse(data);
        case 'Repas':
            return userId && foodSchema.safeParse(data);
        case 'Energie':
            return userId && energySchema.safeParse(data);
        case 'Habits':
            return userId && clothesSchema.safeParse(data);
        case 'Numérique':
            return userId && digitalSchema.safeParse(data);
        default:
            Logger.error(`action category '${category}' not implemented`);
            return;
    }
};
