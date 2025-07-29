const mongoose = require('mongoose');


const SellerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true,  select: false }, // 登录密码
  phone: String,
  address: String,
  createdAt: { type: Date, default: Date.now }
});

// // 密码加密中间件
// SellerSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next(); // 只在新建或修改密码时加密
//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

// // 比较密码方法（用于登录）
// SellerSchema.methods.comparePassword = async function (candidatePassword) {
//   return bcrypt.compare(candidatePassword, this.password);
// };

module.exports = mongoose.model('Seller', SellerSchema);