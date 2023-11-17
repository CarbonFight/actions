const { clone, mapEntries } = require("radash");

/**
 * Mutates an object by applying random transformations to its values.
 *
 * @param {Object} obj - The object to be mutated.
 * @param {string[]} [options=[]] - An array of keys to specify which values should be mutated.
 * @returns {Object} - The mutated object.
 */
function mutateObject(obj, options = []) {
    /**
     * Mutates a value based on its type.
     *
     * @param {*} value - The value to be mutated.
     * @returns {*} - The mutated value.
     */
    const mutateValue = (value) => {
        switch (typeof value) {
            case 'string': {
                // Mutate string by replacing a random character.
                const charArray = value.split('');
                const randomIndex = Math.floor(Math.random() * charArray.length);
                charArray[randomIndex] = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
                return charArray.join('');
            }

            case 'number':
                // Mutate number by multiplying with a random factor between 0.5 and 1 or between 1 and 1.5.
                return value * Math.random() > 0.5 ? Math.random() * 0.5 + 0.5 : Math.random() * 0.5 + 1;

            case 'boolean':
                // Mutate boolean by toggling its value.
                return !value;

            case 'object':
                // Mutate object recursively.
                return Array.isArray(value) ? value.map(mutateValue) : mutateObject(value, options);

            default:
                // Return unchanged for unsupported types.
                return value;
        }
    };

    /**
     * Mutates a key in the object based on options.
     *
     * @param {string} key - The key to be mutated.
     */
    const mutateKey = (key) => {
        if (options.length === 0 || options.includes(key)) {
            const keys = key.split('.');
            let current = obj;

            keys.forEach((nestedKey, index) => {
                current = index === keys.length - 1 ? (current[nestedKey] = mutateValue(current[nestedKey])) : current[nestedKey];
            });
        }
    };

    // Clone the object to avoid modifying the original object.
    const mutatedObject = clone(obj);

    // Apply mutations to each entry in the object.
    mapEntries(mutatedObject, (key, value) => {
        mutateKey(key);
        return [key, typeof value === 'object' && value !== null ? mutateObject(value, options) : mutateValue(value)];
    });

    return mutatedObject;
}

/**
 * Exports the mutateObject function as slightlyMutate.
 *
 * @type {function(Object, string[]=): Object}
 */
module.exports.slightlyMutate = mutateObject;
