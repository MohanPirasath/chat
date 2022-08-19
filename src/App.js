// import logo from './logo.svg';
import './App.css';
import React,{ useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link
} from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';
import Avatar from './pages/Avatar';
import Home from './pages/Home';
import Navbars from "./components/Navbar.js"
import { useSelector } from 'react-redux';
import { AppContext,socket } from './context/appContext';

function App() {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateMemberMsg, setPrivateMemberMsg] = useState({});
  const [newMessages, setNewMessages] = useState({});
  const user = useSelector((state) =>state.user)
  return (
    <div className="App">
      <AppContext.Provider value={{ socket, currentRoom, setCurrentRoom, members, setMembers, messages, setMessages, privateMemberMsg, setPrivateMemberMsg, rooms, setRooms, newMessages, setNewMessages }}>
     <Routes>
       <Route path="/" element={[<Navbars/>,<Home/>]} />
       {user?"":<>
        <Route path="/register" element={[
      <Navbars />,
      <Register/>]} />
        <Route path="/login" element={[<Navbars/>,<Login/>]} /></>}
        <Route path="/chat" element={[<Navbars/>,<Chat/>]} />
      </Routes>
      </AppContext.Provider>
    </div>
  );
}

export default App;
