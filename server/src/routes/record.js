const express = require('express');

const router = express.Router();

const Record = require('../models/record');

//Get all records
router.get('/', async (req, res) => {
    try {
        let record = await Record.find({});
        res.status(200).json(record);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Get record by id
router.get('/:id', async (req, res) => {
    try {
        let record = await Record.findById(req.params.id);
        res.status(200).json(record);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Create a new record
router.post('/add', async (req, res) => {
    let { name, position, level } = req.body;

    try {
        let record = await Record.create({ name, position, level});
        res.status(200).json(record);
    } catch (error) {
        res.status(422).json(error);
    }
});

//Update a record
router.put('/update/:id', async (req, res) => {
    let { name, position, level } = req.body;

    try {
        let record = await Record.findByIdAndUpdate(req.params.id, { name, position, level }, { new: true });
        res.status(200).json(record);
    } catch (error) {
        res.status(422).json(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let record = await Record.findByIdAndRemove(req.params.id);
        res.status(200).json(record);
    } catch (error) {
        res.status(422).json(error);
    }
})

module.exports = router;
