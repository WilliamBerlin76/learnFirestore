const router = require('express').Router();

const db = require('../config/firestore-config')

////////////////////////////////// GET USERS ENDPOINT //////////////////////////////////////////
router.get('/', (req, res) => {
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
router.post('/', (req, res) => {
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
router.put('/:doc', (req, res) => {
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
  
//////////////////////////// DELETE A USER FROM THE COLLECTION //////////////////////////////
  
router.delete('/:docName', (req, res) => {
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

module.exports = router;