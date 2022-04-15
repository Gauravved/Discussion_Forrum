
const { register } = require('../controllers/userController');
const router = require('express').Router();
// we are creating a router from express that will listen to the request comming from the /register path and then sending to 
// register function written in userController  
router.post("/register", register); 
console.log("Hello")
module.exports = router;