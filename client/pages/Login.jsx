import React, { useState } from "react";
import loginRequest from "../api/loginRequest";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const Login = ({ setUserId }) => {
  // useState to update and track the input fields from the login page
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  // const [user, setUser] = useState('');    // IMPORTANT NOTE for future:  Documented this out and then moved useState up to Navbar for useContext purposes & then email/setEmail passed down here as props
  const navigate = useNavigate();

  // handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    // loginRequest(email, password)
    //   .then(() => {
    //     navigate('/dashboard');
    //   })
    //   .catch((err) => {
    //     setError(err.message);
    //   });

    try {
      const response = await axios.post(`/api/users/login`, {
        email,
        password,
      });
      // console.log('res.data: ', response.data)
      // const currUser =`${response.data.firstname} ${response.data.lastname}`
      // console.log(currUser)
      // setUser(currUser)
      setUserId(response.data._id);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid Email/Password");
      console.log("err:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      {/* display error message if error */}
      <div className="text-red-700">{error}</div>
      {/* useState to track the data in each input field */}
      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center justify-center"
      >
        <input
          type="email"
          placeholder="Email:"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password:"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
        {/* <Link to="/dashboard"><button>Login</button></Link> */}
      </form>
      <div>
        {/* <Link to={{pathname: '/dashboard'}} ><button>Dashboard</button></Link> */}
        <br />
        Don't have an account? <br />
        <Link to="/signup" className="underline text-tertiary-500">
          Sign up right here!
        </Link>
      </div>
    </div>
  );
};
