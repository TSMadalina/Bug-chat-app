import React, { useState, useEffect, useRef } from 'react';
import "./Chat.css";
import { useParams } from "react-router-dom";
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import db from "../../firebase";
import Message from './Message';
import ChatInput from './ChatInput';
// import {selectroom} from "../features/appSlice";
import { getAuth } from "firebase/auth";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';



function Chat() {
    const chatRef = useRef(null);
    // const room = useSelector(selectroom);
    // const { roomId } = useParams(); //using hook to get the room
    const { room } = useParams(); //using hook to get the room

    const [roomDetails, setRoomDetails] = useState([]);
    const [roomMessages, setRoomMessages] = useState([]);

    const auth = getAuth();
    const currentUser = auth.currentUser;
    const email = currentUser.email;

    const [open, setOpen] = useState(false);

    const addBug = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    //update the code everytime the room changes
    //it will change the url, connect to the database, use url param (the room id)
    //to fetch room details from the database
    useEffect(() => {
        if (room) {
            //fetching the room details from db
            db.collection("users").where("email", "==", email).get().then((query) => {
                query.docs.map((doc) => {
                    db.collection('users').doc(doc.id).collection('rooms').doc(room)
                        .onSnapshot((snapshot) => {
                            setRoomDetails(snapshot.id)
                        })
                })
            })
        }

        //fetching the messages from db 
        db.collection("users").where("email", "==", email).get().then((query) => {
            query.docs.map((doc) =>
                db.collection('users').doc(doc.id).collection('rooms').doc(room)
                    .collection('messages')
                    .orderBy('timestamp', 'asc')
                    .onSnapshot(snapshot => setRoomMessages(
                        snapshot.docs.map((doc) => doc.data()) //looking at messages from the room and writing them on screen
                    )
                    )
            )
        })

    }, [room])


    return (
        <>
            <div className="chat">
                {room !== ":room" && roomMessages && (
                    <>
                        <div className="chat_header">
                            <div className="chat_headerLeft">
                                <h4 className="chat_channelName">
                                    {/* we're getting the name of the room from the database to show it on click */}
                                    {/* ? is like a try&catch so if the code breaks it won't stop working because 
                        it defaults it to a safe value */}
                                    <strong>#{room}</strong>
                                    <StarBorderOutlinedIcon />
                                </h4>
                            </div>
                            <div className="chat_headerRight">
                                <p>
                                    <AddCircleOutlineIcon onClick={addBug} /> Add bug
                                </p>
                            </div>
                        </div>

                        <div className="chat_messages">
                            {/* destructure the informations about the message to access 
                the actual written informations */}
                            {roomMessages.map(({ message, timestamp, user, userImage }) => (
                                <Message
                                    message={message}
                                    timestamp={timestamp}
                                    user={user}
                                    userImage={userImage}
                                />
                            ))}
                            <div className="ChatBottom" ref={chatRef} />
                        </div>

                        {/* input for messages */}
                        <ChatInput chatRef={chatRef} channelName={room} channelId={room} />
                    </>
                )}
            </div>

            <Dialog open={open}>
                {console.log('return')}
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Report new bug:
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Bug"
                        type="email"
                        fullWidth
                        variant="standard"
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Severitate"
                        type="number"
                        fullWidth
                        variant="standard"
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Priority"
                        type="number"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Description"
                        type="link"
                        fullWidth
                        variant="standard"
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Commit link"
                        type="link"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Add</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Chat;