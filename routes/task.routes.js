const express = require("express");
const taskRouter = express.Router();
const { TaskModel } = require("../models/task.model");

// Get all tasks by Project Id

taskRouter.get("/", async (req, res) => {
    const user = req.body.userID;
    const project = req.body.projectID;
    try {
        const tasks = await TaskModel.find({ user, project })
        // const tasks = await TaskModel.find({ user, project }).populate("task");
        res.json(tasks);
    } catch (err) {
        console.log(err);
        res.status(500).json({ "msg": "Something went wrong" })
    }
})

// Get all tasks of a user

taskRouter.get("/alltasks", async (req, res) => {
    const user = req.body.userID;
    try {
        const tasks = await TaskModel.find({ user })
        // const tasks = await TaskModel.find({ user, project }).populate("task");
        res.json(tasks);
    } catch (err) {
        console.log(err);
        res.status(500).json({ "msg": "Something went wrong" })
    }
})

// Add  new task

taskRouter.post("/add", async (req, res) => {
    const user = req.body.userID
    const projectID = req.body.projectID
    const { name, desc, timer, status, initialTime, endTime } = req.body;
    try {
        const newTask = new TaskModel({ name, desc, user, timer, projectID, status, initialTime, endTime });
        await newTask.save();
        res.send("Task added successfully")
    } catch (err) {
        console.log(err)
        res.status(500).json({ "msg": "Something went wrong" })
    }
})

// Update task by id

taskRouter.patch('/:id', async (req, res) => {
    const payload = req.body;
    const { id } = req.params;
    console.log(payload)
    try {
        await TaskModel.findByIdAndUpdate({ _id: id }, payload)
        res.send("Project edited successfully")
    } catch (err) {
        console.log(err)
        res.status(500).json({ "msg": "Something went wrong" })
    }
});

// Delete task by id

taskRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await TaskModel.findByIdAndDelete({ _id: id })
        res.send("Project deleted successfull")
    } catch (err) {
        console.log(err)
        res.send({ "msg": "Something went wrong" })
    }

});


module.exports = {
    taskRouter
}