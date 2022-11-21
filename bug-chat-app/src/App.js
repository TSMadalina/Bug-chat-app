import React from "react";
import './App.css';
import Sidebar from "./components/sidebar/Sidebar";
import Chat from "./components/chat/Chat";
import Login from "./components/login/Login";
import ChooseUser from "./components/login/ChooseUser";

import { useStateValue } from './StateProvider';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="App">

      {/* React Router for the chat screen */}
      <Router>
        {!user ? (
          <Login />
        ) : (
          //wrap everything in a fragment (we're doing this because 
          //we can't have more than one element next to eachother )

          <>
            {/* Chat section */}
            <div className="app_body">
              <Routes>
                <Route exact path="/get-started" element={<ChooseUser />} />
                {/* <Route exact path="/:user/rooms" element={<Choose />} /> */}
              </Routes>


              <Routes>
                {/* using a switch to check the route we are in and based on that
              we will render the appropiate screen */}

                <Route exact path="/:user/:project/:room" element={<> <Sidebar /> <Chat /> </>}>
                  {/* Header */}
                  {/* <Route exact path="/room/:roomId" element={<Header/>}/> */}
                  {/* Sidebar */}
                  {/* <Route exact path="/room/:roomId" element={<Sidebar/>}/> */}

                  {/* Chat component */}
                  {/* <Route exact path="/room/:roomId" element={<Chat/>}/> */}
                </Route>

              </Routes>

            </div>
          </>
        )}
      </Router>

    </div>
  );
}

export default App;
