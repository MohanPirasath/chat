

import React,{useState,useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import "./register.css"
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import { registerRoute } from '../utils/API'

function Avatar() {
  return (
    <div>
      Avatar
    </div>
  )
}

export default Avatar
