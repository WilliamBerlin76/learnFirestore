const db = require('../config/firestore-config');

module.exports = {
    getAll,
    getByDoc,
    add,
    remove,
    update
}

function getAll(){
    return db.collection('users').get()
};

function getByDoc(docName){
    return db.collection('users')
            .doc(docName)
            .get();
};

function add(details){
    return db.collection('users')
            .add(details)
};

function update(docname, details){
    return db.collection('users')
            .doc(docname)
            .update(details)
};

function remove(docname){
    return db.collection('users')
            .doc(docname)
            .delete()
};