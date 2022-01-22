import React from 'react';
import './SidebarOption.css'
import { useNavigate } from 'react-router-dom';
import db from '../../firebase';
import { getAuth } from "firebase/auth";


// I need to get the icon form the sidebar component and the title of that
// selection
function SidebarOption({ Icon, title, id, addChannelOption }) {
    //when we will create a new channel we will force direct the user to 
    //that channel using the useNavigate that works the same way a browser
    //keeps track of the pages you visited
    const history = useNavigate();

    const auth = getAuth();
    const currentUser = auth.currentUser;
    const email = currentUser.email;
    var project;

    const selectChannel = () => {
        if (id) {
            let path = email.slice(0, email.search('@'))

            db.collection("users").where("email", "==", email).get().then((snapshot) => {
                snapshot.forEach((user) => {
                    project = user.data().project
                    project = project.replace(/\s/g, "");
                    history(`/${path}/${project}/${id}`)
                })

            })
            // } else {
            //     history(title);
            // }
        }
    }


    //dummy function
    const addChannel = () => {
        const channelName = prompt('Please enter the channel name:');

        //checking if the user wrote something
        if (channelName) {
            //creating and adding a new channel to the database
            db.collection("users").where("email", "==", email).get().then((snapshot) => {
                snapshot.docs.map((doc) =>
                    db.collection('users').doc(doc.id).collection('rooms').add({
                        name: channelName,
                        user: doc.id
                    })
                )
            })
        }
    };

    return (
        // we add a new channel on click of the add channel button
        <div className="sidebarOption"
            onClick={addChannelOption ? addChannel : selectChannel}>
            {/* renders a component only if an icon exists */}
            {Icon && <Icon className="sidebarOption_icon" />}
            {/* if an icon is passed we render the title else we add a # to the title 
            to show the different channels */}
            {Icon ? (
                <h3>{title}</h3>) : (
                <h3 className="sidebarOption_channel">
                    <span className="sidebarOption_hash">#</span> {title}
                </h3>
            )}

        </div>
    )
}

export default SidebarOption;