const User = require('../models/userModel');
const bcrypt = require('bcrypt'); // used for encrypting data. We have used to encrypt password

// what to do with the request comming from /register path is decided here
module.exports.register = async (req, res, next) => {
    try {
        console.log(req.body);
        const { username, email, password } = req.body; // extracting data from request body
        const checkUser = await User.findOne({ username });
        if (checkUser) {
            return res.json({ msg: "Username already in use", status: false });
        }
        const checkMail = await User.findOne({ email });
        if (checkMail) {
            return res.json({ msg: "Email already in use", status: false });
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username, email, password: encryptedPassword
        }); //This will create the user and return the data of created user, hence we will delete the password for security purpose 
        delete user.password;
        res.json({ status: true, user });
    }
    catch (excpetion) {
        next(excpetion);
    }

};