

import React from 'react'
import {Row,Col,Button} from "react-bootstrap"
import "./Home.css"
import {LinkContainer} from "react-router-bootstrap"
// import ForumIcon from '@mui/icons-material/Forum';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

function Home() {
  return (
   <Row>
    <Col md={6} className="col1">
   <div> <h1>Make a conversation with your friends </h1>
    <p>ChatMe will connect you with your friends</p>
    <LinkContainer to="/chat">
    <Button variant='success'>Get Started <QuestionAnswerIcon/> </Button>
    </LinkContainer>
    </div>

    </Col>
    <Col md={6} className="home_bg">
    </Col>
   </Row>
  )
}

export default Home
