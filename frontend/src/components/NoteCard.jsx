import { useState } from "react";

const NoteCard = ({note,deleteNote,togglePin}) => {

  const [open,setOpen] = useState(false);

  const shareNote = () => {

    const url =
    window.location.origin + "/share/" + note.shareId;

    navigator.clipboard.writeText(url);

    alert("Share link copied");

  };

  const reminderTime = note.reminder
  ? new Date(note.reminder).toLocaleString()
  : null;

  return(

    <div className={`note-card ${note.pinned ? "pinned" : ""}`}>

      <h3 onClick={()=>setOpen(!open)}>
        {note.title}
      </h3>

      {open && <p>{note.content}</p>}

      <div className="badge">
        {note.category}
      </div>

      {reminderTime && (

        <p style={{fontSize:"12px",color:"#777",marginTop:"5px"}}>
        ⏰ {reminderTime}
        </p>

      )}

      <div className="note-actions">

        <button
        className="pin-btn"
        onClick={()=>togglePin(note._id)}
        >
        Pin
        </button>

        <button
        className="share-btn"
        onClick={shareNote}
        >
        Share
        </button>

        <button
        className="delete-btn"
        onClick={()=>deleteNote(note._id)}
        >
        Delete
        </button>

      </div>

    </div>

  );

};

export default NoteCard;