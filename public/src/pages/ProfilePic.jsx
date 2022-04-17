import React, { useState, useEffect } from 'react';
import axios from 'axios';
import loading from '../assets/loading2.gif';
import { ToastContainer, toast } from 'react-toastify';
import { profileRoute } from '../utils/APIRoute';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Buffer } from 'buffer';

function ProfilePic() {

    const api = "https://api.multiavatar.com/456789456";
    const navigate = useNavigate();
    const [profiles, setProfiles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selected, setSelected] = useState(undefined);
    const toastCss = {
        position: "top-right",
        theme: "dark",
        autoClose: 5000,
        pauseOnHover: true,
    };
    const setProfilePic = async ()=>{
        if(selected === undefined){
            toast.error("Please Select an Profile Picture", toastCss)
        } else{
            const user = await JSON.parse(localStorage.getItem('chat-user'));
            const { data }= await axios.post(`${profileRoute}/${user._id}`,{
                image: profiles[selected]
            });
        }
    };
    useEffect(()=>{
        async function fetchData(){
            const data=[];
        for (let i=0; i<5; i++){
            const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
            const buffer = new Buffer(image.data);
            data.push(buffer.toString("base64"));
        }
        setProfiles(data);
        setIsLoading(false);
        }
        fetchData();
    }, []);


    return (
        <>
        {
            isLoading? <Container>
                <img src={loading} alt="loading" className='loader' />
            </Container>:
            <Container>
                <div className="heading">
                    <h1>Pick a Profile Pic that suits you</h1>
                </div>
                <div className="profiles">
                    {
                        profiles.map((profile, index)=>{
                            return(
                                <div key={index} className={`profile ${selected === index ? "selected" :"" }`}>
                                    <img src={`data: image/svg+xml;base64,${profile}`} alt="profile" 
                                    onClick={()=>{setSelected(index)}}
                                    />
                                </div>
                            );
                        })
                    }
                </div>
                <button type='submit' onClick={()=>{setProfilePic()}} >Set Profile</button>
            </Container>
        }
            <ToastContainer />
            
        </>   
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #131325;
    gap: 2rem;
    height: 100vh;
    width: 100%;
    .loader{
        max-inline-size: 100%;
        background-color: transparent;
    }
    .heading{
        h1{
            color: white;
        }
    }
    .profiles{
        display: flex;
        gap: 3rem;
        .profile{
            border: 5px solid transparent;
            padding: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 5rem;
            transition: 0.4s ease-in-out;
            img{
                height: 6rem;
            }
        }
        .selected{
            border: 5px solid white;
        }
    }
    button{
        background-color:white;
        color: #131325;
        padding: 10px;
        width: auto;
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
            background-color: transparent;
        }
    }
`;

export default ProfilePic;