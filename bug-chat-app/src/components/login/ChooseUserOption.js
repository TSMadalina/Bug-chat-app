// import React from "react";
// import { useNavigate } from 'react-router-dom';
// import './ChooseUserOption.css'
// import db from '../../firebase';
// import { Button } from "@mui/material"

// var projects = []
// var users = [];

// function Choose() {

//     // const history = useNavigate();

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
//         projects = [];
//         users = [];

//     }

//     const redirectTester = (data) => {
//         // const history = useNavigate();

//         // history(`/:user/:project/:room`);
//     }


//     // projects.map((project) => { console.log("project:", project) })


//     return (
//         <div className="chooseRoom">
//             {console.log('i am rendering')}
//             {projects.map((data) =>
//                 <Button onClick={() => redirectTester(data.project)} style={{ flex: 1 }} id="chooseRoom">{data.project} </Button>
//             )}

//         </div>
//     )
// }

// Choose()

// export default Choose