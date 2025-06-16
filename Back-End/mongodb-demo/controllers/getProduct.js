
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