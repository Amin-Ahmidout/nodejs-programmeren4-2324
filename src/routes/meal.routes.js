const express = require('express')
const assert = require('assert')
const chai = require('chai')
chai.should()
const router = express.Router()
const mealController = require('../controllers/meal.controller')
const database = require('../dao/inmem-db') // Replace '../path/to/database' with the actual path to your database module or object
const mealService = require('../services/meal.service')

router.get('/api/meal/', mealController.getAllMeals)
router.get('/api/meal/:mealId', mealController.getMealById)
router.delete('/api/meal/:mealId', mealController.deleteMeal)
router.post('/api/meal/', mealController.createMeal)


module.exports = router