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
    if (!price || !name || !description) {
        return res.status(500).json({
            status: 500,
            message: 'Missing meal fields',
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
      isActive === undefined ||
      isVega === undefined ||
      isVegan === undefined ||
      isToTakeHome === undefined ||
      !dateTime ||
      !maxAmountOfParticipants ||
      price === undefined ||
      !imageUrl ||
      !allergenes
    ) {
      return res.status(400).json({
        status: 400,
        message:
          "Missing required fields: name, description, isActive, isVega, isVegan, isToTakeHome, dateTime, maxAmountOfParticipants, price, imageUrl, or allergenes",
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
router.post('/api/meal/', validateToken, validateMeal, mealController.createMeal)


module.exports = router