import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./ChooseUser.css";
import { Button, IconButton } from "@mui/material"
import { getAuth } from "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/database';
import db from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore"
// import Choose from './ChooseUserOption';
import AddIcon from '@mui/icons-material/Add';


function User() {
    const history = useNavigate();

    const auth = getAuth();
    const user = auth.currentUser;
    const email = user.email;

    const [projects, setProjects] = useState([]);


    // function chooseRoom() {
    //     if (projects.length == 0) {
    //         db.collection('users')
    //             .orderBy('project', 'asc')
    //             .onSnapshot(snapshot => {
    //                 snapshot.docs.map((doc) => {
    //                     projects.push({
    //                         "project": doc.data().project,
    //                         "user": doc.data().name
    //                     })
    //                 })
    //             })
    //         // projects = [];
    //         // users = [];

    //     }
    // }



    useEffect(() => {
        db.collection('users')
            .orderBy('project', 'asc')
            .onSnapshot(snapshot => setProjects(
                snapshot.docs.map((doc) => doc.data())
            ))
    }, [])


    const showAll = () => {
        let path = email.slice(0, email.search('@'))
        // history(`/${path}/rooms`)
        console.log('are uyou here')

        console.log("reandering", projects)

    }

    const addUser = () => {

        db.collection("users").where("email", "==", email).get().then(snapshot => {
            if (snapshot.size == 0) {

                const projectName = prompt("It looks like you are not part of any projects. Please create a new project bellow:");
                if (projectName.length != 0) {
                    db.collection('users').add({
                        name: user.displayName,
                        email: user.email,
                        role: 'user',
                        project: projectName
                    })
                }
            }
            else {
                history(`/:user/:project/:room`);
            }
        })
    }

    return (
        <div className="choose">
            {projects && (
                <>
                    <div className="containerMember">
                        <div className="usertype_container">
                            <h2>Create a new project:</h2>
                            <Button onClick={addUser}>Project Member</Button>
                        </div>
                    </div>
                    <div className="containerTester">
                        <div className="posCircle">
                            <div className="circle">OR</div>
                        </div>
                        <div className="open">
                            <h3>Open a project</h3>
                        </div>

                        <div className="chooseRoom">
                            {projects.map((data) =>
                                <section>
                                    <div className="workspace-container">
                                        <div className="workspace"> <strong> user </strong> 's projects</div>
                                        <div>
                                            <Button style={{ flex: 1 }} id="chooseRoom">{data.project}
                                                <br />
                                                <span>#nr members</span>
                                            </Button>
                                        </div>
                                    </div>
                                </section>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    )

}


export default User
