const userService = require("../services/signup.js");

async function createUser(req, res) {
    try {
        const userdata = req.body;
         console.log(req.body);
        // Call createUser from userService correctly
        const user = await userService.createUser(userdata);

        console.log("User Created:", user);
        return res.status(201).json({ message: "User successfully created", user });

    } catch (err) {
        console.error("Error in user signup:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { createUser };
