const { UsersModel } = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const getALLUsers = async (req, res) => {
  try {
    let page = req.query.page;
    if (page) {
      page = parseInt(page);
      const users = await UsersModel.findAndCountAll({
        where: {},
        limit: 2,
        offset: page * 2 - 1,
      });
      return res.status(200).json(users);
    } else {
      const users = await UsersModel.findAll();
      return res.status(200).json(users);
    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const getById = async (req, res) => {
  const { userId } = req.params;
  try {
    if (userId) {
      const users = await UsersModel.findOne({ where: { userId: userId } });
      return res.status(200).json(users);
    } else {
      return res.status(200).json("No User");
    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!(username && email && password)) {
    return res.status(400).json("Not enough params");
  }
  try {
    const exitingUser = await UsersModel.findOne({ where: { email: email } });
    if (exitingUser) {
      res.status(500).json("Email already in use");
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await UsersModel.create({
        username,
        email,
        password: hashedPassword,
      });
      return res.json(user);
    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    if (userId) {
      const users = await UsersModel.findOne({ where: { userId: userId } });
      await users.destroy();
      return res.status(200).json("Delete successful");
    } else {
      return res.status(200).json("No id");
    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    return res.status(400).json("Missing input");
  }
  try {
    const user = await UsersModel.findOne({ where: { email: email } });
    if (!user) {
      return res.status(400).json("Email incorrect");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json("Password incorrect");
    }
    req.session.user = {
      userId: user.userId,
      role: user.role,
      email: user.email,
    };
    res.locals.user = req.session.user;
    await req.session.save();
    res.set("userId", req.session.user.userId);
    res.set("role", req.session.user.role);
    res.set("email", req.session.user.email);
    console.log(req.session.user);
    return res.json({
      user,
      token: req.session.user.userId,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    delete req.session.user;
    return res.json({ message: "Logged out" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const privateLogin = async (req, res) => {
  try {
    let token = req.cookies.token;
    let userId = jwt.verify(token, "havanquocdung");
    if (userId) {
      return res
        .status(200)
        .json("Login with token ok , you can access private");
    }
  } catch (err) {
    return res.status(500).json("You must be logged in first!");
  }
};

const getAvatar = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await UsersModel.findOne({
      where: { userId: userId },
      attributes: ["avatar"],
    });
    if (!user) {
      return res.status(404).json("User not found");
    }
    return res.json(user.avatar);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const deleteCV = async (req, res) => {
  try {
    const { userId } = req.session.user;

    const user = await UsersModel.findOne({ where: { userId: userId } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.cv) {
      return res.status(400).json({ error: "No CV uploaded" });
    }

    fs.unlink(user.cv, async (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      user.cv = null;
      await user.save();

      return res.status(200).json(user);
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  const session = JSON.parse(req.cookies.session);
  const userId = session.user.userId;
  const {username,email, phone_number, address, skill, birth, sex, about } = req.body;

  try {
    const user = await UsersModel.findOne({ where: { userId } });
    if (!user) {
      return res.status(404).json("User not found");
    }

    // update user information if provided
    if (username) {
      user.username = username;
    }
    if (email) {
      user.email = email;
    }
    if (phone_number) {
      user.phone_number = phone_number;
    }
    if (address) {
      user.address = address;
    }
    if (skill) {
      user.skill = skill;
    }
    if (birth) {
      user.birth = birth;
    }
    if (sex) {
      user.sex = sex;
    }
    if (about) {
      user.about = about;
    }

    await user.save();
    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const countUsers = async (req, res) => {
  try {
    const count = await UsersModel.count();
    return res.status(200).json(count);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};


module.exports = {
  getALLUsers,
  registerUser,
  loginUser,
  logoutUser,
  privateLogin,
  getById,
  deleteUser,
  getAvatar,
  deleteCV,
  updateUser,
  countUsers,
};
