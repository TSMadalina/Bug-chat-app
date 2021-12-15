import React from "react";
import './App.css';
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import {BrowserRouter as BrowserRouter, Switch, Route, Routes} from "react-router-dom";


function App() {
  return (
    <div className="App">

      {/* React Router for the chat screen */}
      <BrowserRouter>

        {/* Header */}
        <Header />
        {/* Chat section */}
        <div className="app_body">

          {/* Sidebar */}
          <Sidebar/>

          <Routes>
            {/* using a switch to check the route we are in and based on that
            we will render the appropiate screen */}
            <Route path="/room/:roomId">
              Chat Screen
              {/* <Chat/>   */}
            </Route> 

            <Route path="/room/:roomId">
              Welcome
            </Route> 
            
            </Routes>
      
        </div>

      </BrowserRouter>
      
    </div>
  );
}

export default App;
