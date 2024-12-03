const User = require("../models/userModel");
const zod = require("zod");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = 10;


// input validation registration
const registerSchema = zod.object({
  fullname: zod.string({
    message: 'Fullname is Invalid',
  }),
  email: zod.string({
    message: 'Email is Invalid',
  }).email(),
  password: zod.string({
    message: 'Password is Invalid it should be 6 characters'
  }).min(6)
});

// user registration endpoint
// http://localhost:3000/api/user/register  (post)  --> use in postman
const register = async (req, res) => {
  try {
    const body = req.body;
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid data",
        error: parsed.error.errors,
      });
    };

    const { fullname, email, password, role } = body;

    const existinguser = await User.findOne({
      email
    });

    if (existinguser) {
      return res.status(411).json({
        message: "User Email already exist",
      });
    };

    const hashpassword = await bcrypt.hash(password, saltRounds);

    const dbuser = await User.create({ ...body, password: hashpassword });
    await dbuser.save();

    const userId = dbuser._id;

    const token = jwt.sign({
      userId
    }, process.env.JWT_SERECT);

    res.status(201).json({
      message: "User registered successfully",
      data: dbuser,
      token
    });

  } catch (e) {
    res.status(500).json({
      message: "Error in registration",
      details: error.message
    });
  }
}


// user login validation
const LoginSchema = zod.object({
  email: zod.string({
    message: 'Email is Invalid',
  }).email(),
  password: zod.string({
    message: 'Password is Invalid it should be 6 characters'
  }).min(6)
})


//user login endpoint
// http://localhost:3000/api/user/login  (post)  --> use in postman
const login = async (req, res) => {
  try {
    const parsed = LoginSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid email or password",
        error: parsed.error.errors,
      });
    }

    const { email, password } = req.body;

    const logindb = await User.findOne({ email });

    if (!logindb) {
      return res.status(404).json({
        message: "Oops! Account details not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, logindb.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        userId: logindb._id,
        role: logindb.role
      },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "User login successful",
      token,
      data: logindb,
    });

  } catch (error) {
    res.status(500).json({
      message: "Invalid login details",
      details: error.message,
    });
  }
};


module.exports = {
  register,
  login,
}
