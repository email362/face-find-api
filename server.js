const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const apiCall = require('./controllers/apiCall');
const knex = require('knex');

const PORT = process.env.PORT || 3000;

const db = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: true
    }
});

db.select('*').from('users').then(data => {
    console.log('server data loaded');
});

const app = express();
app.use(bodyParser.json());
app.use(cors());


// home page
app.get('/',(req,res) => {
    res.send('it is working!');
});

// user signin
app.post('/signin', (req,res) => signin.handleSignin(req,res,db,bcrypt));

// user register
app.post('/register', (req,res) => register.handleRegister(req, res, db, bcrypt));

// user profile
app.get('/profile/:id', (req,res) => profile.handleProfileGet(req,res,db));

// image submission
app.put('/image', (req,res) => image.handleImage(req,res,db));

app.post('/imageurl', (req,res) => apiCall.handleCall(req,res));

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
});

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT 
*/