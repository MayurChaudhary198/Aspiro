const User  = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

const loginUser = async (req, res) => {
    try {
        const {email,password} = req.body;

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: 'User not found. Please register first.' });
        }

        console.log('Comparing:', password, existingUser.password);
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if(!isMatch){
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: existingUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d'}
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user:{
                _id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                userType: existingUser.userType,
            },
        })


    } catch (error) {
        console.error('Error in registerUser:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { registerUser, loginUser };