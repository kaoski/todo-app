const mongoose = require('mongoose');

const taskScheme = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    startTime: Date,
    priority: Number,
    reminderTime: Date,
    dueDate: Date,
    location: String,
    label: Array,
    category: String,
    assignee: String,
    status: String,
});

const Task = mongoose.model('Task', taskScheme);

module.exports = Task;