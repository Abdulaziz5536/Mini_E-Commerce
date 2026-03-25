import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/auth-style.css';


export default function Login(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [message,setMessage] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    const res = await fetch("http://localhost:3000/login", {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({email,password})
    })
    const data = await res.json();

  if(res.ok){
     localStorage.setItem("userInfo", JSON.stringify(data));
      setMessage(data.message);
       if(data.role === "admin"){ 
        setTimeout(() => navigate('/admin'),1000); 
      }
      else {
         setTimeout(() => navigate("/home"),1000); 
        }
       }
       else{
         setMessage(data.error); 

       } 
    
  
  }

  return(
    <>

 <div className="login">
  <h1>Login</h1>
    <br />
    <input placeholder="email" onChange={e => setEmail(e.target.value)}/>
    <br />
    <input id="login-psw-input" type="password" placeholder="password" onChange={e => setPassword(e.target.value)}/> 
    <br />
    <button onClick={login}>Login</button>
    <br />
    <button id="register-button" onClick={() => navigate('/register')}>Create account</button>
    <br />
    <br />
    
    <hr />
    <h2>{message}</h2>

 </div>
    
    </>
  )
}