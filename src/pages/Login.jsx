import React, { useState, useEffect,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Container,Col,Row} from "react-bootstrap"
import "./register.css";
import { useLoginUserMutation } from "../utils/API";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginrRoute } from "../utils/API";
import { AppContext } from "../context/appContext";
// 1:13:03

function Login() {
  const navigate = useNavigate();
  const {socket}=useContext(AppContext)
  const [email,setemail]=useState()
  const [password,setpassword]=useState()

const [loginUser,{isLoading,err}]= useLoginUserMutation()

  // const [values, setvalues] = useState({
  //   username: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  // });

  const Toastifys = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  // const handleValidation = () => {
  //   const { email, password } = values;
  //   if (password === "") {
  //     toast.error("password is required", Toastifys);
  //     return false;
  //   } else if (email === "") {
  //     toast.error("Email is required", Toastifys);
  //     return false;
  //   }

  //   return true;
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // if (handleValidation()) {
    //   const { password, email } = values;
    //   const { data } = await axios.post(loginrRoute, {
    //     email,
    //     password,
    //   });

    //   if (data.status === false) {
    //     toast.error(data.msg, Toastifys);
    //   }
    //   if (data.status === true) {
    //     localStorage.setItem("chat-app-user", JSON.stringify(email));
    //     navigate("/");
    //   }
    // }

loginUser({email,password}).then(({data})=>{
  if(data){
    //socket
    socket.emit("new-user")
    navigate("/chat")
  }
})


  };

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      // navigate("/")
    }
  }, []);

  // const handleChange = (event) => {
  //   setvalues({ ...values, [event.target.name]: event.target.value });
  // };
  // console.log(values)
  return (
    
    
    <div className="regform">
      <form onSubmit={(event) => handleSubmit(event)} className="forms">
        <div className="brand">
          {/* <img src='#' alt='logo' /> */}
          <h1>Login</h1>
        </div>
        {/* <input type="text" placeholder='UserName' name='username' onChange={(e)=> handleChange(e)} /> */}
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={(e) => setemail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => setpassword(e.target.value)}
          required

        />
        {/* <input type="password" placeholder='Confirm Password' name='confirmPassword' onChange={(e)=> handleChange(e)} /> */}
        <button type="submit" className="reg_btn">
          Login
        </button>
        <span>
          Don't have an account ? <Link to="/register">signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
    
   
  );
}

export default Login;
