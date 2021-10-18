const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyparser = require('body-parser');

const app = express();
const PORT = 3000

const requireToken = require('./middlewares/requireToken')



// Configs

app.use(cors({
    origin: '*'
}));
app.use(bodyparser.urlencoded({extended:false}));

// DB Connection
const mongourl = 'mongodb+srv://admin:jV6q8ACkJtXFC1GR@cluster0.xlfm0.mongodb.net/REACTNATIVEAUTH?retryWrites=true&w=majority'
mongoose.connect(mongourl,{
    useNewUrlParser: true,
    useUnifiedTopology : true,
})
mongoose.connection.on('connected' ,() => console.log('DB Connected'))
mongoose.connection.on('error' ,() => console.log('error'))


// Middleware
app.use(express.json())

//  Routes
const { router } = require('./routes/authRoutes');
app.use( '/api', router)


app.get('/', requireToken , (req, res) => {
    res.send("Email : " + req.user.email)
})


// Listen Port
app.listen(PORT, (req, res) => console.log('Server Started : 3000'))


// admin : jV6q8ACkJtXFC1GR

// mongodb+srv://admin:<password>@cluster0.xlfm0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTZjM2YxZGVkNTM0ODRlZmU4MGM3ZjIiLCJpYXQiOjE2MzQ0ODM5OTh9.FFKV9taN4gGqGxURDpiLUX3LPZfqhNrDVEYvZe6O_AA"