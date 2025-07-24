const Address = require('../models/AddressUser');

exports.addAddress = async (req, res) => {
  try {
    const { email, recipientName, phoneNumber, province, city, district, detail, postalCode, isDefault } = req.body;

    if (isDefault) {
      await Address.updateMany({ email }, { isDefault: false });
    }

    const address = await Address.create({
      email,
      recipientName,
      phoneNumber,
      province,
      city,
      district,
      detail,
      postalCode,
      isDefault
    });

    res.status(201).json({ success: true, address });
  } catch (err) {
    console.error('添加地址失败:', err);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
};

exports.getUserAddresses = async (req, res) => {
  try {
    const { email } = req.query;
    const addresses = await Address.find({ email }).sort({ isDefault: -1, createdAt: -1 });

    res.json({ success: true, addresses });
  } catch (err) {
    res.status(500).json({ success: false, message: '获取地址失败' });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const { addressId } = req.params;

    console.log(addressId)
    const updateData = req.body;

    if (updateData.isDefault) {
      await Address.updateMany({ email: updateData.email }, { isDefault: false });
    }

    const address = await Address.findByIdAndUpdate(addressId, updateData, { new: true });
    res.json({ success: true, address });
  } catch (err) {
    res.status(500).json({ success: false, message: '更新地址失败' });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    await Address.findByIdAndDelete(addressId);
    res.json({ success: true, message: '地址已删除' });
  } catch (err) {
    res.status(500).json({ success: false, message: '删除失败' });
  }
};

exports.setDefaultAddress = async (req, res) => {
    try {
      const { addressId } = req.params;
      const { email } = req.body;
  
      if (!email || !addressId) {
        return res.status(400).json({ success: false, message: '参数缺失' });
      }
  
      // Step 1: 将当前用户的所有地址取消默认
      await Address.updateMany({ email }, { isDefault: false });
  
      // Step 2: 将指定地址设置为默认
      const updatedAddress = await Address.findByIdAndUpdate(
        addressId,
        { isDefault: true },
        { new: true }
      );
  
      res.json({ success: true, message: '默认地址已设置', address: updatedAddress });
    } catch (error) {
      console.error('设置默认地址失败:', error);
      res.status(500).json({ success: false, message: '服务器错误' });
    }
  };