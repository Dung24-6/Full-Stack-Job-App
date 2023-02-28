const { UsersModel } = require("../models/User");
const jwt = require("jsonwebtoken");

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
      const user = await UsersModel.create({
        username,
        email,
        password,
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
    if (password !== user.password) {
      return res.status(400).json("Password incorrect");
    }
    let token = jwt.sign({ id: user.userId }, "havanquocdung", {
      expiresIn: 86400,
    });
    return res.json({
      message: "Login ok",
      token: token,
    });
  } catch (err) {
    console.log(err);
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

const uploadAvatar = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await UsersModel.findOne({ where: { userId } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (req.file) {
      user.avatar = req.file.path;
      await user.save();

      return res.status(200).json(user);
    } else {
      return res.status(400).json({ error: "No file uploaded" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
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

module.exports = {
  getALLUsers,
  registerUser,
  loginUser,
  privateLogin,
  getById,
  deleteUser,
  uploadAvatar,
  getAvatar,
};
