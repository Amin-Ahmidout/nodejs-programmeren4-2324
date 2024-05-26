const express = require('express')
const assert = require('assert')
const chai = require('chai')
chai.should()
const router = express.Router()
const mealController = require('../controllers/meal.controller')
const database = require('../dao/inmem-db') // Replace '../path/to/database' with the actual path to your database module or object
const mealService = require('../services/meal.service')
const { validateToken } = require('./auth.routes')



function validateMissingMealFields(req, res, next) {
  const { price, name, description } = req.body;
  const missingFields = [];
  if (!price) {
    missingFields.push('price');
  }
  if (!name) {
    missingFields.push('name');
  }
  if (!description) {
    missingFields.push('description');
  }
  if (missingFields.length > 0) {
    return res.status(400).json({
      status: 400,
      message: `Missing required field(s): ${missingFields.join(', ')}`,
      data: {}
    });
  }
  next();
};
function validateMeal(req, res, next) {
    const {
      name,
      description,
      isActive,
      isVega,
      isVegan,
      isToTakeHome,
      dateTime,
      maxAmountOfParticipants,
      price,
      imageUrl,
      allergenes,
    } = req.body;
   
    if (
      !name ||
      !description ||
      !dateTime ||
      !maxAmountOfParticipants ||
      !price ||
      !imageUrl
    ) {
      return res.status(400).json({
        status: 400,
        message:
          "Missing required fields: name, description, dateTime, maxAmountOfParticipants, price, imageUrl",
        data: {},
      });
    }
   
    if (
      typeof name !== "string" ||
      typeof description !== "string" ||
      typeof isActive !== "boolean" ||
      typeof isVega !== "boolean" ||
      typeof isVegan !== "boolean" ||
      typeof isToTakeHome !== "boolean" ||
      typeof maxAmountOfParticipants !== "number" ||
      typeof price !== "number" ||
      typeof imageUrl !== "string" ||
      typeof allergenes !== "string"
    ) {
      return res.status(400).json({
        status: 400,
        message: "Invalid data types provided for fields",
        data: {},
      });
    }
   
    next();
  }





router.get('/api/meal/', validateToken, mealController.getAllMeals)
router.get('/api/meal/:mealId', validateToken, mealController.getMealById)
router.delete('/api/meal/:mealId', validateToken, mealController.deleteMeal)
router.post('/api/meal/', validateToken, validateMissingMealFields, mealController.createMeal)


module.exports = router