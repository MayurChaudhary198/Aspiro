const User  = require('../models/User.js');
const bcrypt = require('bcryptjs');

const registerUser  = async (req, res) =>{
    try {
        const {name, email, password, role} = req.body;

        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({ message: 'User already exists' });
        } 

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully' });  
    } catch (error) {
        console.error('Error in registerUser:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { registerUser };