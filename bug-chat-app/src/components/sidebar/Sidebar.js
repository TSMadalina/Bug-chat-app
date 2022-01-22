import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CreateIcon from '@mui/icons-material/Create';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SidebarOption from './SidebarOption';
import AddIcon from '@mui/icons-material/Add';
import db from "../../firebase";
import { useStateValue } from '../../StateProvider'
import { getAuth } from "firebase/auth";

var check = 1;
var usersId = [];
function Sidebar() {
    //setting up a variable with useState - initialize it with empty because that's 
    //how it will be in the beginning
    const [channels, setChannels] = useState([])
    const [users, setUsers] = useState([])

    const [{ user }] = useStateValue();

    const auth = getAuth();
    const currentUser = auth.currentUser;


    //using a hook to run the code once when the sidebar component loads
    useEffect(() => {
        //onSnapshot updates the database in realtime, every time something it is modified
        //we make a new snapshot of it (added or deleted)
        db.collection("users").where("email", "==", currentUser.email).get().then(snapshot => {
            snapshot.docs.map(query =>
                db.collection('users').doc(query.id).collection('rooms')
                    .orderBy('name', 'asc')
                    .onSnapshot(snapshot => {
                        // //we're looping through every element (document) in the database and returns an
                        // //array of the objects with the id and the name that's gonna get set in the
                        // //channels variable
                        setChannels(
                            snapshot.docs.map(doc => ({
                                user: query.id,
                                name: doc.data().name,
                            }))
                        )
                    })
            )
        })


        db.collection("users").where("email", "==", currentUser.email).get().then(snapshot => {
            setUsers(
                snapshot.docs.map(doc => ({
                    email: doc.data().email,
                    name: doc.data().name,
                    project: doc.data().project,
                    role: doc.data().role,
                }))
            )
        })

    }, []);



    return <div className="sidebar">
        <div className="sidebar_header">
            <div className="sidebar_info">
                <h2>
                    {users.map(user => user?.project)}
                </h2>
                <h3>
                    {/* Icon to show offline/online */}
                    <FiberManualRecordIcon />
                    {user?.displayName}
                </h3>
            </div>
            {/* edit/create icon */}
            <CreateIcon />

        </div>
        <SidebarOption Icon={ExpandMoreIcon} title="Channels" />

        {/* Connect to database and list all the channels using sidebarOption */}
        {/* for every channel return a sidebar option */}

        {channels.map(channel => (
            <SidebarOption title={channel.name} id={channel.name} />
        ))}
        <SidebarOption Icon={AddIcon} addChannelOption title="Add channels" />

        {/* Horizontal line */}
        <hr />

        <SidebarOption Icon={ExpandMoreIcon} title="Direct messages" />
        <SidebarOption Icon={AddIcon} title="Add teammates" />


    </div>
}

export default Sidebar;
