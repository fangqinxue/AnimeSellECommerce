
const Figure = require('../models/Product');


exports.getProduct = async (req, res) => {
    try {
        const results = await Figure.find({ rating: { $gt: 4.8 } });
        res.json(results);
      } catch (error) {
        console.error('Error fetching high-rated figures:', error);
        res.status(500).json({ error: 'Server error' });
      }

  };

exports.getProductAnime = async(req,res) => {

    try {
      const animes = await Figure.distinct('anime');
      res.json(animes);
    } catch (err) {
      res.status(500).json({ error: '服务器错误' });
    }
  }


exports.getProductTags = async(req,res) => {

    try {
      const animes = await Figure.distinct('tags');
      res.json(animes);
    } catch (err) {
      res.status(500).json({ error: '服务器错误' });
    }
  }


  exports.getAllProduct = async (req, res) => {
    try {
        const results = await Figure.find({ available: true });
        res.json(results);
      } catch (error) {
        console.error('Error fetching high-rated figures:', error);
        res.status(500).json({ error: 'Server error' });
      }

  };


  exports.getProductById = async(req, res) => {
    try {
      const productId = req.body.prod
      console.log(req.body)
  
      // 检查 ID 格式是否正确
      if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: '无效的商品ID' });
      }
  
      const product = await Figure.find({_id: productId});
      console.log(product)
  
      if (!product) {
        return res.status(404).json({ message: '商品不存在' });
      }
  
      res.status(200).json(product);
    } catch (err) {
      console.error('获取商品出错:', err);
      res.status(500).json({ message: '服务器错误' });
    }
  }