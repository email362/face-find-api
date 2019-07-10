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

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'chyer',
      password : '',
      database : 'smart-brain'
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
    res.send(db.users);
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

app.listen(3000, () => {
    console.log('WE are up and running!');
});

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT 
*/