const db = require('../config/firestore-config');

module.exports = {
    getAll,
    findById,
    add,
    update,
    remove,
    addEmployee,
    getEmployees
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

function addEmployee(id, employeeName){
    return db.collection('restaurants')
            .doc(id)
            .collection('employees')
            .add(employeeName)
};

function getEmployees(id){
    return db.collection('restaurants')
            .doc(id)
            .collection('employees')
            .get()
}

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