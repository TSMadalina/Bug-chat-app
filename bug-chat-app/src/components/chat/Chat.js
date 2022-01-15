import React, {useState, useEffect} from 'react';
import "./Chat.css";
import {useParams} from "react-router-dom";
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import db from "../../firebase";
import Message from './Message';
import ChatInput from './ChatInput';


function Chat() {
    const {roomId} = useParams(); //using hook to get the roomId
    const [roomDetails, setRoomDetails] = useState(null);
    const [roomMessages, setRoomMessages] = useState([]);

    //update the code everytime the roomId changes
    //it will change the url, connect to the database, use url param (the room id)
    //to fetch room details from the database
    useEffect(() => {
        if(roomId) {
            //fetching the room details from db
            db.collection('rooms').doc(roomId)
            .onSnapshot((snapshot) => setRoomDetails(snapshot.data()))
        }
        //fetching the messages from db
        db.collection('rooms').doc(roomId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot(snapshot => setRoomMessages(
            snapshot.docs.map((doc) => doc.data()) //looking at messages from the room and writing them on screen
            )
        );
    }, [roomId])

    return (
        <div className="chat">
            <div className="chat_header">
                <div className="chat_headerLeft">
                    <h4 className="chat_channelName">
                        {/* we're getting the name of the room from the database to show it on click */}
                        {/* ? is like a try&catch so if the code breaks it won't stop working because 
                        it defaults it to a safe value */}
                        <strong>#{roomDetails?.name}</strong>
                        <StarBorderOutlinedIcon/>
                    </h4>
                </div>
                <div className="chat_headerRight">
                    <p>
                        <InfoOutlinedIcon/> Details
                    </p>
                </div> 
            </div>

            <div className="chat_messages">
                {/* destructure the informations about the message to access 
                the actual written informations */}
                {roomMessages.map(({message, timestamp, user, userImage}) => (
                    <Message
                    message={message}
                    timestamp={timestamp}
                    user={user}
                    userImage={userImage}
                    />
                ))}
            </div>

            {/* input for messages */}
            <ChatInput channelName={roomDetails?.name} channelId={roomId}/>

        </div>
    )
}

export default Chat;
