import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register(){
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [message,setMessage] = useState('');
  const navigate = useNavigate();

  const register = async () => {
    const res = await fetch("http://localhost:3000/register", {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({name,email,password})
    })

    const data = await res.json();

    if(res.ok){
      setMessage(data.message);
      setTimeout(() => navigate('/login'),1000);

    }else{
      
        setMessage(data.error);
     
    }
  }

  return(
    <>
    <div className="register">
      <h1>Register</h1>
    <br />
    <input placeholder="name" onChange={e => setName(e.target.value)}/>
    <br />
    <input id="register-eml-input" placeholder="email" onChange={e => setEmail(e.target.value)}/>
    <br />
    <input id="register-psw-input" type="password" placeholder="password" onChange={e => setPassword(e.target.value)}/>
    <br />
    <button onClick={register}>Sign up</button>
    <br />
    <button id="have-an-account-btn" onClick={() => navigate('/login')}>already have an account</button>
     <br />
     <br />
     <hr />
      <h2>{message}</h2> 
    </div>
    
    
    </>
  )


}