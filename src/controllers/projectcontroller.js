//project controller.
const Projectmodel = require("../models/projectmodel");
const mongoose = require("mongodb");

exports.createproject = async (req, res) => {
    const { title, category } = req.body;
    try {
        const newProject = new Projectmodel({
            user: req.user.id,
            title,
            category,
        });
        await newProject.save();
        res.status(201).json({ message: "Project created successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

//get all projects
exports.getprojects = async (req, res) => {
    try {
        const projects = await Projectmodel.find({ user: req.user.id });
        res.status(200).json(projects);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}