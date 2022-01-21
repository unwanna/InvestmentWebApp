var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const { request } = require('../app');
const User = require('../schema/User');

const dbRoute =
    'mongodb+srv://dbUser:dbUserPassword@cluster0.pbz8s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';//*

    mongoose.connect(dbRoute, { useUnifiedTopology: true });//*
let db = mongoose.connection;//*

db.once('open', () => console.log('connected to the database'));//*

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));//*


/* GET users listing. */
router.get('/user/:username/:password', function(req, res, next) {
  User.find({ username: req.params.username, password: req.params.password}, 
    function(err, docs) {
      res.send(docs);
    })
});

router.post('/newUser/', function(req, res, next) {
  const newUser = new User();
  newUser.favorites = [];
  newUser.username = req.body.username;
  newUser.password = req.body.password;
  newUser.save((err)=>{
    if(err){
        return res.json({success:false, error:err});
    }else{
        return res.json({success: true})
    }
  })
});

router.put('/updateFavorites/', function(req, res, next) {
  const query = { username: req.body.username, password: req.body.password}
  User.findOneAndUpdate(query, { favorites: req.body.favorites }, {new: true}, (err, docs) => {
    res.send(docs)
  })
})

router.get('/', function(req, res, next) {
  res.send('Worked')
})

router.delete('/delete/', function(req, res, next) {
  const query = { username: req.body.username}
  User.findOneAndRemove(query, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
})

module.exports = router;



