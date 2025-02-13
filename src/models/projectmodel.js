// project schema save project with user's id:
const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
        // unique: true,
    },
    category: {
        type: String,
        // options
        enum: ["Life", "Career"],
        required: true,
    }
});

module.exports = mongoose.model("Project", projectSchema);