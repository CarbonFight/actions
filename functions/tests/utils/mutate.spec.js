const { slightlyMutate } = require('./mutate');

const originalObject = {
    first_Name: 'John',
    target: 8,
    team: {
        label: 'Hearth Team',
        value: 'hearth',
    },
    skipHowto: false,
};

describe('slightlyMutate', () => {
    it('1. Default Mutation', () => {
        const mutatedObject = slightlyMutate(originalObject);
        expect(mutatedObject).not.toEqual(originalObject);
    });

    it('2. Specific Key Mutation', () => {
        const mutatedObject = slightlyMutate(originalObject, [
            'first_Name',
            'team.label',
            'skipHowto',
        ]);
        expect(mutatedObject).not.toEqual(originalObject);
        expect(mutatedObject.target).toEqual(originalObject.target);
    });

    it('3. String Value Mutation', () => {
        const mutatedObject = slightlyMutate(originalObject, ['first_Name']);
        expect(mutatedObject.first_Name).not.toEqual(originalObject.first_Name);
        expect(mutatedObject.first_Name.length).toEqual(
            originalObject.first_Name.length
        );
    });

    it('4. Number Value Mutation', () => {
        const mutatedObject = slightlyMutate(originalObject, ['target']);
        expect(mutatedObject.target).not.toEqual(originalObject.target);
        expect(mutatedObject.target).toBeGreaterThanOrEqual(
            mutatedObject.target * -1.5
        );
        expect(mutatedObject.target).toBeLessThanOrEqual(
            mutatedObject.target * 1.5
        );
    });

    it('5. Boolean Value Mutation', () => {
        const mutatedObject = slightlyMutate(originalObject, ['skipHowto']);
        expect(mutatedObject.skipHowto).toBe(!originalObject.skipHowto);
    });

    it('6. Empty Object Mutation', () => {
        const mutatedObject = slightlyMutate({});
        expect(mutatedObject).toEqual({});
    });
});
