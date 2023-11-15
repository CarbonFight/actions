const { mapEntries } = require('radash');

function mutateObject(obj, options = []) {
    function mutateValue(value) {
        const type = typeof value;

        switch (type) {
            case 'string': {
                const charArray = value.split('');
                const randomIndex = Math.floor(Math.random() * charArray.length);
                charArray[randomIndex] = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
                return charArray.join('');
            }

            case 'number':
                return value * (Math.random() > 0.5 ? 1.5 : 0.5);

            case 'boolean':
                return Math.random() > 0.5 ? !value : value;

            case 'object':
                if (Array.isArray(value)) {
                    return value.map((item) => mutateValue(item));
                } else {
                    return mutateObject(value, options);
                }

            default:
                return value;
        }
    }

    function mutateKey(key) {
        const shouldMutate = options.length === 0 || options.includes(key);
        if (shouldMutate) {
            const keys = key.split('.');
            let current = obj;

            keys.forEach((nestedKey, index) => {
                if (index === keys.length - 1) {
                    current[nestedKey] = mutateValue(current[nestedKey]);
                } else {
                    current = current[nestedKey];
                }
            });
        }
    }

    const mutatedObject = { ...obj };

    mapEntries(mutatedObject, (key, value) => {
        mutateKey(key);
        if (typeof value === 'object' && value !== null) {
            return [key, mutateObject(value, options)];
        } else {
            return [key, mutateValue(value)];
        }
    });

    return mutatedObject;
}

module.exports.slightlyMutate = mutateObject
