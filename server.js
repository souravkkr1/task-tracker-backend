const express = require("express");
const app = express();
const cors = require("cors")
const { connection } = require("./config/db")
const { userRouter } = require("./routes/user.routes")
const { requireLogIn, requireLogin } = require("./middlewares/validator")
const { projectRouter } = require("./routes/project.routes")
const { taskRouter } = require("./routes/task.routes")
require("dotenv").config();


app.use(express.json())
app.use(cors({
    origin: "*"
}))

app.get("/", (req, res) => {
    res.send("HOMEPAGE")
})

app.use("/user", userRouter)

app.use("/projects", requireLogin, projectRouter)

app.use("/tasks", requireLogin, taskRouter)

app.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log("Server is connected to DB")
    } catch (err) {
        console.log(err)
        console.log("Something went wrong")
    }
    console.log("Server is running")
})