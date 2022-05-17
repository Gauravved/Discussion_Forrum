import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function Header({ currentUser, displaySettings, displaySettings2 }) {
    const [currentUsername, setCurrentUsername] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    useEffect(() => {
        if (currentUser) {
            setCurrentUsername(currentUser.username);
            setCurrentUserImage(currentUser.ProfilePic)
        }
    }, [currentUser]);
    return (
        <>
            <HeaderContainer>
                <h1>Smart Room</h1>
                <div className='options'>
                    <div className="roomButtons">
                        <button type="submit" onClick={() => {displaySettings()}
                        }>Create</button>

                    </div>
                    <div className="roomButtons">
                        <button type='submit' onClick={()=>{displaySettings2()}}>Join</button>
                    </div>
                    <div className="currentUser">
                        <div className="profile">
                            <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="profile" />
                        </div>
                        <div className="username">
                            <h3>{currentUsername}</h3>
                        </div>
                    </div>
                </div>
            </HeaderContainer>
        </>
    )
}

const HeaderContainer = styled.nav`
display: grid;
grid-template-columns: 15% 85%; 
width: auto;
padding: 0.8rem;
align-items: center;
background-color: #262650;
margin: none;
h1{
    color: white;
    text-transform: uppercase;
}
.options{
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
    .roomButtons{
        display: flex;
        padding: 0px 10px;
        align-items: right;
        justify-content: end;
        button{
            background-color:white;
            color: #262650;
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
    }
    .currentUser{
        display: flex;
        align-items: center;
        justify-content: center;
        .profile{
            img{
                height: 3rem;
                max-inline-size: 100%;
                padding: 5px;
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
}

`;
