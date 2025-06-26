import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bycrypt from "bcrypt";
import validator from "validator";

// genreating a token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  /* console.log({email , password});*/

  try {
    const user = await User.findOne({ email }); // check for user existence

    if (!user) {
      res.json({ success: false, message: "User does not Exist" });
    }

    const isMatched = await bycrypt.compare(password, user.password);

    if (!isMatched) {
      res.json({ success: false, message: "Pswword is incorrect" });
    }

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Register User
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await User.findOne({ email }); // checking if the email exists in the DB or not

    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    //validating email formate and strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Plese Enter Valid Email" });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Plese Enter Strong Password",
      });
    }

    // Hashing(encrypting) User Password
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);

    // making new user account
    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { loginUser, registerUser };
