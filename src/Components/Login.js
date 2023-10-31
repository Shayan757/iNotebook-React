import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';
// import  {Swal} from 'sweetalert2'




const Login = (props) =>{

    const [credentials, setCredentials] = useState({email: "" , password: ""});

    let navigate = useNavigate();

    const handlelogin = async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST", 
      
        headers: {
          "Content-Type": "application/json",     
        },
        
        body: JSON.stringify({email: credentials.email , password: credentials.password}), 
      });
    
      const json = await response.json();
      console.log(json);

      if(json.success){
        localStorage.setItem('token' , json.authtoken);
        navigate("/");
        props.showAlert(  "success" ,  "Login Succcessfully" )
        }
       else{
        props.showAlert( "warning", "Please login with correct credentials!  " )
       } 
       
     
    }
    
    const onChange = (e) =>{
        setCredentials({...credentials , [e.target.name]: e.target.value})
    }
    
  return (
    <div>
       
       <br />

      <h2> Login </h2>

      <br />

      <form>
      
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control"  id="email" name="email" onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control"  onChange={onChange} id="password" name="password"/>
  </div>
  
  <button type="submit" className="btn btn-primary" onClick={handlelogin}>Login</button>
</form>
    </div>
  )
}


export default Login;
