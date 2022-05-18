import React from 'react'
import styled from 'styled-components'

export default function ChatContainer({ currentRoom, currentRoomId }) {
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
                        <div className="room-messages"></div>
                        <div className="room-input"></div>
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

