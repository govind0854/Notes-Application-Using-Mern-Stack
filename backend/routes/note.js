const express = require("express");
const Note = require("../models/Note");
const authMiddleware = require("../middleware/authMiddleware");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();


// CREATE NOTE
router.post("/", authMiddleware, async (req,res)=>{

  try{

    const {title,content,category,reminder} = req.body;

    const note = new Note({

      title,
      content,
      category,
      reminder,
      shareId:uuidv4(),
      user:req.user.id

    });

    await note.save();

    res.json(note);

  }catch(err){
    res.status(500).json({message:"Server error"});
  }

});


// GET ACTIVE NOTES
router.get("/", authMiddleware, async(req,res)=>{

  const notes = await Note.find({
    user:req.user.id,
    deleted:false
  });

  res.json(notes);

});


// GET RECYCLE BIN
router.get("/recycle", authMiddleware, async(req,res)=>{

  const notes = await Note.find({
    user:req.user.id,
    deleted:true
  });

  res.json(notes);

});


// UPDATE NOTE
router.put("/:id", authMiddleware, async(req,res)=>{

  const {title,content,category,reminder} = req.body;

  const note = await Note.findById(req.params.id);

  note.title = title;
  note.content = content;
  note.category = category;
  note.reminder = reminder;

  await note.save();

  res.json(note);

});


// MOVE TO RECYCLE BIN
router.delete("/:id", authMiddleware, async(req,res)=>{

  const note = await Note.findById(req.params.id);

  note.deleted = true;

  await note.save();

  res.json({message:"Moved to recycle bin"});

});


// RESTORE NOTE
router.put("/restore/:id", authMiddleware, async(req,res)=>{

  const note = await Note.findById(req.params.id);

  note.deleted = false;

  await note.save();

  res.json(note);

});


// SHARE NOTE
router.get("/share/:shareId", async(req,res)=>{

  const note = await Note.findOne({
    shareId:req.params.shareId
  });

  res.json(note);

});

module.exports = router;