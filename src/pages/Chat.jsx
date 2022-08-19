

// import React,{useState,useEffect,useRef} from 'react'
// import "./Chat.css"
// import axios from 'axios'
// import {useNavigate} from "react-router-dom"
// import { io } from "socket.io-client";
// import {APIs} from "../utils/API.js"
// import {allUsersRoute} from "../utils/API"


// function Chat() {
// const navigate = useNavigate()
// const socket = useRef();
//   const [contacts,setContacts]= useState([])
//   const [currentChat, setCurrentChat] = useState(undefined);
//   const [currentUser, setCurrentUser] = useState(undefined);
//   useEffect( () => {
//     async function Am(){
//     if (!localStorage.getItem("chat-app-user")) {
//       navigate("/login");
//     } else {
//       setCurrentUser(
//         await JSON.parse(
//           localStorage.getItem("chat-app-user")
//         )
//       );
//     }
//   }
//   Am()
//   }, []);
//   useEffect(() => {
//     if (currentUser) {
//       socket.current = io(APIs);
//       socket.current.emit("add-user", currentUser._id);
//     }
//   }, [currentUser]);

//   useEffect( () => {
//     async function AM(){

    
//     if (currentUser) {
//       if (currentUser) {
//         const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
//         setContacts(data.data);
//       } else {
//         navigate("/login");
//       }
//     }
//   }
//   AM()
//   }, [currentUser]);
//   const handleChatChange = (chat) => {
//     setCurrentChat(chat);
//   };

//   return (
//     <div className='div'>
//       <div className='container'>
// Chat

//       </div>
//     </div>
//   )
// }

// export default Chat



import React from 'react'
import { Container,Col,Row } from "react-bootstrap";
import Sidebar from "../components/Sidebar.js";
import MessageForm from "../components/MessageForm.js";

function Chat() {
  return (
    <Container>
      <Row>

      <Col md={4}>
      <Sidebar/>
      </Col>
      <Col md={8}>
      <MessageForm />
      </Col>

      </Row>
      
    </Container>
  )
}

export default Chat
