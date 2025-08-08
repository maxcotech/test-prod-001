const express = require('express');
const { mean } = require('../utils/stats');
const { readData } = require('../utils/data');
const router = express.Router();

// GET /api/stats
router.get('/', async (req, res, next) => {
  try {
    // Read data directly without watcher
    const items = await readData();
    
    // Calculate statistics
    const stats = {
      total: items.length,
      averagePrice: items.length > 0 
        ? mean(items, "price") 
        : 0  // Handle empty dataset
    };
    
    res.json(stats);
  } catch (e) {
    // Proper error handling
    next({ 
      status: 500, 
      message: "Failed to load statistics",
      details: e.message 
    });
  }
});

module.exports = router;