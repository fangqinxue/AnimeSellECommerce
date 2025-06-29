const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('../models/User');


dotenv.config({ path: './config.env' });
exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body)

    // 检查用户是否已存在
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: existingUser.username === username ? 'Username taken' : 'Email already registered',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 创建新用户
    const newUser = new User({ username, email, password: hashedPassword });
    // 保存进数据库
    await newUser.save(); 

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (err) {
    next(err); // 交给错误处理中间件
  }
};



exports.login =  async (req, res) => {

  
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    console.log(user)
    if (!user) return res.status(401).json({ error: '用户不存在' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: '密码错误' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET,{ expiresIn: '2m' });
    res.status(200).json({ message: '登录成功', token, user: {
      id: user._id,
      username: user.username,
      email: user.email
    } });

  } catch (err) {
    console.error('捕获的错误:', err);
    res.status(500).json({ error: '服务器错误' });
  }

}
