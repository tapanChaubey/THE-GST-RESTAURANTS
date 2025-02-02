const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const dotenv = require("dotenv");
const cloudinary = require("./services/cloudinary.js")
dotenv.config({ path: path.join(__dirname, ".env") });

const FoodUser=require("./models/UserSchema.js");
const FoodData=require("./models/FoodSchema.js");

const app = express();
cloudinary.init();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({extended:true, limit: '50mb'}));


main().then(()=>{
    console.log("connecting !");
}).catch(()=>{
    console.log("connection unsuceessfull")
})
async function main(){
    await mongoose.connect(process.env.MONGO_URI);
    
}
app.use(cors());
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
/////////////////////////////////////////
// admin route

app.get("/", (req, res) => {
    res.sendFile("urmom");
});
app.get("/AllData",async(req,res)=>{
let Data=await FoodData.find({});
 console.log(Data);
   res.send(Data);

})
app.get("/addAdmin",async(req,res)=>{
    res.render("add.ejs");
})
app.post("/addAdmin", async (req,res) => {
    console.log("urmom");
    const { name, description, price, image } = req.body;
    const url = await cloudinary.uploadImage(image);
    console.log(url);
    const data=await FoodData({name,description,price,image:url});
    await data.save();
    console.log(data);  
})







//user route
app.post("/login", async(req, res) => {
    const {email,password}=req.body;
    const exist=await FoodUser.findOne({email,password});
       if(exist){
        res.send({msg:"User allready exist"})
       }
       else{
        res.send({msg:"Password and Username Incorrect"})
       }
    console.log(req.body);
});

app.post("/signup", async (req, res) => {
    const { email, password, username } = req.body;
    const exist = await FoodUser.findOne({ email });
    console.log(req.body);

    if (exist) {
        res.send({ msg: "User already registered!" });
    } else {
        const userdata = new FoodUser({ email, username, password });
        await userdata.save();
        res.send({ msg: "User registered successfully!" });
    }
});
app.listen(7777,(err)=>{
    if(err){
        console.log("server is not started !");
    }
    else{
        console.log("server is started !");
    }
})