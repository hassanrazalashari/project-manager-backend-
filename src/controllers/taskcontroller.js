//task controller
const Taskmodel = require("../models/taskmodel");

//add task to the project
exports.addtask = async (req, res) => {
    const { projectid, title } = req.body;
    try {
        const newTask = new Taskmodel({
            projectid,
            title,
        });
        await newTask.save();
        res.status(201).json({ message: "Task added successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}



//update task 
exports.updatetask = async (req, res) => {
    const { id } = req.params;
    const {projectid, title , status } = req.body;
    try {
        const task = await Taskmodel.findById(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        task.projectid = projectid;
        task.title = title;
        task.status = status;
        await task.save();
        res.status(200).json({ message: "Task updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

//get all tasks of a project
exports.gettasks = async (req, res) => {
    const { projectid } = req.params;
    try {
        const tasks = await Taskmodel.find({ projectid });
        res.status(200).json(tasks);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}
