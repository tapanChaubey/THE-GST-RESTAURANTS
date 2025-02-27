const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cloudinary = require("./services/cloudinary.js");
dotenv.config({ path: path.join(__dirname, ".env") });
const FoodUser = require("./models/UserSchema.js");
const FoodData = require("./models/FoodSchema.js");
const Order=require("./models/OrederSchema.js");
const app = express();
cloudinary.init();
const stripe=require("stripe")("sk_test_51Qs0eP2fzaNCXv9FcqKSMO5PG3E764c1yxidpamGqaQmTVEsMUIuGtnsiyPxfNdxW9ITuygzYBRRQzWijjUnhvI300pDOikoj2");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json());

main()
    .then(() => console.log("Connected to MongoDB!"))
    .catch((err) => console.error("MongoDB connection unsuccessful", err));

async function main() {
    await mongoose.connect(process.env.MONGO_URI);
}

app.use(cors());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Middleware for verifying JWT
const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ msg: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ msg: "Invalid token" });
    }
};

// Routes
app.get("/", (req, res) => {
    res.send("Welcome to the API");
});

// Protected route: Only accessible with a valid token
app.get("/AllData", async (req, res) => {
    let data = await FoodData.find({});
    //console.log(data);
    res.send(data);
});

app.get("/addAdmin", async (req, res) => {
    res.render("add.ejs");
});

app.post("/addAdmin",  async (req, res) => {
    console.log("Admin Addition Process...");
    const { name, description, price, image } = req.body;

    try {
        const url = await cloudinary.uploadImage(image);
        console.log(url);
        const data = new FoodData({ name, description, price, image: url });
        await data.save();
        console.log(data);
        res.status(201).json({ message: "Admin added successfully", data });
    } catch (error) {
        res.status(500).json({ message: "Error adding admin", error });
    }
});

// User Login Route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await FoodUser.findOne({ email });

    if (!user) {
        return res.status(400).json({ msg: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ msg: "Incorrect password" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ msg: "Login successful", token, userId: user._id });
});

// User Signup Route
app.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    const existingUser = await FoodUser.findOne({ email });

    if (existingUser) {
        return res.status(400).json({ msg: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const createUser = new FoodUser({
        username: username,
        password: hashPassword,
        email: email,
    });

    const savedUser = await createUser.save();

    const token = jwt.sign({ id: savedUser._id, email: savedUser.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ msg: "Signup successful", token });
});

//Place Order route
app.post("/placeOrder", async (req, res) => {
    try {
      const { productId, userId, address, location, quantity, paymentMode, totalAmount } = req.body;
      console.log(req.body);
      const addOrder = new Order({
        productId,
        userId,
        address,
        location,
        quantity,
        paymentMode,
        totalAmount,
      });
       if(paymentMode=='COD'){
        const orderdata = await addOrder.save();
      res.status(201).json({ message: "Order successful!", order: orderdata });
       }
      else{
        const orderObj= await stripe.paymentIntents.create({
            amount:totalAmount*100,
            currency:'inr',
            automatic_payment_methods:{
               enabled:true,
            },
         })
         res.json({client_secret:orderObj.client_secret})
      }
    } catch (error) {
      console.error("Error placing order:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  });
  

// Server Start
app.listen(7777, (err) => {
    if (err) {
        console.log("Server failed to start!");
    } else {
        console.log("Server is running on port 7777!");
    }
});
