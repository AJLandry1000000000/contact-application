import User from "../model/user.js";


export const registerUser = async (req, res) => {
  try {
    const { email, password, cpassword } = req.body;

    // for ensuring the email type
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(500).json({ message: 'Invalid email format' });
    } else if (password.length < 6) {
      return res.status(500).json({ message: "password length should be minimum six" });
    } else if (password !== cpassword) {
      return res.status(500).json({ message: "password mismatch" });
    } else {

      const existingUser = await User.findOne({ email })
      if (existingUser) {
        return res.status(200).json({ message: "User already exists", existingUser });
      } else {
        const user = await User.create({ email, password });
        return res.status(200).json({ message: "User registered successfully", user });
      }
    }

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ message: "Invalid email or password" });
    } else if (password === "" || password === null || password === undefined) {
      return res.status(404).json({ message: "Please enter your password" });
    } else {
      const validatePassword = await user.matchPassword(password);

      if (!validatePassword) {
        return res.status(404).json({ message: "Invalid email or password" });
      } else {
        const token = await user.generateToken();
        return res.status(200)
          .json({
            message: "login succesfully",
            user,
            token
          })
      }
    }

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

export const myProfile = async (req, res) => {
  try {
    if (req.cookies['userID']) {
      const user = await User.findById(req.user._id).populate("password");
      return res.status(200).json({ user })
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}



