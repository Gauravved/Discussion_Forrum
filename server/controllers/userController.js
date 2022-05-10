const User = require('../models/userModel').userModel;
const bcrypt = require('bcrypt'); // used for encrypting data. We have used to encrypt password
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

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

module.exports.login = async (req, res, next)=>{
    try{
        console.log(req.body);
        const {username, password} = req.body;
        const isValidUser = await User.findOne({username});
        if(!isValidUser){
            res.json({ msg: "Invalid Username!! Please check the Spelling", status: false });
        }
        const isValidPassword = await bcrypt.compare(password, isValidUser.password);
        if(!isValidPassword){
            res.json({ msg: "Incorrect Password!! Please Re-check the password", status: false });
        }
        delete isValidUser.password;
        res.json({ status: true, user: isValidUser, profileSet: isValidUser.isProfilePicSet });
    }
    catch(excpetion){
        next(excpetion)
    }
}

module.exports.profile = async (req, res, next)=>{
    try{
        console.log("In controller", req.body, req.params)
        const id = req.params.id;
        const image = req.body.image;
        const data = await User.findByIdAndUpdate(id,{
            isProfilePicSet: true,
            ProfilePic: image
        });
        res.json({ profileSetStatus: data.isProfilePicSet, image: data.ProfilePic });
    }
    catch(excpetion){
        next(excpetion)
    }
}

module.exports.forgotPassword = async (req, res, next)=>{
    try{
        const secret = process.env.JWT_SECRET
        const {email} = req.body;
        const validEmail = await User.findOne({email});
        if(!validEmail){
            res.json({status: false, msg: "This Email is not registered"});
        }
        else{
            const newSecret = secret + validEmail.password; //new secret generation so that one link can be used only once
            //payload generation for token
            console.log(newSecret)
            const payload = {
                email: validEmail.email,
                id: validEmail.id
            }
            //token generation
            const token = jwt.sign(payload, newSecret, { expiresIn: '15m'}); //expiresIn specified the time of expiration of that link
            //Link generation from the Token
            const link = `http://localhost:3000/resetPassword/${validEmail.id}/${token}`
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth:{
                    user: 'smartroom112000@gmail.com',
                    pass: 'Smartroom@123'
                }
            });
            const mailOptions = {
                from: 'smartroom@123',
                to: `${validEmail.email}`,
                subject: 'Reset Your Password',
                text: ` Here is Your Password Reset Link: <a href="${link}>Click Here</a> <br>
                        This Link is valid for 15 minutes. Note: Do not share the Link
                `
            }
            transporter.sendMail(mailOptions, (error, info)=>{
                if(error){
                    console.log("Could not send Email"+error.msg);
                    res.json({status: false, msg:"Could Not send the email"});
                }
                else{
                    console.log("Email sent");
                    res.json({status: true, msg:"Email Send Successfully"});
                }
            })
            console.log(link)
        }
    }
    catch(exception){
        next(exception);
    }
}

module.exports.resetPassword = async (req, res, next)=>{
    try{
        const { password } = req.body;
        const {id,token} = req.params;
        console.log(id);
        console.log(password+" "+req.body)
        const validUser = await User.findById(id);
        if(!validUser){
            res.json({status: false, msg: "User Not Found"});
        }
        else{
            const secret = process.env.JWT_SECRET + validUser.password;
            console.log(validUser.id+" "+validUser.password)
            const payload = jwt.verify(token, secret);
            console.log(password);
            const encryptedPassword = await bcrypt.hash(password, 10);
            const user = await User.findByIdAndUpdate(id,{
                password: encryptedPassword
            });
            delete user.password;
            res.json({status: true, msg: "Password Reset Successful"})
        }
    }catch(exception){
        res.json({status: false, msg: "Either the Link is used or Expired"})
        next(exception)
    }
}

module.exports.getRooms = async (req,res,next)=>{
    try {
        const { id } = req.params;
        const rooms = await User.findById(id).select(["Rooms"]);
        const allRooms = rooms.Rooms;
        console.log(allRooms); 
        return res.json({data: allRooms });
    } catch (error) {
        next(error)
    }
}