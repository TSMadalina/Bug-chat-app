import React, {useState} from 'react';
import db from '../../firebase'
import './ChatInput.css';
import {useStateValue} from '../../StateProvider';
import firebase from 'firebase/compat/app';

function ChatInput({channelName, channelId}) {
    const [input, setInput] = useState('');
    const [{user}] = useStateValue();

    const sendMessage = (e) => {
        e.preventDefault(); //preventing the refreshing of the page on click the page

        if(channelId) {
            //we need access to the database were we would use the firebase server local hour
            //that recognizes were we log from and changes that timestamp
            db.collection('rooms').doc("dkJP67RX6KoOGzN3pjSR").collection('messages')
            .add({
                message: input,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                user: user.displayName,
                userImage: user.photoURL,
            });
        }
    }

    return (
        <div className='chatInput'>
            <form>
                <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Message #${channelName?.toLowerCase()}`}/>
                <button type="submit" onClick={sendMessage}>SEND</button>
            </form>
        </div>
    )
}

export default ChatInput
