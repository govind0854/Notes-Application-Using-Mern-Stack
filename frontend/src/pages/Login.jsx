import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const navigate = useNavigate();

const login = async () => {

try{

const res = await axios.post(
"http://localhost:5000/api/auth/login",
{email,password}
);

localStorage.setItem("token",res.data.token);

navigate("/dashboard");

}catch(err){

alert("Login failed");

}

};

return(

<div className="auth-wrapper">

<div className="auth-card">

<h2>Welcome Back</h2>

<input
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button onClick={login}>
Login
</button>

<p>
Don't have account?
</p>

</div>

</div>

);

};

export default Login;