const { mockedFunctions } = require("../_setup");

module.exports.generateDocChange = function(data){
    const {path, before, after} = data
    const beforeSnap = mockedFunctions.firestore.makeDocumentSnapshot(before, path);
    const afterSnap = mockedFunctions.firestore.makeDocumentSnapshot(after, path);
    return mockedFunctions.makeChange(beforeSnap, afterSnap);
}
