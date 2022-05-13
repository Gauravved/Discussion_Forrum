import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

export default function Rooms({ rooms, currentUser }) {
    const [currentUsername, setCurrentUsername] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [selectedRoom, setSelectedRoom] = useState(undefined);
    useEffect(() => {
        if (currentUser) {
            setCurrentUserImage(currentUser.ProfilePic);
            setCurrentUsername(currentUser.username);

        }
    }, [currentUser]);
    const changedRoom = (index, room) => { };
    return (
        <>
            {
                currentUserImage && currentUsername && (
                    <Container>
                        <div className="heading" >
                            <h3>Rooms</h3>
                        </div>
                        {
                            rooms.length === 0 ?
                                <>
                                    <div className="rooms" style={{ justifyContent: "center" }}>
                                        <div className="noRoom">
                                            <h2>No Room to display</h2>
                                        </div>
                                    </div>
                                </>
                                :
                                <>
                                    <div className="rooms">
                                        {
                                            rooms.map((room, index) => {
                                                return (
                                                    <div className={`room ${index === selectedRoom ? "selected" : ""}`} key={index}>
                                                        <div className="roomName">
                                                            <h3>{room}</h3>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </>
                        }
                    </Container>
                )
            }
        </>
    )
}

const Container = styled.div`
    display: grid;
    overflow: hidden;
    background-color: #080820;
    grid-template-rows: 10% 90%;
    .heading{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1 rem;
        h3{
            color: white;
            text-transform: uppercase;
        }
    }
    .rooms{
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        gap: 0.8rem;
        &::-webkit-scrollbar{
            width: 0.3rem;
            &-thumb{
                background-color: #ffffff39;
                border-radius: 1rem;
            }
        }
        &::-webkit-scrollbar-thumb:hover{
            background-color: #ffffff20;
        }
        .room{
            gap: 1rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            background-color: #ffffff39;
            width: 90%;
            padding-left: 7px;
            min-height: 3.5rem;
            border-radius: 5px;
            transition: 0.4s ease-in-out;
            vertical-align: center;
            .roomName{
                color: white;
            }
            .selected{
                background-color: #131335;
            }
        }
        .noRoom{
            gap: 1rem;
            color: white;
            display: flex;
            align-items: center;
            background-color: #ffffff39;
            width: 90%;
            padding-left: 7px;
            min-height: 3.5rem;
            border-radius: 5px;
            transition: 0.4s ease-in-out;
            vertical-align: center;
        }
    }
    .cuurentUser{
        display: flex;
        background-color: #0d0d30;
        align-items: center;
        gap: 2rem;
        justify-content: center;
        .profile{
            img{
                height: 4rem;
                max-inline-size: 100%;
            }
        }
        .username{
            h3{
                color: white;
            }
        }
        @media screen and (min-width: 720px) and (max-width: 1080px){
            gap: 0.5rem;
            .username{
                h3{
                    font-size: 1rem;
                }
            }
        }
    }
`;
