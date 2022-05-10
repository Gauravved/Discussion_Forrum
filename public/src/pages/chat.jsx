import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { allRoomsRoute } from '../utils/APIRoute';
import Rooms from '../components/Rooms'

function Chat(){
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(()=>{
    defaultFunction();
    async function defaultFunction(){
      if(!localStorage.getItem('chat-user')){
        navigate('/');
      }
      else{
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-user")));
      }
    }
  },[]);
  useEffect(()=>{
    defaultFunction();
    async function defaultFunction(){
      if(currentUser){
        if(currentUser.isProfilePicSet){
          const {data} = await axios.get(`${allRoomsRoute}/${currentUser._id}`);
          setRooms(data.data);
        }
        else{
          navigate("/setProfile")
        }
      }
    }
  }, [currentUser]);
  return (
    <>
      <Container>
        <div className="container">
          <Rooms rooms={rooms} currentUser={currentUser} />
        </div>
      </Container>
    </>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #131325;
  .container{
    height: 85vh;
    width: 85%;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px){
      grid-template-columns: 35% 65%;
    }

  }
`;

export default Chat