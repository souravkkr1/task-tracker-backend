const express = require("express");
const projectRouter = express.Router();
const { ProjectModel } = require("../models/project.model")

projectRouter.get("/", async (req, res) => {
    const user = req.body.userID
    try {
        const data = await ProjectModel.find({ user }).populate("project");
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ "msg": "Something went wrong" })
    }

})


projectRouter.post("/create", async (req, res) => {
    const user = req.body.userID
    const { name, desc, colour } = req.body;
    try {
        const newProject = new ProjectModel({ name, desc, user, colour });
        await newProject.save();
        res.send("Project created successfully")
    } catch (err) {
        console.log(err)
        res.status(500).json({ "msg": "Something went wrong" })
    }
})


// Update project by id

projectRouter.patch('/:id', async (req, res) => {
    const payload = req.body;
    const { id } = req.params;
    console.log(payload)
    try {
        await ProjectModel.findByIdAndUpdate({ _id: id }, payload)
        res.send("Project edited successfully")
    } catch (err) {
        console.log(err)
        res.status(500).json({ "msg": "Something went wrong" })
    }
});

// Delete project by id

projectRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await ProjectModel.findByIdAndDelete({ _id: id })
        res.send("Project deleted successfull")
    } catch (err) {
        console.log(err)
        res.send({ "msg": "Something went wrong" })
    }

});

module.exports = {
    projectRouter
}