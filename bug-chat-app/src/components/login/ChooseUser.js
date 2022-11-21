import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./ChooseUser.css";
import { Button } from "@mui/material"
import { getAuth } from "firebase/auth";
import db from "../../firebase";

function User() {
    const history = useNavigate();

    const auth = getAuth();
    const user = auth.currentUser;
    const email = user.email;

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        db.collection('users')
            .orderBy('project', 'asc')
            .onSnapshot(snapshot => setProjects(
                snapshot.docs.map((doc) => doc.data())
            ))
    }, [])


    const showAll = (data) => {
        let path = email.slice(0, email.search('@'))
        history(`/${path}/:project/:room`)
    }

    const addUser = () => {

        db.collection("users").where("email", "==", email).get().then(snapshot => {
            if (snapshot.size == 0) {
                const projectName = prompt("It looks like you are not part of any projects. Please create a new project bellow:");
                if (projectName.length != 0) {
                    db.collection('users').add({
                        name: user.displayName,
                        email: user.email,
                        role: 'tester',
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
                            <h2>Do you want to create your own project?</h2>
                            <Button onClick={addUser}>Create New Project</Button>
                        </div>
                    </div>
                    <div className="containerTester">
                        <div className="posCircle">
                            <div className="circle">OR</div>
                        </div>
                        <div className="open">
                            <h3>Open a project?</h3>
                        </div>

                        <div className="chooseRoom">
                            {projects.map((data) =>
                                <section>
                                    <div className="workspace-container">
                                        <div className="workspace"> <strong> {data.email} </strong> 's projects</div>
                                        <div>
                                            <Button onClick={() => { showAll({ data }); history(`/${data.email.slice(0, data.email.search('@'))}/${data.project}/:room`) }} style={{ flex: 1 }} id="chooseRoom">{data.project}
                                                <br />

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
