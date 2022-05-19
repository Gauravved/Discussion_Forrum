import React from 'react'
import styled from 'styled-components'
import ChatInput from './ChatInput';
import Messages from './Messages';

export default function ChatContainer({ currentRoom, currentRoomId }) {
    const handleSendMessage = async (message)=>{
        alert(message)
    }
    return (
        <>
            {
                currentRoom && (
                    <Container>
                        <div className="room-header">
                            <div className="room-details">
                                <div className="roomname">
                                    <h3>{currentRoom}    :   ({currentRoomId})</h3>
                                </div>
                            </div>
                        </div>
                        <Messages />
                        <ChatInput handleSendMessage={handleSendMessage} />
                    </Container>
                )
            }
        </>
    )
}

const Container = styled.div`
.room-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem;
    height: 3rem;
    background-color: #262650;
    .room-details{
        display: flex;
        align-items: center;
        gap: 1rem;
        .roomname{
            color: white;
            padding-left: 2rem;
        }
    }
}
`;

