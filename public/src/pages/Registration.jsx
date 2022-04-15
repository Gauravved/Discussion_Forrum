import React, { useState } from 'react'
import styles from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios' // axios is one of the most famous library of react js for sending Http request and get response from the rest points oor the apis
import { registrationRoute } from '../utils/APIRoute'

function Registration() {
    const navigate = useNavigate();
    const toastCss = {
        position: "top-right",
        theme: "dark",
        autoClose: 5000,
        pauseOnHover: true,
    };
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const submitHandler = async (event) => { // async is used for asyncronous functions here submitHandlers is async function. 
        event.preventDefault();
        if (validationHandler()) {
            const { username, email, password } = values;
            console.log(registrationRoute);
            const { data } = await axios.post(registrationRoute, {
                username, email, password
            }).then((result) => {
                console.log(result)
            }).catch((err) => {
                console.log(err.message);
            }); // await is used to make the function wait for the promise or the result
            if (data.status === false) {
                toast.error(data.msg, toastCss);
            }
            if (data.status === true) {
                localStorage.setItem('chat-user', JSON.stringify(data.user));
            }
            navigate("/chats");
        }
    };
    const changeHandler = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };
    const validationHandler = () => {
        const { password, confirmPassword, username, email } = values;
        if (password !== confirmPassword) {
            toast.error("Passwords does not match!", toastCss);
            return false;
        }
        else if (username.length < 5) {
            toast.error("Username should contain 5 characters atleast", toastCss);
            return false;
        }
        if (email.length === "") {
            toast.error("Email is required", toastCss);
            return false;
        }
        return true;
    }
    return (
        <>
            <ToastContainer />
            <FormContainer>
                <form onSubmit={(event) => { submitHandler(event) }}>
                    <div className="heading">
                        <h1>Smart Room</h1>
                    </div>
                    <input type="text" name="username" placeholder='Username' onChange={(e) => { changeHandler(e) }} required />
                    <input type="email" name="email" placeholder='Email' onChange={(e) => { changeHandler(e) }} required />
                    <input type="password" name="password" placeholder='Password' onChange={(e) => { changeHandler(e) }} minLength="8" required />
                    <input type="password" name='confirmPassword' placeholder='Confirm Password' onChange={(e) => { changeHandler(e) }} required />
                    <button type='submit'>Create Account</button>
                    <span>Already have an account? <Link to="/login">Login</Link> </span>
                </form>
            </FormContainer>
        </>
    )
}

const FormContainer = styles.div`
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    background-color: #131325;
    .heading{
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        h1{
            color: white;
            text-transform: uppercase;
        }
    }
    
    form{
        display: flex;
        gap: 2rem;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background-color: black;
        padding: 3rem 7rem;
        border-radius: 3rem;
        input{
            background: transparent;
            outline: none;
            width: 110%;
            border: 1px solid grey;
            border-bottom: 2px solid white;
            padding: 13px;
            border-radius: 5px;
            color: white;
            font-size: 20px;
            transition: 0.4s ease-in-out;
            &:focus{
                border: 1px solid blue;
                border-bottom: 2px solid blue;
            }
            &.visited{ 
                color: black;
                border: 1px solid grey;
                border-bottom: 2px solid white;
                background: white;
            }
        }
        button{
            background-color:white;
            color: black;
            padding: 10px;
            width: 120%;
            justify-content:center;
            align-items:center;
            border-radius: 5px;
            font-size: 20px;
            border: 2px solid white;
            outline: none;
            font-weight: bold;
            cursor: pointer;
            transition: 0.4s ease-in-out;
            &:hover{
                color: white;
                background-color: black;
            }
        }
        span{
            color: white;
            width: 110%;
            font-size: 16px;
            a{
                color: grey;
                font-weight:bold;
                text-decoration: none;
                &:hover{
                    color: white;
                    text-decoration: underline;
                }
            }
        }
    }
`;
export default Registration