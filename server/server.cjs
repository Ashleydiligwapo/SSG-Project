require("dotenv").config();
const express = require("express");
const connectDB = require("./connectDB.cjs");
const Lists = require("./Lists.cjs");
const Merch = require("./Merch.cjs");
const { default: mongoose } = require("mongoose");
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8000;
//this is to connect the database
connectDB(); 
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

// const officersLists = mongoose.Schema({
//         name: String,
//         facebook: String,
//         image: String,
//         isActOfficer: Boolean,
//         isPresident: Boolean,
//         isVP: Boolean,
//         isGeneralSec: Boolean,
//         isTreasurer: Boolean,
//         isAdviser: Boolean,
//         isElected: Boolean,
//         isGovernors: Boolean,
//         isAppointed: Boolean
// });
// const Officers = mongoose.model('Officers',officersLists);

////////////   MERCH API /////////////////
app.get("/api/merches", (req, res) => {
    Merch.find()
    .then((result) => {
        res.json(result)
    }).catch((err) => {
        res.status(404).json(err);
    });
});
app.get("/api/merches/:id", (req, res) => {
    Merch.findById(req.params.id, req.body)
    .then((result) => {
        res.json(result)
    }).catch((err) => {
        res.status(404).json(err);
    });
});
app.post("/api/merches", (req, res) => {
    Merch.create(req.body)
    .then((result) => {
        res.json("Submitted:")
    }).catch((err) => {
        res.status(404).json(err);
    });
});
app.put("/api/merches/:id", (req, res) => {
    Merch.findByIdAndUpdate(req.params.id,  req.body)
    .then((result) => {
        res.json("Updated")
    }).catch((err) => {
        res.status(404).json(err);
    });
});
app.delete("/api/merches/:id", (req,res) => {
    Merch.findByIdAndRemove(req.params.id, req.body)
    .then((result) => {
        res.json("Removed")
    }).catch((err) => {
        res.status(404).json(err);
    });
});
////////////   MERCH API /////////////////

///////                  Lists data         ///////////
//this is to fetch the data from mongoo db
app.get("/api/lists", async (req, res) => {
    try {
        const data = await Lists.find({});
        res.json(data);
    } catch(error){
        res.status(500).json({error: "Error Fetching."});
    };
});
app.post("/api/lists" ,async (req, res) => {
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
      
        res.status(500).json({error: "Error Fetching Books."});
    };
});

/////////////////        to edit a form in home page  //////////////////////
// app.put("/api/lists/:id" ,async (req, res) => {
//    const { id } = req.params; 
//     try {
//         const updatedLists = {
//             title: req.body.title,
//             Date: req.body.Date,
//             HreF: req.body.HreF,
//             PostText: req.body.PostText,
//             images: req.body.images,
//         }
//         await Lists.findByIdAndUpdate(id, updatedLists); 
//         res.json("Submitted: ");

//     } catch(error){
//         alert("Error Creating: ", error);
//         res.status(500).json({error: "Error Fetching Books."});
//     };
// });

app.delete('/api/lists/:id', (req, res) => {
    Lists.findByIdAndRemove(req.params.id, req.body)
    .then((result) => {
        res.json("List deleted.");
    }).catch((err) => {
        res.status(404).json({err});
    });

    // const { id } = req.params;
    // try {
    //     const deleteList = await Lists.findByIdAndRemove(id);
    //     res.json("Delete this form? " + req.body.ListsId);
    //     if(!deleteList){
    //         res.json("List not found");
    //     };
    //     res.status(200).json(deleteList);
    // } catch (error) {
    //     res.json("Error deleting file.");
    // }
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

//////////////////////////////////////////////////////////////////////


app.get("/",(req,res) => {
    res.send("port running")
});
app.listen(PORT, () => {
    console.log(`Server is Running on Port =  ${PORT}`);
});  