const express = require("express")
const cors = require('cors');
const dotenv = require('dotenv').config();
const connectDB = require("./config/dbConnection")
const errorHandler = require("./middleware/errorHandler")

const port = process.env.PORT || 500

connectDB()
const app = express()
app.use(express.json())
app.use(cors())
app.use("/api/contacts", require("./routers/contactRouter"))
app.use("/api/users", require("./routers/userRouter"))
app.use(errorHandler)


app.listen(port, ()=>{
    console.log(`Server listening on http://localhost:${port}`);
})