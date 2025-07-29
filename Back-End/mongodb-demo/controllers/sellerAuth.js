const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Seller = require('../models/Seller')

dotenv.config({ path: './config.env' });

exports.sellerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const seller = await Seller.findOne({ email }).select('+password');;
        if (!seller) return res.status(400).json({ message: '账号不存在' });
    
        const isMatch = await bcrypt.compare(password, seller.password);
        if (!isMatch) return res.status(401).json({ message: '密码错误' });
    
        const token = jwt.sign({ sellerId: seller._id },process.env.JWT_SECRET, { expiresIn: '7d' });
    
        res.json({
          message: '登录成功',
          token,
          seller: {
            id: seller._id,
            userEmail: seller.email,
            shopName: seller.name,
          }
        });
      } catch (err) {
        res.status(500).json({ message: '登录失败', error: err.message });
      }    
}

exports.SellerRegister = async (req,res) => {
    try {
        const { email, password, name } = req.body;
        const existing = await Seller.findOne({ email });
        if (existing) return res.status(400).json({ message: '用户名已存在' });

        const hashedPassword = await bcrypt.hash(password, 10);
    
        const seller = new Seller({ email, password: hashedPassword, name });
        await seller.save();
        res.status(201).json({ message: '注册成功' });
      } catch (err) {
        res.status(500).json({ message: '注册失败', error: err.message });
      }

}