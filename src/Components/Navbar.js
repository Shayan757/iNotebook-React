import React from 'react'
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Navbar() {

let navigate = useNavigate();

  const handlelogout = () =>{
    localStorage.removeItem('token')
    
    navigate("/Login")

  }
  return (
    <div>
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="/">INotebook</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/about">About</NavLink>
        </li>
      </ul>

      { localStorage.getItem ("token") ?(


<button type="button" className="btn btn-dark" onClick={handlelogout}>Logout</button>
    

  

    ) :    <ul className="nav justify-content-end">

      <ul className="navbar-nav me-auto mb-2 mb-lg-0">



        <li className="nav-item">
    <NavLink className="nav-link" aria-current="page" to="/SignUp">SignUp</NavLink>
  </li> 

      <li className="nav-item">
    <NavLink className="nav-link" to="/Login">Login</NavLink>
  </li>

  </ul>
</ul>}
        
    </div>
  </div>
</nav>
    </div>
  )
}
