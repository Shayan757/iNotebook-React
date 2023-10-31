import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';


const  SignUp =(props) =>{


  const [credentials, setCredentials] = useState({ name: "", email: "" , password: ""});

  let navigate = useNavigate();

const handleSign = async(e)=>{
  e.preventDefault();

  const response = await fetch("http://localhost:3000/api/auth/SignUp", {
    method: "POST", 
  
    headers: {
      "Content-Type": "application/json",
  
    },
    
    body: JSON.stringify({ name: credentials.name , email: credentials.email , password: credentials.password}), 

    
  });


  const json = await response.json();
  console.log(json);

  if(json.success){
    localStorage.setItem('token' , json.authtoken);
    navigate("/");
    props.showAlert( "success" , " Your Account has been created")
    }
    
  else{
    props.showAlert( "warning" , "Invalid Credentials")
  }
  
}

const onChange = (e)=>{
  setCredentials({...credentials , [e.target.name] : e.target.value})
}
  return (

        <div>

          <br />

          <h2> Create an account</h2>

         <br />

      <form>
      <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" onChange={onChange}/>
  </div>
  
  <button type="submit" className="btn btn-primary" onClick={handleSign}>SignUp</button>
</form>
    </div>
  )
}

export default SignUp;





// faraday123
// faraday15@gmail.com
// 098745