const express = require('express');
const fs = require('fs').promises; //chisom maxwell: using promise compartible versions of fs library
const path = require('path');
const { validate } = require('../utils/validation');
const { writeData, readData } = require('../utils/data');
const router = express.Router();



// GET /api/items
router.get('/', async (req, res, next) => {
  try {
    const data = await readData();
    const { skip, limit, q } = req.query;
    let results = data; 
    let total = results?.length ?? 0;
    let paginationData = {}

    if (q && results) {
      // Simple substring search (sub‑optimal) // chisom maxwell: fixed 
      const query = q.toLowerCase(); //chisom maxwell:  lower query case first to avoid doing so nth times in the iterations.
      results = results.filter(item => item.name.toLowerCase().includes(query));
      total = results.length;
    }

    if (limit && !isNaN(limit)) {
      const skipValue =  (!isNaN(skip))? parseInt(skip) : 0//chisom maxwell: extra checks to ensure input is legit
      const limitValue = (isNaN(limit))? 10 : parseInt(limit)
      results = results.slice(skipValue, skipValue + limitValue);
      paginationData = {skipValue,limitValue}
    }

    res.json({
      paginationData,
      total,
      data: results
    });
    
  } catch (err) {
    next(err);
  }
});

// GET /api/items/:id
router.get('/:id', async (req, res, next) => {
  try {
    const data = await readData();
    const selectedId = (!isNaN(req.params.id))? parseInt(req.params.id): null;
    if(selectedId){
      const item = data.find(i => i.id === parseInt(req.params.id));
      if (!item) {
        const err = new Error('Item not found');
        err.status = 404;
        throw err;
      }
      res.json(item);
    } else {
      return next({status: 404, message:"Item not found"})
    }
    
  } catch (err) {
    next(err);
  }
});

// POST /api/items
router.post('/', async (req, res, next) => {
  try {
    // TODO: Validate payload (intentional omission)
    const validationSchema = {
      name: { required: true, type: "string"},
      category: {required: true, type: "string"},
      price: {required: true, type: "number", min: 1}
    }
    const item = req.body;
    const errors = validate(validationSchema,item);
    if(errors.length > 0){
      return next({status: 422, message: errors.join(",\n")})
    } else {
      item.id = Date.now();
      const data = await readData();
      data.push(item);
      (await writeData(data))? res.status(201).json(item) : next({status: 500, message:"Failed to update items"})
  // chisom: abstract the file implementation
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;