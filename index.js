const server = require("./api/server");

const port = process.env.PORT || 5000;

/////////////////////////////////////SETTING DATA/////////////////

// let docRef = db.collection('users').doc('alovelace');

// let setAda = docRef.set({
//   first: 'Ada',
//   last: 'Lovelace',
//   born: 1815
// });

// let aTuringRef = db.collection('users').doc('aturing');

// let setAlan = aTuringRef.set({
//   'first': 'Alan',
//   'middle': 'Mathison',
//   'last': 'Turing',
//   'born': 1912
// });

// let newDocRef = db.collection('users').doc('billybob');

// let setBilly = newDocRef.set({
//     'first': 'billy',
//     'middle': 'bobbyyyy',
//     'second-middle': 'bobbers',
//     'last': 'bobston',
//     'born': 2112,
//     'eats': 'lots of food',
//     'from': 'springfield',
//     'likes': ['dogs', 'cats', 'monkeys', 54, {'getting': 'paid', 'the-year': 1957}]
// })

// let firstRestaurant = db.collection('restaurants').doc('mcds')

// let setMcDs = firstRestaurant.set({
//   'name': 'mcdonalds',
//   'type': 'fastfood',
//   'sells': ['burgers', 'fries', 'nuggets']
// })

server.listen(port, () => console.log(`\n=== server listening on port ${port} === \n`))