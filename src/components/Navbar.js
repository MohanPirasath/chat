import React from 'react';
import {Nav,Navbar,Container,Button,NavDropdown} from "react-bootstrap"
import "./navbar.css"
import {LinkContainer} from "react-router-bootstrap"
import { useSelector } from 'react-redux';
import {useLogoutUserMutation} from "../utils/API.js"
import { padding } from '@mui/system';

function Navbars() {
  // const [logoutUser]= useLogoutUserMutation()
  // const handleLogout =async(e)=>{
  //   e.preventDefault()
  //   await logoutUser(user)
  //   window.location.replace("/")

  // }
  const user = useSelector((state)=> state.user)
  const [logoutUser] = useLogoutUserMutation();
  async function handleLogout(e) {
      e.preventDefault();
      // localStorage.clear()
      await logoutUser(user);
      // redirect to home page
      window.location.replace("/");
  }
  return (
    <Navbar bg="light" expand="lg">
      <Container className='container'>
      <LinkContainer to="/">
        <Navbar.Brand  >ChatMe</Navbar.Brand>
            </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user?
            // <LinkContainer to="/login">
            <Nav.Link ><Button variant='danger' style={{height:"2rem", paddingTop:"0",marginBottom:"0"}} onClick={handleLogout} >Logout</Button></Nav.Link>
            // </LinkContainer>
            :
            <LinkContainer to="/login">
            <Nav.Link ><Button variant='success'style={{height:"2rem", paddingTop:"0",marginBottom:"0"}} >Login</Button> </Nav.Link>
            </LinkContainer>}
            <LinkContainer to="/chat">
            <Nav.Link >Chat</Nav.Link>
            </LinkContainer>
            {user?<NavDropdown title={
              <>
              <img src={user.picture} style={{width:30,height:30,marginRight:10,objectFit:"cover",borderRadius:"50%"}} />
              {user.name}
              </>
            } id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              {/* <NavDropdown.Divider /> */}
              <NavDropdown.Item >
              <Button variant="danger"  
              onClick={handleLogout} 
              >
                                        Logout 
                                   </Button>
              </NavDropdown.Item>
            </NavDropdown>:""}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbars;