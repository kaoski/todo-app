const Task = require('../models/task');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

router.post('/', async (req, res) => {
    try {
        const {title, description, startTime, dueDate, priority, reminderTime, label, category,assignee} = req.body;
        const status = 'NOT_STARTED';
        const task = new Task({title, description, startTime, dueDate, priority, reminderTime, label, category,assignee, status});
        const response = await task.save();
        return res.json(response);
    } catch (e) {
        console.error(e);
        return res.status(500).json({error : e.toString()});
    }
});

router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        return res.json(tasks);
    } catch (e) {
        console.error(e);
        res.status(500).json({error : e.toString()});
    }
});

router.get('/:id', async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({error : 'Invalid ID Format'});
        }
        const task = await Task.findOne({ _id: req.params.id });
        if (!task) {
            res.status(404).json({error : 'Task Not Found'});
        } else {
            res.json(task);
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({error : e.toString()}); 
    }
});

router.put('/:id', async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({error : 'Invalid ID Format'});
        }
        const updatedTask = await Task.findOneAndUpdate(
            { _id: req.params.id },
            req.body,            
            { new: true }
        );
        console.log (updatedTask);
        if (!updatedTask) {
            return res.status(404).json({error : 'Task Not Found'});
        }
        return res.status(200).json(updatedTask);
    } catch (e) {
        console.error(e);
        return res.status(500).json({error : e.toString()}); 
    }
});

router.delete('/:id', async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({error : 'Invalid ID Format'});
        }
        const result = await Task.deleteOne({_id: req.params.id});
        if (result.deletedCount === 0) {
            return res.status(404).json({error : 'Task Not Found'});
        } else {
            return res.status(200).json({message: 'Task Deleted Successfully'});
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({error : e.toString()});  
    }
});

module.exports = router;