const db = require('../config/firestore-config');

module.exports = {
    getAll,
    add,
    remove,
    update
}

function getAll(){
    return db.collection('users').get()
};

function add(docname, details){
    return db.collection('users')
            .doc(docname)
            .set(details)
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