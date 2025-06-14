
const Figure = require('../models/Product');


exports.getProduct = async (req, res) => {
    try {
        const results = await Figure.find({ rating: { $gt: 4.8 } });
        res.json(results);
      } catch (error) {
        console.error('Error fetching high-rated figures:', err);
        res.status(500).json({ error: 'Server error' });
      }

  };