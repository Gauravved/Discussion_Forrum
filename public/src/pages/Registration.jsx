import React from 'react'
import styles from 'styled-components'
import {Link} from 'react-router-dom'

function Registration() {
    const submitHandler = (event) => {
        event.preventDefault();

    };
    const changeHandler = (event)=>{

    };
    return (
        <>
            <FormContainer>
                <form onSubmit={(event) => { submitHandler(event) }}>
                    <div className="heading">
                        <h1>Smart Room</h1>
                    </div>
                    <input type="text" placeholder='Username' name='uname' onChange={(event) => { changeHandler(event) }} />
                    <input type="email" placeholder='Email' name='emailAddress' onChange={(event) => { changeHandler(event) }} />
                    <input type="password" placeholder='Password' name='pass' onChange={(event) => { changeHandler(event) }} />
                    <input type="password" placeholder='Confirm Password' name='conPass' onChange={(event) => { changeHandler(event) }} />
                    <button type="submit"> Create Account </button>
                    <span>Already have an account? <Link to='/login'>Login</Link> </span>
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
        flex-direction: column;
        background-color: black;
        padding: 3rem 6rem;
        border-radius: 3rem;
        input{
            background: transparent;
            outline: none;
            border: 1px solid grey;
            border-bottom: 2px solid white;
            padding: 13px;
            width: 100%;
            border-radius: 5px;
            color: white;
            font-size: 20px;
            transition: 0.4s ease-in-out;
            &:focus{
                border: 1px solid blue;
                border-bottom: 2px solid blue;
            }
        }
        button{
            background-color:white;
            color: black;
            padding: 10px;
            width: 100%;
            margin-left: 13px;
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
            width: 100%;
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