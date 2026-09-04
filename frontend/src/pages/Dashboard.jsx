import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";

const Dashboard = () => {

  const [notes,setNotes] = useState([]);

  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [category,setCategory] = useState("Work");
  const [reminder,setReminder] = useState("");

  const [search,setSearch] = useState("");
  const [filter,setFilter] = useState("");

  const token = localStorage.getItem("token");

  const API = "http://localhost:5000/api/notes";


  const fetchNotes = async () => {

    try{

      const res = await axios.get(API,{
        headers:{ Authorization:`Bearer ${token}` }
      });

      setNotes(res.data);

    }catch(err){
      console.log(err);
    }

  };

  useEffect(()=>{
    fetchNotes();
  },[]);



  // REMINDER SYSTEM

  useEffect(()=>{

    notes.forEach(note=>{

      if(note.reminder){

        const reminderTime = new Date(note.reminder).getTime();
        const now = new Date().getTime();

        const timeLeft = reminderTime - now;

        if(timeLeft > 0){

          setTimeout(()=>{
            alert("Reminder: " + note.title);
          },timeLeft);

        }

      }

    });

  },[notes]);



  const addNote = async () => {

    if(!title || !description){
      alert("Enter title and description");
      return;
    }

    try{

      await axios.post(
        API,
        {
          title,
          content:description,
          category,
          reminder
        },
        {
          headers:{ Authorization:`Bearer ${token}` }
        }
      );

      setTitle("");
      setDescription("");
      setReminder("");

      fetchNotes();

    }catch(err){

      alert("Error adding note");

    }

  };



  const deleteNote = async (id) => {

    try{

      await axios.delete(
        `${API}/${id}`,
        {
          headers:{ Authorization:`Bearer ${token}` }
        }
      );

      fetchNotes();

    }catch(err){
      console.log(err);
    }

  };



  const togglePin = (id)=>{

    const updated = notes.map(note =>
      note._id === id ? {...note,pinned:!note.pinned} : note
    );

    setNotes(updated);

  };



  // SEARCH + FILTER

  const filteredNotes = notes
  .filter(note =>
    note.title.toLowerCase().includes(search.toLowerCase())
  )
  .filter(note =>
    filter ? note.category === filter : true
  );



  return (

    <div>

      <Navbar/>

      {/* ADD NOTE */}

      <div className="add-note">

        <input
        placeholder="Title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        />

        <textarea
        placeholder="Description"
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
        />

        <select
        value={category}
        onChange={(e)=>setCategory(e.target.value)}
        >

          <option value="Work">Work</option>
          <option value="Study">Study</option>
          <option value="Personal">Personal</option>
          <option value="Ideas">Ideas</option>

        </select>

        <input
        type="datetime-local"
        value={reminder}
        onChange={(e)=>setReminder(e.target.value)}
        />

        <button onClick={addNote}>
          Add Note
        </button>

      </div>



      {/* SEARCH BAR */}

      <div style={{width:"60%",margin:"auto",marginBottom:"15px"}}>

        <input
        style={{
          width:"100%",
          padding:"10px",
          borderRadius:"6px",
          border:"1px solid #ccc"
        }}
        placeholder="Search notes..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        />

      </div>



      {/* CATEGORY FILTER */}

      <div className="filter">

        <select
        value={filter}
        onChange={(e)=>setFilter(e.target.value)}
        >

          <option value="">All Categories</option>
          <option value="Work">Work</option>
          <option value="Study">Study</option>
          <option value="Personal">Personal</option>
          <option value="Ideas">Ideas</option>

        </select>

      </div>



      {/* NOTES GRID */}

      <div className="notes-grid">

        {filteredNotes.map(note => (

          <NoteCard
            key={note._id}
            note={note}
            deleteNote={deleteNote}
            togglePin={togglePin}
          />

        ))}

      </div>

    </div>

  );

};

export default Dashboard;