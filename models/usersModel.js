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

async function add(details){
    if (!details.reviews){
        return db.collection('users')
        .add(details)
    } else {
        db.collection('users')
            .add(details)
        const usersName = details.first + ` ${details.last}`;
        let restId = {};
        let reviewersArr = [];
        await db.collection('restaurants')
            .where('name', '==', details.reviews)
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    restId = {id: doc.id}
                    if (doc.data().reviewers){
                        doc.data().reviewers.map(item => {
                            reviewersArr.push(item)
                        })
                    }
                })
        })
        reviewersArr.push(usersName)
        let docRef = db.collection('restaurants').doc(restId.id)
        return docRef.update({reviewers: reviewersArr})
    }
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