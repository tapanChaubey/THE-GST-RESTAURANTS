const FoodUser = require("../models/UserSchema");
const bcrypt = require("bcrypt");

async function createUser(UserData) {
    const { username, email, password } = UserData;
     
    
    // Await the password hashing
    const hashPassword = await bcrypt.hash(password, 10);

    const createUsers = new FoodUser({
        username: username,
        password: hashPassword, // Use hashed password
        email: email
    });

    const savedUser = await createUsers.save();
    return savedUser;
}

module.exports = { createUser };
