const router = require('express').Router();
const Restaurants = require('../models/restaurantModel');

////////////////////// GET ALL RESTAURANTS //////////////////////////////////
router.get('/', (req, res) => {
    const restArr = [];
    Restaurants.getAll()
        .then(rests => {
            rests.forEach(doc => {
                restArr.push('=======', doc.id, '========', doc.data())
            })
            res.status(200).json(restArr)
        })
        .catch(err => {
            console.log('GETTING RESTAURANTS ERR', err);
            res.status(500).json({error: 'there was an error retrieving the restaurants'})
        })
});

///////////////////// GET BY ID/////////////////////////

router.get('/:id', (req, res) => {
    const { id } = req.params
    Restaurants.findById(id)
        .then(rest => {
            const retRest = {
                id: rest.id,
                details: rest.data()
            }
            res.status(200).json(retRest)
        })
        .catch(err => {
            console.log('GET REST BY ID ERR', err);
            res.status(500).json({err: 'there was an error getting the restaurant by id'})
        })
})

//////////////////////// POST RESTAURANT ///////////////////////////////
router.post('/', (req, res) => {
    const details = req.body;
    Restaurants.add(details)
        .then(rest => {
            const retRest = {
                id: rest.id,
                details: details
            };
            res.status(201).json(retRest);
        })
        .catch(err => {
            console.log('POST RESTAURANT ERR', err);
            res.status(500).json({error: 'there was an error adding the restaurant to the collection'})
        })
});

//////////////////////// POST ADD EMPLOYEES //////////////////////////////
router.post('/:id/employees', (req, res) => {
    const { id } = req.params;
    const employeeName = req.body;

    Restaurants.addEmployee(id, employeeName)
        .then(rest => {
            const retRest = {
                id: rest.id,
                name: employeeName
            }
            res.status(201).json(retRest)
        })
        .catch(err => {
            console.log('POST TO EMPLOYEE SUBCOLLECTION', err);
            res.status(500).json(err)
        })
});

//////////////////////// POST GET EMPLOYEES //////////////////////////////
router.get('/:id/employees', (req, res) => {
    const { id } = req.params;
    const empArr = [];
    Restaurants.getEmployees(id)
        .then(emps => {
            emps.forEach(doc => {
                const data = doc.data()
                empArr.push({id: doc.id, data})
            });
            res.status(200).json(empArr);
        })
        .catch(err => {
            console.log('GETTING EMPLOYEES ERR', err);
            res.status(500).json({error: 'there was an error getting the employees from the db'})
        })
})

//////////////////////// UPDATE RESTAURANT //////////////////////////////
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    Restaurants.update(id, changes)
        .then(rest => {
            const retRest = {
                id,
                changes
            }
            res.status(201).json(retRest);
        })
        .catch(err => {
            console.log('EDIT RESTAURANT ERR', err);
            res.status(500).json({err: 'there was an error editing the restaurant'})
        })
});

////////////////////////// DELETE RESTAURANT ///////////////////////////////
router.delete('/:id', (req, res) => {
    const { id } = req.params

    Restaurants.remove(id)
        .then(rest => {
            res.status(200).json({message: 'the restaurant was removed from the db'})
        })
        .catch(err => {
            console.log('DELETE RESTAURANT ERR', err)
            res.status(500).json({error: 'there was an error removing the restaurant from the db'})
        })
});

module.exports = router;