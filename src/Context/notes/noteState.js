
import { useState } from "react";
import noteContext from "./noteContext";


const NoteState = (props) => {

  const host = "http://localhost:3000"

  // const notesInitial = []

  const [notes, setNotes] = useState([]);

// get a note //

const getNotes = async() => {

  //Api call//


  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: "GET", 
  
    headers: {
      "Content-Type": "application/json",
      "auth-token" : localStorage.getItem('token')
  
    },
     
  });


  const json = await response.json();
console.log(json);
  
setNotes(json);

  

}


  // Add a note //

  const addNote = async(title, description, tag) => {

    //Api call//

      const response = await fetch(`${host}/api/notes/addnotes`, {
        method: "POST", 
      
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem('token')
      
        },
        
        body: JSON.stringify({title,description,tag}), 
      });

      const note = await response.json();
      setNotes(notes.concat(note))


      console.log('Adding a note');

    

    

    

  }

  // Delete a note //

  const deleteNote = async (id) => {

    //Api call//

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "delete", 
    
      headers: {
        "Content-Type": "application/json",
        "auth-token" : localStorage.getItem('token')
    
      },
       
    });

    const json = await response.json();
      console.log(json); 


    console.log("Deleting the note + id" + id);

    const updatedNotes = notes.filter((note) => { return note._id !== id });

    setNotes(updatedNotes);
  }

  // Edit a note //

  const editNote = async(id, title, description, tag) => {

    //Api call//


      const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
        method: "PUT", 
      
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem('token')
      
        },
        
        body: JSON.stringify({title, description, tag}), 
      });
  

      const json = await response.json();
      console.log(json); 
 


    //Edit logic//

    let newNotes = JSON.parse(JSON.stringify(notes))

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];

      if (element._id === id) {

        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;

        break;
      }

    }

    setNotes(newNotes);
    console.log(newNotes);
  }


  return (

    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote , getNotes }}>

      {props.children}

    </noteContext.Provider>
  )

}

export default NoteState;



