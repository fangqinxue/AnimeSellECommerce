const Product = require('../models/Product');
const Order = require('../models/Order')
const { ObjectId } = require('mongodb');






exports.createOrder = async (req, res) => {
    console.log("收到的订单数据：", req.body)


    try {
        const { items, shippingAddress, total, userEmail, createdAt } = req.body;

            // 1. 验证所有商品库存是否足够
            for (const item of items) {
                const product = await Product.findById(item.id);
                if (!product) {
                return res.status(404).json({ success: false, message: `商品 ${item.name} 不存在` });
                }
        
                if (product.stock < item.quantity) {
                return res.status(400).json({ success: false, message: `商品 ${product.name} 库存不足` });
                }
            }
    
        if (!items || items.length === 0) {
          return res.status(400).json({ success: false, message: "订单内容为空" });
        }
    
        const newOrder = new Order({
          userEmail,
          items,
          total,
          shippingAddress,
          createdAt: createdAt || new Date()
        });
    
        await newOrder.save();

            // 3. 扣减库存
            for (const item of items) {
                const product = await Product.findById(item.id);

                const newStock = product.stock - item.quantity;
          
                await Product.findByIdAndUpdate(item.id, {
                  stock: newStock,
                  available: newStock === 0 ? false : true
                });
            }
    
        return res.json({ success: true, orderId: newOrder._id });
      } catch (err) {
        console.error("订单保存失败:", err);
        return res.status(500).json({ success: false, message: "服务器错误" });
      }

  };



// 下面是考虑用session来防止高并发的。事物锁功能。
//   async function createOrder(req, res) {
//     const session = await mongoose.startSession();
//     session.startTransaction();
  
//     try {
//       const { items, total, userEmail, createdAt } = req.body;
  
//       // 遍历每个商品，检查库存并减少库存
//       for (const item of items) {
//         const product = await Product.findById(item.id).session(session);
//         if (!product) {
//           throw new Error(`找不到商品 ID: ${item.id}`);
//         }
  
//         if (product.stock < item.quantity) {
//           throw new Error(`商品 ${product.name} 库存不足，剩余 ${product.stock} 件`);
//         }
  
//         // 扣库存
//         product.stock -= item.quantity;
  
//         // 如果库存为0，设为不可用
//         if (product.stock === 0) {
//           product.available = false;
//         }
  
//         await product.save({ session });
//       }
  
//       // 创建订单
//       const newOrder = new Order({
//         items,
//         total,
//         userEmail,
//         createdAt,
//       });
  
//       await newOrder.save({ session });
  
//       await session.commitTransaction(); // 提交事务
//       session.endSession();
  
//       res.status(200).json({ success: true, message: "订单创建成功" });
  
//     } catch (error) {
//       await session.abortTransaction(); // 回滚事务
//       session.endSession();
  
//       console.error('❌ 订单处理失败：', error.message);
//       res.status(500).json({ success: false, message: error.message });
//     }
//   }


exports.getMyOrders = async (req, res) => {
 
    const { email } = req.query;
    if (!email) return res.status(400).json({ success: false, message: '缺少用户邮箱' });

    try {
      const orders = await Order.find({ userEmail: email }).sort({ createdAt: -1 });
      res.json({ success: true, orders });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: '服务器错误' });
    }


};


exports.requestRefund = async(req,res) => {
  const { orderId, itemId } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ success: false, message: '订单不存在' });

    const item = order.items.id(itemId);
    if (!item) return res.status(404).json({ success: false, message: '商品不存在' });

    if (['退货中', '已退货'].includes(item.logisticsStatus)) {
      return res.status(400).json({ success: false, message: '该商品已经申请退货或已退货' });
    }

    item.logisticsStatus = '退货中';
    await order.save();

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
}


exports.getSellerAllOrder = async (req, res) => {
  console.log('req.url:', req.url);          // 打印请求 URL 路径
  console.log('req.params:', req.params);
  const  sellerId  = req.params.sellerId;


  try {
    const orders = await Order.find({ 'items.seller': sellerId}).sort({ createdAt: -1 });
    const filteredOrders = orders.map(order => {
      const sellerItems = order.items.filter(it => String(it.seller) === String(sellerId));
      const sellerTotal = sellerItems.reduce((sum, it) => sum + it.price * it.quantity, 0);
      
      return {
        _id: order._id,
        userEmail: order.userEmail,
        shippingAddress: order.shippingAddress,
        items: sellerItems,
        sellerTotal,
        createdAt: order.createdAt,
      };
    });
    res.json(filteredOrders)

  } catch (err) {
    res.status(500).json({ error: "获取订单失败" });
  }
}


exports.PendingConfirmSeller =  async (req, res) => {
  const { orderId, itemId } = req.params;

  try {
    const order = await Order.findOneAndUpdate(
      { _id: orderId, 'items._id': itemId },
      { $set: { 'items.$.logisticsStatus': '运输中' } }, // 只更新匹配的 item
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: '订单或商品未找到' });
    }

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器错误' });
  }
}


exports.RefundConfirmSeller =  async (req, res) => {
  const { orderId, itemId } = req.params;

  try {
    const order = await Order.findOneAndUpdate(
      { _id: orderId, 'items._id': itemId },
      { $set: { 'items.$.logisticsStatus': '已退货' } }, // 只更新匹配的 item
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: '订单或商品未找到' });
    }

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器错误' });
  }
}