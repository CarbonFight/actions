const logger = require("../../logger-setup");

exports.validateUser = function (userObject) {
    logger.debug('Check if UID is valid')
    const valid = typeof userObject.uid !== 'undefined' && userObject.uid
    if(!valid){
        logger.error('UID for this user is invalid: '+JSON.stringify(userObject) )
    }
    return valid
}
