//user will be adding taks to the project
// model for task

const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
    projectid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("Task", taskSchema);