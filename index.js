const server = require("./api/server");

const admin = require('firebase-admin');

let serviceAccount = require('./ServiceAccountKey.json');

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
    'eats': 'lots of food',
    'from': 'springfield',
    'likes': ['dogs', 'cats', 'monkeys', 54, {'getting': 'paid', 'the-year': 1957}]
})

let firstRestaurant = db.collection('restaurants').doc('mcds')

let setMcDs = firstRestaurant.set({
  'name': 'mcdonalds',
  'type': 'fastfood',
  'sells': ['burgers', 'fries', 'nuggets']
})

///////////////////GET DATA//////////////////////
// db.collection('users').get()
//   .then((snapshot) => {
//     snapshot.forEach((doc) => {
//       console.log(doc.id, '=>', doc.data());
//     });
//   })
//   .catch((err) => {
//     console.log('Error getting documents', err);
//   });

// db.collection('restaurants').get()
//   .then(snapshot => {
//     snapshot.forEach(doc => {
//       console.log(doc.id, '🍔', doc.data())
//     })
//   })
//   .catch(err => {
//     console.log('ERROR RETRIEVING RESTAURANTS', err)
//   })

////////////////////////////////// GET USERS ENDPOINT //////////////////////////////////////////
server.get('/users', (req, res) => {
  const usersArr = [];
  db.collection('users').get()
    .then(users => {
      users.forEach(doc => {
        usersArr.push(doc.id, '===========', doc.data())
      })
      res.json(usersArr)
    })
    .catch(err => {
      console.log('GETTING USERS ENDPOINT ERR', err)
      res.status(500).json({error: 'there was an error getting the users'})
    })
});

///////////////////////////// POST TO USERS COLLECTION ////////////////////////////////////
server.post('/users', (req, res) => {
  const docu = req.body.docname;
  const details = req.body.details;
  db.collection('users').doc(docu).set(details)
    .then(user => {
      const userObj = {docName: docu, details}
      res.status(201).json(userObj)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: 'there was an error adding the user to the server'})
    })
})


//////////////////// PUT REQUEST TO USERS COLLECTION BY DOCUMENT ////////////////////
server.put('/users/:doc', (req, res) => {
  const docu = req.body.docname;
  const details = req.body.details;

  db.collection('users').doc(docu).update(details)
    .then(user => {
      const userObj = {docName: docu, details}
      res.status(200).json(userObj)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: 'there was an error updating the user on the server'})
    })
})

//////////////////////////// DELETE A USER FROM THE COLLECTION

server.delete('/users/:docName', (req, res) => {
  const docName = req.params.docName
  db.collection('users').doc(docName).delete()
    .then(user => {
      res.status(200).json({message: 'the selected doc was deleted'})
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: 'there was an error removing the doc from the db' })
    })
});


server.listen(5000, () => console.log(`\n=== server listening on port 5000 === \n`))