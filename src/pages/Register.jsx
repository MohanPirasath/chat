

import React,{useState,useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import "./register.css"
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import { registerRoute } from '../utils/API'
import { useSignupUserMutation } from '../utils/API'
import AddCircleIcon from '@mui/icons-material/AddCircle';
// 3:31:40






function Register() {
  const validate = (e) => {
    const file = e.target.files[0]
    if(file.size >= 1048576){
      return alert("Profile Img should below 1MB")
    }else{
      setimage(file)
      setimgpreview(URL.createObjectURL(file))
    }
     
   }
  const navigate=useNavigate()

  // useEffect(()=>{
  //   if(localStorage.getItem("chat-app-user")){
  //     // navigate("/")
  //   }
  // },[])


    // const [values,setvalues]=useState({
    //     username:"",
    //     email:"",
    //     password:"",
    //     confirmPassword:""
    // })

    const [userName,setusername]=useState()
    const [email,setemail]=useState()
    const [password,setpassword]=useState()
    const [confirmpassord,setconfirmpassword]=useState()
    const [signupUser,{isLoading,error}] = useSignupUserMutation()

    const [image,setimage]=useState(null)
    const [uploadingImg,setuploadingImg]=useState(false)
    const [imgpreview,setimgpreview]=useState(false)

    const Toastifys={
      position:"bottom-right",
      autoClose:8000,
      pauseOnHover:true,
      draggable:true,
      theme:"dark",

    }

// const handleValidation=()=>{
//     const {username,email,password,confirmPassword}=values
//     if(password !== confirmPassword){
//       toast.error("password and confirm password should be same.",Toastifys)
//       return false;
//     }else if(username.length<3){
//       toast.error(" Needed longer userName",Toastifys)
//       return false;

//     }
//     else if(email === ""){
//       toast.error("Email is required",Toastifys)

//       return false;

    
//   }
//   return true
// }


 const uploadImg = async()=>{
const data = new FormData();
data.append("file",image)
data.append("upload_preset","tylp8b2g")
 try{
  setuploadingImg(true)
  let res=await fetch("https://api.cloudinary.com/v1_1/dfpv6uwb3/image/upload",{
    method:"post",
    body:data
  })
  const urlData=await res.json();
  setuploadingImg(false);
  return urlData.url
}catch(error){
  setuploadingImg(false);
console.log("error on img upload",error)
}
 }



const handleSubmit= async(event)=>{
  // const {password,username,email}=values;

    event.preventDefault()
  //  if(handleValidation()){
  //   const {password,username,email}=values;
  //   const {data} = await axios.post(registerRoute,{
  //     username,
  //     email,password
  //   })

  //   if(data.status === false){
  //     toast.error(data.msg,Toastifys)
  //   }
  //   if(data.status === true){
  //     localStorage.setItem("chat-app-email",email)
  //     navigate("/")
  //   }


  //  } 
  //  localStorage.setItem("chat-app-user",email)

if(!image){return alert("please upload your profile picture")}
const url=await uploadImg(image)
// console.log(url);
//register
signupUser({userName,email,password,picture:url}).then(({data})=>{
  if(data){
    console.log(data)
    navigate("/chat")
  }
})


}



// const handleChange=(event)=>{
//     setvalues({...values,[event.target.name]:event.target.value})
// }
// console.log(values)
  return (
    <div className="regform">
    <form onSubmit={(event)=>handleSubmit(event)} className="forms formreg">
      <div className='brand'>
        {/* <img src='#' alt='logo' /> */}
        <h2>SIGNUP</h2>
        <div className='signup-profile-pic-container'>
          <img src={imgpreview ||"https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"} className='signup-profile-pic'/>
          <lable htmlFor="image-upload" className="image-uploaded">
            <AddCircleIcon  className='add-pic-icon'/>
          <input type="file" id="img-upload"  accept='image/png, image/jpeg' onChange={validate} className='add-pic-icon_btn'  />
          </lable>
        </div>
      </div>
      <input type="text" placeholder='UserName' name='username' onChange={(e)=> setusername(e.target.value)} />
      <input type="email" placeholder='Email' name='email' onChange={(e)=> setemail(e.target.value)} />
      <input type="password" placeholder='Password' name='password' onChange={(e)=> setpassword(e.target.value)} />
      <input type="password" placeholder='Confirm Password' name='confirmPassword' onChange={(e)=> setconfirmpassword(e.target.value)} />
      <button type='submit' className='reg_btn'>Create User</button>
      <span>Already have an account ? <Link to="/login">Login</Link></span>
    </form>
    <ToastContainer/>
    </div>
  )
}

export default Register
