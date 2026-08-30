if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8080;
const mongo_url = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/airbnb';
const path = require("path");
const ejs_Mate = require("ejs-mate");
const methodOverride = require('method-override')
const ExpressError =  require("./ExpressError.js");


app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"/public")));
app.engine("ejs",ejs_Mate);



//Error Handeling Function .......

function asyncwrap(fn){
   return (req,res,next)=>{
       fn(req,res,next).catch((err)=>next(err));
   };
}



// Database connect.......
main().then(() => {
    console.log("Database connected");
})
.catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(mongo_url, { 
        serverSelectionTimeoutMS: 5000 // Fails fast instead of hanging Vercel
    });
}

// Database listing schema.............
const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        default:"https://images.unsplash.com/photo-1626374295803-a333cfeca51b?q=80&w=1164&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        
        set: (v) => v === "" ? "https://images.unsplash.com/photo-1626374295803-a333cfeca51b?q=80&w=1164&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v 
    },
    price: {
        type: Number, 
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    rating:{
        type: Number,
        default:0.0,
    },
    popular:{
        type:Boolean,
        default:false,
    }
});

const Listing = mongoose.model("listing", listingSchema);



app.get("/", asyncwrap( async(req, res) => {
    let alllistings = await Listing.find();
    res.render("listings/root.ejs", { alllistings }); 
}));
app.get("/new", asyncwrap( async(req, res) => {
    res.render("listings/new.ejs"); 
}));

app.get("/popular", asyncwrap( async(req, res) => {
    let alllistings = await Listing.find({popular:true});
    res.render("listings/root.ejs", { alllistings }); 
}));

app.get("/highrated", asyncwrap( async(req, res) => {
    let alllistings = await Listing.find({rating:{$gt:4.0}});
    res.render("listings/root.ejs", { alllistings }); 
}));





//NEW DATA INPUT................    
app.post("/new", asyncwrap( async(req,res,next)=>{
    let listing = new Listing(req.body);
    if(!listing.title){
        return next(new ExpressError(400,"Title is Not Present"));
    }
    if(!listing.description){
        return next(new ExpressError(400,"Description is Not Present"));
    }
    if(!listing.price){
        return next(new ExpressError(400,"Price is Not Present"));
    }
    if(!listing.location){
        return next(new ExpressError(400,"Location is Not Present"));
    }
    if(!listing.country){
        return next(new ExpressError(400,"Country is Not Present"));
    }
    await listing.save();
    res.redirect("/");
}));



//SHOW SPECIFIC POST..............
app.get("/show/:id", asyncwrap( async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id); 
    res.render("listings/show.ejs",{listing})
}));




//EDIT SPECIFIC POST...............
app.get("/edit/:id", asyncwrap( async(req, res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id); 
    res.render("listings/edit.ejs",{listing});  
}));

app.patch("/edit/:id", asyncwrap(async(req,res,next)=>{
    let {id} = req.params;
    let listingData = req.body;
    if(!listingData.title || !listingData.description || !listingData.price || !listingData.location || !listingData.country){
        return next(new ExpressError(400, "All fields are required"));
    }
    await Listing.findByIdAndUpdate(id, req.body, { runValidators: true });
    res.redirect(`/show/${id}`);
}));





//DELETE SPECIFIC POST...............
app.delete("/delete/:id", asyncwrap( async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/");
}));



//SEARCH POSTS............
app.get("/location", asyncwrap( async(req, res) => {
    let location = req.query.location;
    let alllistings = await Listing.find({ location: { $regex: new RegExp(`^${location}$`, "i") } });
    if(alllistings.length === 0 ){
         alllistings = await Listing.find({});
    }
    res.render("listings/root.ejs", { alllistings }); 
}));





app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

/* Error Handeling Middleware.......... */
app.use((err,req,res,next)=>{
    console.error(err.message); // Only print the message to avoid huge stack traces
    let {status=500,message = "Some Error Occurred"} = err;
    res.render("listings/error.ejs",{status,message});
})
if (process.env.NODE_ENV !== "production") {
    app.listen(port, () => {
        console.log(`Server is listening to port ${port} => http://localhost:${port}/`);
    });
}

module.exports = app;