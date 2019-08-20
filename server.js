require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const expressJWT = require('express-jwt');
const helmet = require('helmet');
const RateLimit = require('express-rate-limit');
const user = require('./models/user');



const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(helmet());

// const loginLimiter = new RateLimit({
//     windowMs: 5*60*1000,
//     max: 3,
//     delayMs: 0,
//     message: 'Maximum login attempts exceeded'
// });
// const signupLimiter = new RateLimit({
//     windowMs: 60*60*1000,
//     max: 3,
//     delayMs: 0,
//     message: "Maximum accounts created. Try again later."
// });

mongoose.connect('mongodb://localhost/rover-mars', {useNewUrlParser: true});
const db = mongoose.connection;
db.once('open', () => {
    console.log(`🦁🦁🦁Conected to Mongo on ${db.host}:${db.port}`);
});
db.on('error', (err) => {
    console.log(`❌❌❌Database error:\n${err}`)
});

// app.use('/auth/login', loginLimiter);
// app.use('/auth/signup', signupLimiter);

app.use('/auth', require('./routes/auth'));
// app.use('/api', expressJWT({secret: process.env.JWT_SECRET}), require('./routes/api'));
app.use('/api', require('./routes/api'))
// app.use('/user', require('./routes/user'))

//! GET all users
app.get('/user', (req, res) => {
    user.find({}, function(err, user) {
        if(err) res.json(err)
        res.json(user)
    })
})

//! GET One user
app.get('/user/:id', (req, res) => {
    user.findById(req.params.id, function(err, user) {
        if(err) res.json(err)
        res.json(user)
    })
})

//! POST One User

app.post('/user', (req, res) => {
    let user = new user ({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    });
    user.save((err, user) => {
        if (err) res.json(err);
        res.json(user);
    })
})




app.listen(process.env.PORT, () => {
    console.log(`🍕🍕🍕you're listening to port ${process.env.PORT}...`)
});