import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";

const RecycleBin = () => {

  const [notes,setNotes] = useState([]);

  const token = localStorage.getItem("token");

  const API = "http://localhost:5000/api/notes/recycle";



  const fetchDeletedNotes = async () => {

    try{

      const res = await axios.get(API,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });

      setNotes(res.data);

    }catch(err){

      console.log(err);

    }

  };


  useEffect(()=>{

    fetchDeletedNotes();

  },[]);



  const restoreNote = async (id) => {

    try{

      await axios.put(
        `http://localhost:5000/api/notes/restore/${id}`,
        {},
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      fetchDeletedNotes();

    }catch(err){

      console.log(err);

    }

  };


  return (

    <div>

      <Navbar/>

      <h2 style={{textAlign:"center"}}>Recycle Bin</h2>

      {notes.map(note => (

        <div key={note._id} className="note-card">

          <h3>{note.title}</h3>
          <p>{note.content}</p>

          <button onClick={()=>restoreNote(note._id)}>
            Restore
          </button>

        </div>

      ))}

    </div>

  );

};

export default RecycleBin;