import React, { useContext , useEffect, useRef, useState } from 'react'
import noteContext from '../Context/notes/noteContext';
import Noteitems from './Noteitems';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';
// import EditNote from './EditNote';

const Notes = (props) => {

  let navigate = useNavigate(); 

  const context = useContext(noteContext);
  const { notes, getNotes , editNote} = context;

  useEffect(() => {

      if (localStorage.getItem('token')){

        getNotes();

      }
       
else{

  navigate("/Login");
}
       // eslint-disable-next-line//
      
      //  console.log(localStorage.getItem('token'));
  }, []);

  const [note,setNote] = useState({id: "" , etitle : "" , edescription : "" , etag : ""})


  const ref = useRef(null)
  const refClose = useRef(null)

 const updateNote = (currentNote)=>{
  ref.current.click();
  setNote({id : currentNote._id , etitle : currentNote.title , edescription:currentNote.description , etag: currentNote.tag});
  
 }

 const handleClick = (e) =>{

  // e.preventDefault();

  refClose.current.click();
  editNote(note.id , note.etitle , note.edescription , note.etag)
  props.showAlert("success" , "updated Note")
}

 const onChange = (e) =>{
    setNote({...note , [e.target.name]: e.target.value})
}



// const deleteNote = (id) =>{

//   deleteNote()
//   props.showAlert("danger" , "Successfully deleted !")
// }

  return (
    <>

      <AddNote showAlert = {props.showAlert}/>

    
 <button ref = {ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body"> 
       <form className="mb-3">
<div className="mb-3">
<label htmlFor="title" className="form-label">Title</label>
<input type="text" className="form-control" id="etitle" name ="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange}/>
</div>
<div className="mb-3">
<label htmlFor="description" className="form-label">description</label>
<input type="text" className="form-control" name="edescription" id="edescription" value={note.edescription} onChange={onChange}/>
</div>
<div className="mb-3">
<label htmlFor="tag" className="form-label">tag</label>
<input type="text" className="form-control" name="etag" id="etag" value={note.etag} onChange={onChange}/>
</div>
</form> 

       </div>
      <div className="modal-footer">
        <button type="button" ref = {refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled = {note.etitle.length<3 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
      </div>
    </div>
  </div>
</div> 
      {/* <EditNote/> */}
      <div className=" row my-3">


        <h1>Your Notes</h1>

        <div className='container mx-3'>

        {notes.length===0 ? "No notes to display" : ""}

        </div>

        {notes.map((note) => {
          return <Noteitems key = {note._id} note={note} showAlert = {props.showAlert}  updateNote = {updateNote} />
        })}

      </div>

    </>
  )
}

export default Notes;