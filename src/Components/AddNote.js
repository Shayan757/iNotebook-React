import React, {useContext,useState} from 'react'
import noteContext from '../Context/notes/noteContext';

const AddNote = (props) => {


    const [note,setNote] = useState({title : "" , description : "" , tag : ""})


    const context = useContext(noteContext);
    const {addNote} = context;

    const handleClick = (e) =>{

      e.preventDefault();
        addNote(note.title , note.description , note.tag);
        setNote({title : "" , description : "" , tag : ""})
        props.showAlert ("success" , "Successfully Added !")
    }

    const onChange = (e) =>{
      setNote({...note , [e.target.name]: e.target.value})
    }



  return (
    <div>
<h1 className="mb-3"> Add a Note</h1>

<form className="mb-3">
<div className="mb-3">
<label htmlFor="title" className="form-label">Title</label>
<input type="text" className="form-control" value={note.title} id="title" name ="title" aria-describedby="emailHelp" onChange={onChange} minLength={3} required/>
</div>
<div className="mb-3">
<label htmlFor="description" className="form-label">description</label>
<input type="text" className="form-control" value={note.description} name="description" id="description" onChange={onChange} minLength={5} required/>
</div>
<div className="mb-3">
<label htmlFor="tag" className="form-label">tag</label>
<input type="text" className="form-control" value={note.tag} name="tag" id="tag" onChange={onChange}/>
</div>
<button disabled = {note.title.length<3 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Notes</button>
</form>

    </div>
  )
}


export default AddNote;