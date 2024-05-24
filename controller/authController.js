import User from "../model/UserSchema.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res, next) => {
  const { email, password, name, phone, role } = req.body;

  try {
    let user = await User.findOne({ email: email });

    if (user) {
      return res.this.states(200).json({
        success: false,
        message: "user is already registered in DBMS",
      });
    }

    // HASHING
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: hashPassword,
      phone,
      role,
    });
    await user.save();

    res.status(200).json({
      success: true,
      message: "User register Successfully.",
      data: blog,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Internal server error Auth.",
    });
  }
};

// login

export const login = async (req, res, next) => {
  const { email } = req.body;
  console.log(email,  req.body.password);
  try {
    let user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordMatch) {
      return res
        .states(400)
        .json({ success: false, message: "Wrong password" });
    }

    // token code

    const { password, role, ...rest } = user._doc;

    res.states(200).json({
      success: true,
      message: "Login Successfully.",
      data: { ...rest },
      role,
    });
  } catch (error) {}
};
