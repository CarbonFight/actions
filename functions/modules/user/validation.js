const pino = require("../../logger-setup");

exports.validateUser = function (userObject) {
    pino.debug('Check if UID is valid')
    const valid = typeof userObject.uid !== 'undefined' && userObject.uid
    if(!valid){
        pino.error('UID for this user is invalid: '+JSON.stringify(userObject) )
    }
    return valid
}
