import  {useState} from "react";
import './App.css';
import Navbar from './Components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";

import Alert from "./Components/Alert";
import NoteState from './Context/notes/noteState.js';





function App() {

  
  const [alert, setAlert] = useState(null);
  // const showAlert = (message,type)=>{
  //   setAlert({
  //     msg:message,
  //     type: type
  //   })
  //   setTimeout(() => {
  //     setAlert(null);
  //   }, 2000);
  // }
  const showAlert = (icon, text) => {
    setAlert({ icon, text  });
  };

  return (

    <>
<NoteState>

<Router>

    <Navbar/>

    <div className="btn btn-primary d-none">

    <Alert alert = {alert}/>

    </div>
    
    
    

    <div className="container">

      <Routes>

      <Route path="/" element={<Home showAlert={showAlert} />} />

      <Route exact path="/about" element={<About />} /> 

      <Route exact path="/SignUp" element={<SignUp showAlert={showAlert}/>} />

      <Route exact path="/Login" element={<Login showAlert={showAlert}/>} />

       
      </Routes>

      </div>

      </Router>
  
      </NoteState>

    </>
  );

  
}

export default App;
