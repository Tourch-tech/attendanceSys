const express= require("express");
const app= express();

const mongoose= require("mongoose");
//connect db
mongoose.connect("mongodb+srv://library1:test123@mydblinc.aahzk.mongodb.net/myDBLinc?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true}).then((result)=>{
    if (result) {
        console.log("db connected");
        app.listen(4500,()=>{
            
                console.log("http://localhost:4500/");
            
        })
    }
}).catch((error)=>{
    console.log(error);
})
//addimnd the f***king model
const attendace = require("./models/attendance");



const session = require("express-session");
app.use(session({secret:"danielPatrick", saveUninitialized:true,resave:true}))

const bodyParser= require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");


app.get("/",(req,res)=>{
    attendace.find({},(err,data)=>{
        if (err) {
            console.log(err);
        }else{
            if (data) {
                res.render("home",{data});
            }
        }
    })
    
})

app.get("/signAttendance", (req,res)=>{
    res.render("register",{msg:""});
})
app.post("/signAttendance", (req,res)=>{
    const collection= req.body;
    const addStudent= new attendace
    if(collection.name==""  || collection.phoneNum==""){
        res.render("register",{msg:"fill complete form"})
    }else{
        addStudent.name= collection.name
        addStudent.phone = collection.phoneNum
        addStudent.date = Date()

        addStudent.save((err)=>{
            if (err){
                console.log(err);
            }else{
                console.log("Added");
                res.render("register",{msg: collection.name+" Added Successfully"});
            }
        })

    }
})