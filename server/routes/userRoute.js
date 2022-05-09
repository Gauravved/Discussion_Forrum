
const { register, login, profile,forgotPassword, resetPassword } = require('../controllers/userController');
const router = require('express').Router();
// we are creating a router from express that will listen to the request comming from the /register path and then sending to 
// register function written in userController  
router.post("/register", register); 
router.post("/login", login);
router.post("/setProfile/:id",profile);
router.post("/forgotPassword", forgotPassword);
router.post('/resetPassword/:id/:token',resetPassword);
console.log("Hello")
module.exports = router;