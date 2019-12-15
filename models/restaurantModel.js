const db = require('../config/firestore-config');

module.exports = {
    getAll,
    findById,
    add,
    update,
    remove
}

function getAll(){
    return db.collection('restaurants').get()
};

function findById(id){
    return db.collection('restaurants')
            .doc(id)
            .get()
};

function add(details){
    return db.collection('restaurants')
            .add(details)
};

function update(id, changes){
    return db.collection('restaurants')
            .doc(id)
            .update(changes)
};

function remove(id){
    return db.collection('restaurants')
            .doc(id)
            .delete()
};