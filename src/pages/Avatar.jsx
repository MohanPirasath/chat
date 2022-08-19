// // import React, { useState, useEffect } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import "./register.css";
// // import { ToastContainer, toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import axios from "axios";
// // import { avatarRoute } from "../utils/API";
// // import { Buffer } from "buffer";
// // import { Avatar } from '@mui/material';

// // function Avatars() {
// //   const api = "http://api.multiavatar.com/45678945";
// //   const navigate = useNavigate();
// //   const [avatar, setavatar] = useState([]);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [selectedAvatar, setSelectedAvatar] = useState(undefined);
// //   useEffect(() => {
// //     try {
// //       async function AM() {
// //         const data = [];
// //         for (let i = 0; i < 4; i++) {
// //           const image = await axios.get(
// //             `${api}/${Math.round(Math.random() * 1000)}`
// //           );
// //           const buffer = new Buffer(image.data);
// //           data.push(buffer.toString("base64"));
// //         }
// //         setavatar(data);
// //         setIsLoading(false);
// //       }
// //       AM();
// //     } catch (error) {
// //       console.log(error, "on avarat");
// //     }
// //   }, []);

// //   const Toastifys = {
// //     position: "bottom-right",
// //     autoClose: 8000,
// //     pauseOnHover: true,
// //     draggable: true,
// //     theme: "dark",
// //   };
// //   const setProfilepic = async (e) => {};
// // //   const [user,setuser]=useState(JSON.parse(localStorage.getItem("chat-app-user")))
// // const user = localStorage.getItem("chat-app-user")
// //   return (
// //     <>
// //       <div>
// //         <div className="title-container">
// //           <h1>Pick an avatar as your profile picture</h1>
// //         </div>
// //         <div className="avatars">
// //           {avatar.map((avatar, index) => {
// //             return (
// //               <div
// //                 key={index}
// //                 className={`avatar${
// //                   selectedAvatar === index ? "selected" : ""
// //                 }`}
// //               >
// //                 <img
// //                   src={`data:image/svg+xml;base64,${avatar}`}
// //                   alt="avatar is not available"
// //                   onClick={() => setSelectedAvatar(index)}
// //                 />

// //               </div>
// //             );
// //           })}
// // <Avatar alt=""
// // // onClick={() => setSelectedAvatar(index)}
// // > m</Avatar>

// //         </div>
// //       </div>
// //       <ToastContainer />
// //     </>
// //   );
// // }

// // export default Avatars;





// import React, { useEffect, useState } from "react";
// // import styled from "styled-components";
// import axios from "axios";
// import { Buffer } from "buffer";
// // import loader from "../assets/loader.gif";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
// import { avatarRoute } from "../utils/API.js";
// import "./Avatar.css"
// export default function SetAvatar() {
//   const api = `https://api.multiavatar.com/4645646`;
//   const navigate = useNavigate();
//   const [avatars, setAvatars] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedAvatar, setSelectedAvatar] = useState(undefined);
//   const toastOptions = {
//     position: "bottom-right",
//     autoClose: 8000,
//     pauseOnHover: true,
//     draggable: true,
//     theme: "dark",
//   };

//   useEffect( () => {
//     async function AM(){
//     if (!localStorage.getItem("chat-app-user"))
//       navigate("/login");
//     }
//     AM()
//   }, []);

//   const setProfilePicture = async () => {
//     if (selectedAvatar === undefined) {
//       toast.error("Please select an avatar", toastOptions);
//     } else {
//       const user = await JSON.parse(
//         localStorage.getItem("chat-app-user")
//       );

//       const { data } = await axios.post(`${avatarRoute}/${user._id}`, {
//         image: avatars[selectedAvatar],
//       });

//       if (data.isSet) {
//         user.isAvatarImageSet = true;
//         user.avatarImage = data.image;
//         localStorage.setItem(
//           process.env.REACT_APP_LOCALHOST_KEY,
//           JSON.stringify(user)
//         );
//         navigate("/");
//       } else {
//         toast.error("Error setting avatar. Please try again.", toastOptions);
//       }
//     }
//   };

//   useEffect( () => {
//     async function AN(){
//     const data = [];
//     for (let i = 0; i < 4; i++) {
//       const image = await axios.get(
//         `${api}/${Math.round(Math.random() * 1000)}`
//       );
//       const buffer = new Buffer(image.data);
//       data.push(buffer.toString("base64"));
//     }
//     setAvatars(data);
//     setIsLoading(false);
//   }
//   AN()
//   }, []);
//   return (
//     <>
//       {/* {isLoading ? ( */}
//         {/* <div>
//           <img src={loader} alt="loader" className="loader" />
//         </div> */}
//       {/* ) : ( */}
//         <div>
//           <div className="title-container">
//             <h1>Pick an Avatar as your profile picture</h1>
//           </div>
//           <div className="avatars">
//             {avatars.map((avatar, index) => {
//               return (
//                 <div
//                   className={`avatar ${
//                     selectedAvatar === index ? "selected" : ""
//                   }`}
//                 >
//                   <img
//                     src={`data:image/svg+xml;base64,${avatar}`}
//                     alt="avatar"
//                     key={avatar}
//                     onClick={() => setSelectedAvatar(index)}
//                   />
//                 </div>
//               );
//             })}
//           </div>
//           <button onClick={setProfilePicture} className="submit-btn">
//             Set as Profile Picture
//           </button>
//           <ToastContainer />
//         </div>
//       {/* )} */}
//     </>
//   );
// }

// // const Container = styled.div`
// //   display: flex;
// //   justify-content: center;
// //   align-items: center;
// //   flex-direction: column;
// //   gap: 3rem;
// //   background-color: #131324;
// //   height: 100vh;
// //   width: 100vw;
// //   .loader {
// //     max-inline-size: 100%;
// //   }
// //   .title-container {
// //     h1 {
// //       color: white;
// //     }
// //   }
// //   .avatars {
// //     display: flex;
// //     gap: 2rem;
// //     .avatar {
// //       border: 0.4rem solid transparent;
// //       padding: 0.4rem;
// //       border-radius: 5rem;
// //       display: flex;
// //       justify-content: center;
// //       align-items: center;
// //       transition: 0.5s ease-in-out;
// //       img {
// //         height: 6rem;
// //         transition: 0.5s ease-in-out;
// //       }
// //     }
// //     .selected {
// //       border: 0.4rem solid #4e0eff;
// //     }
// //   }
// //   .submit-btn {
// //     background-color: #4e0eff;
// //     color: white;
// //     padding: 1rem 2rem;
// //     border: none;
// //     font-weight: bold;
// //     cursor: pointer;
// //     border-radius: 0.4rem;
// //     font-size: 1rem;
// //     text-transform: uppercase;
// //     &:hover {
// //       background-color: #4e0eff;
// //     }
// //   }
// // `;
// // Footer
// // © 2022 GitHub, Inc.
// // Footer navigation
// // Terms
// // Privacy
// // Security
// // Status
// // Docs
// // Contact GitHub
// // Pricing
// // API
// // Training
// // Blog
// // About
// // You have no unread notifications