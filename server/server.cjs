require("dotenv").config();
const express = require("express");
const connectDB = require("./connectDB.cjs");
const Lists = require("./Lists.cjs");
const multer = require('multer');
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv").config();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8000;
//this is to connect the database
connectDB(); 
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());




//this is to fetch the data from mongoo db
app.get("/api/lists", async (req, res) => {
    try {
        const data = await Lists.find({});
        res.json(data);
    } catch(error){
        res.status(500).json({error: "Error Fetching Books."});
    };
});


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null,  uniqueSuffix + "-" + file.originalname);
  }
})

const upload = multer({ storage: storage })



app.post("/api/lists", upload.single("image"),async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.file);
        const newLists = new Lists({
            title: req.body.title,
            Date: req.body.Date,
            HreF: req.body.HreF,
            PostText: req.body.PostText,
            images: req.body.images,
        });

        await Lists.create(newLists);
        
        res.json("Submitted: ");
    } catch(error){
        alert("Error Creating: ", error);
        res.status(500).json({error: "Error Fetching Books."});
    };
});

// app.put("/api/lists/:id", async(req, res) =>{
//     try{
//         const {title, Date, HreF, PostText} = req.body;
//         const editLists = await Lists.findByIdAndUpdate(
//             req.params.id,{title,Date,HreF,PostText},{new: true}
//         );
//     }catch(e){
//         alert("Updating a lists error: ");
//         res.json("Error: ", e);
//     }
// });



app.use('/uploads', express.static('uploads'));
app.get("/",(req,res) => {
    res.send("port running")
});
app.listen(PORT, () => {
    console.log(`Server is Running on Port =  ${PORT}`);
});  