const server = require("./api/server");

const admin = require('firebase-admin');

let serviceAccount = require('./key/learningfirestore-261822-4f3dbc0c9255.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

/////////////////////////////////////SETTING DATA/////////////////

let docRef = db.collection('users').doc('alovelace');

let setAda = docRef.set({
  first: 'Ada',
  last: 'Lovelace',
  born: 1815
});



let aTuringRef = db.collection('users').doc('aturing');

let setAlan = aTuringRef.set({
  'first': 'Alan',
  'middle': 'Mathison',
  'last': 'Turing',
  'born': 1912
});

let newDocRef = db.collection('users').doc('billybob');

let setBilly = newDocRef.set({
    'first': 'billy',
    'middle': 'bobbyyyy',
    'second-middle': 'bobbers',
    'last': 'bobston',
    'born': 2112,
    'eats': 'lots of food'
})


///////////////////GET DATA//////////////////////
db.collection('users').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });

server.listen(5000, () => console.log(`\n=== server listening on port 5000 === \n`))