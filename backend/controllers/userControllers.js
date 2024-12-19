const User = require("../models/useModels");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id} , 'ninjadojoshifuyoshimarioluigipeachbowser', { expiresIn: '3d' })
}

const Signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    
    // check if exists
    const userExists = await User.findOne({ email });


    if (userExists) {
      throw Error("Email already exists");
    }
    //validations
    if (!email || !password) {
      throw Error("Please Provide email and password");
    }

    // emails validate
    if (!validator.isEmail(email)) {
      throw Error("Invalid email");
    }

    // password validate
    if (!validator.isStrongPassword(password)) {
      throw Error(
        "Password must be Strong"
      );
    }

    // hashing
    const hashedPassword = await bcrypt.hashSync(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    
    // create token
    const token = createToken(user._id)

    res.status(200).json({ email: email, token: token});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const Login = async (req, res) => {
  try {
      const { email, password } = req.body;
      
    //validations
    if (!email || !password) {
      throw Error("Please Provide email and password");
    }

    // check if exists
    const user = await User.findOne({ email });

    if (!user) {
      throw Error("This user does not exist");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw Error("Invalid password");
    }

    // create token
    const token = createToken(user._id)

    res.status(200).json({ email: email, token: token});
  }
    
  catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  Signup,
  Login,
}
