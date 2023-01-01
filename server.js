require('dotenv').config()
const express = require('express')
const mongoose  = require('mongoose')
const cors = require('cors')

//Routes
const userRoutes = require('./routes/userRoutes')
const contactRoutes = require('./routes/contactRoutes')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/users',userRoutes)
app.use('/api/contact/',contactRoutes)

if (process.env.NODE_ENV === "production") {
    app.use(express.static("./build"));
  
    app.get("*", (req, res) =>
      res.sendFile(path.resolve(__dirname, ".", "build", "index.html"))
    );
}

const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log("Server is running")
})

const URL = process.env.MONGO_URL
mongoose.set("strictQuery",false)
mongoose.connect(URL,error=>{
    if(error) console.log(error.message)
    else console.log("Mongodb Connected")
})