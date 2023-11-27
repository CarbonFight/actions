const { object, string, number, boolean, array, coerce } = require('zod');
const logger = require('../../logger-setup');

exports.validateUser = (userObject) => {
    logger.debug('Check if UID is valid');
    const valid = typeof userObject.uid !== 'undefined' && userObject.uid;
    if (!valid) {
        logger.error(
            'UID for this user is invalid: ' + JSON.stringify(userObject)
        );
    }
    return valid;
};

const userSchema = object({
    uid: string(),
    display_name: string(),
    last_Name: string().optional(),
    first_Name: string().optional(),
    email: string().email(),
    photo_url: string().url().optional(),
    sponsorship_code: string(),
    team: string().optional(),
    target: number(),
    skipHowto: boolean(),
    connection_history: array(string()),
    created_time: coerce.date(),
});

exports.validateUserSchema = (userObject) => userSchema.safeParse(userObject);
