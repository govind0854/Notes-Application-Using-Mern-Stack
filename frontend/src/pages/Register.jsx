import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

 const register = async () => {

  try{

    await axios.post(
      "http://localhost:5000/api/auth/signup",
      {
        name,
        email,
        password
      }
    );

    alert("Registration successful");

    navigate("/login");

  }catch(err){

    console.log(err.response?.data || err.message);

    alert("Register failed");

  }

};
  return (

    <div className="auth-wrapper">

      <div className="auth-card">

        <h2>Signup</h2>

        <input
        placeholder="Username"
        onChange={(e)=>setName(e.target.value)}
        />

        <input
        placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
        />

        <input
        type="password"
        placeholder="Password"
        onChange={(e)=>setPassword(e.target.value)}
        />

        <button onClick={register}>
          Signup
        </button>

        <p>
          Already have account?
          <Link to="/"> Login</Link>
        </p>

      </div>

    </div>

  );
};

export default Register;