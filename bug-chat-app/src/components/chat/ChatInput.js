import React, { useState } from 'react';
import db from '../../firebase'
import './ChatInput.css';
import { useStateValue } from '../../StateProvider';
import firebase from 'firebase/compat/app';
import { getAuth } from "firebase/auth";
import { useLocation } from 'react-router-dom';


function ChatInput({ channelName, channelId, chatRef }) {
    const [input, setInput] = useState('');
    const [{ user }] = useStateValue();

    const history = useLocation();
    let email = history.pathname.split('/')[1] + "@gmail.com";

    const auth = getAuth();

    const sendMessage = (e) => {
        e.preventDefault(); //preventing the refreshing of the page on click the page

        if (channelId) {
            //we need access to the database were we would use the firebase server local hour
            //that recognizes were we log from and changes that timestamp
            db.collection("users").where("email", "==", email).get().then((query) => {
                query.docs.map((doc) => {
                    db.collection('users').doc(doc.id).collection('rooms').doc(channelId).collection('messages')
                        .add({
                            message: input,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            user: user.displayName,
                            userImage: user.photoURL,
                        });
                })
            })
        }

        chatRef.current.scrollIntoView({
            behavior: 'smooth',
        })

        //change input box back to empty after sending message
        setInput("");
    }

    return (
        <div className='chatInput'>
            <form>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Message #${channelName?.toLowerCase()}`} />
                <button type="submit" onClick={sendMessage}>SEND</button>
            </form>
        </div>
    )
}

export default ChatInput
