

import React,{useState,useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import "./register.css"
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import { registerRoute } from '../utils/API'
// 1:13:03


function Register() {
  const navigate=useNavigate()

  useEffect(()=>{
    if(localStorage.getItem("chat-app-user")){
      navigate("/")
    }
  },[])


    const [values,setvalues]=useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    })

    const Toastifys={
      position:"bottom-right",
      autoClose:8000,
      pauseOnHover:true,
      draggable:true,
      theme:"dark",

    }

const handleValidation=()=>{
    const {username,email,password,confirmPassword}=values
    if(password !== confirmPassword){
      toast.error("password and confirm password should be same.",Toastifys)
      return false;
    }else if(username.length<3){
      toast.error(" Needed longer userName",Toastifys)
      return false;

    }
    else if(email === ""){
      toast.error("Email is required",Toastifys)

      return false;

    
  }
  return true
}

const handleSubmit= async(event)=>{
    event.preventDefault()
   if(handleValidation()){
    const {password,username,email}=values;
    const {data} = await axios.post(registerRoute,{
      username,
      email,password
    })

    if(data.status === false){
      toast.error(data.msg,Toastifys)
    }
    if(data.status === true){
      localStorage.setItem("chat-app-user",JSON.stringify(data.username))
      navigate("/")
    }


   } 


}



const handleChange=(event)=>{
    setvalues({...values,[event.target.name]:event.target.value})
}
// console.log(values)
  return (
    <div className="regform">
    <form onSubmit={(event)=>handleSubmit(event)} className="forms">
      <div className='brand'>
        {/* <img src='#' alt='logo' /> */}
        <h1>Chats</h1>
      </div>
      <input type="text" placeholder='UserName' name='username' onChange={(e)=> handleChange(e)} />
      <input type="email" placeholder='Email' name='email' onChange={(e)=> handleChange(e)} />
      <input type="password" placeholder='Password' name='password' onChange={(e)=> handleChange(e)} />
      <input type="password" placeholder='Confirm Password' name='confirmPassword' onChange={(e)=> handleChange(e)} />
      <button type='submit' className='reg_btn'>Create User</button>
      <span>Already have an account ? <Link to="/login">Login</Link></span>
    </form>
    <ToastContainer/>
    </div>
  )
}

export default Register
