

import React,{useContext,useEffect} from 'react'
import {ListGroup,Row,Col }from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from '../context/appContext';
import { addNotifications,resetNotifications } from '../features/userSlice';
import "./Slidebar.css"
import OnlinePredictionRoundedIcon from '@mui/icons-material/OnlinePredictionRounded';
import NearMeDisabledRoundedIcon from '@mui/icons-material/NearMeDisabledRounded';

function Sidebar() {
  const user = useSelector((state) => state.user);
  const {socket,setMembers, members, setCurrentRoom, setRooms, privateMemberMsg, rooms, setPrivateMemberMsg, currentRoom}=useContext(AppContext)
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
        setCurrentRoom("general");
        getRooms();
        socket.emit("join-room", "general");
        socket.emit("new-user");
    }
}, []);


  socket.off("new-user").on("new-user",(payload)=>{
    setMembers(payload)
  })


// const room = ["first room ","second room","third room"]
if (!user) {
  return <></>;
}

function joinRoom(room, isPublic = true) {
  if (!user) {
      return alert("Please login");
  }
  socket.emit("join-room", room, currentRoom);
  setCurrentRoom(room);

  if (isPublic) {
      setPrivateMemberMsg(null);
  }
  // dispatch for notifications
  dispatch(resetNotifications(room));
  socket.off("notification").on("notification",(room)=>{
    dispatch(addNotifications(room))
  })
}

function getRooms() {
  fetch("http://localhost:5000/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data));
}
function handlePrivateMemberMsg(member) {
  setPrivateMemberMsg(member);
  const roomId = orderIds(user._id, member._id);
  joinRoom(roomId, false);
}

if (!user) {
  return <></>;
}

function orderIds(id1, id2) {
  if (id1 > id2) {
      return id1 + "-" + id2;
  } else {
      return id2 + "-" + id1;
  }
}

  return (
    <>
      <h2>
        Available Rooms
    </h2><ListGroup>
        {
            rooms.map((room,index)=>{
                return <ListGroup.Item key={index} onClick={()=>joinRoom(room)} style={{cursor:"pointer",display:"flex",justifyContent:"space-between"}} active={room == currentRoom}> {room} {currentRoom !== room && <span className="badge rounded-pill bg-primary">{user.newMessages[room]}</span>}</ListGroup.Item>
            })
        }
    </ListGroup>

    <h2>Members</h2>
    <ListGroup>
    

     {members.map((member)=>{
       return  <ListGroup.Item key={member.id} style={{ cursor: "pointer" }} 
       active={privateMemberMsg?._id == member?._id} 
       onClick={() => handlePrivateMemberMsg(member)} 
       disabled={member._id === user._id}
       >
        <Row>
        <Col xs={2}>
        <img src={member.picture} className="member-status-img" />
        </Col>
        <Col xs={9}>

       {member.name}
       {member._id === user?._id && " (You)"}
        {/* {member.status == "offline"? "    Offline":"  online"} */}

        {member.status == "online" ? <OnlinePredictionRoundedIcon  style={{color:"green",marginLeft:"8px"}} /> : <NearMeDisabledRoundedIcon style={{color:"red",marginLeft:"8px"}} />}

        </Col>
        <Col xs={1}>
          <span className="badge rounded-pill bg-primary">{user.newMessages[orderIds(member._id, user._id)]}</span>
          </Col>
        </Row>
       
       </ListGroup.Item>
       
     })}
       </ListGroup>

    </>
  )
}

export default Sidebar
