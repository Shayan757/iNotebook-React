import React, {useContext} from 'react'
import noteContext from '../Context/notes/noteContext';

const Noteitems = (props) => {

  const {note, updateNote} = props;
  const context = useContext(noteContext);
  const {deleteNote} = context;



  return (
    <div className='col-md-3' >

      <div className="card my-3">
  <div className="card-body">
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text">{note.description} </p>
    <i className="fa-solid fa-trash mx-3" onClick={()=>{deleteNote(note._id); 
    props.showAlert ("success" , "Successfully deleted")}}></i>
    <i className="fa-solid fa-pen-to-square"onClick={()=>{updateNote(note)}}></i>
  </div>
  
</div>
      
    </div>
  )
}


export default Noteitems;