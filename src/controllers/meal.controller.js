const { createMeal } = require('../dao/inmem-db')
const mealService = require('../services/meal.service')

let mealController = {
    getAllMeals: (req, res, next) => {
        mealService.getAllMeals((error, success) => {
            if (error) {
                return next({
                    status: error.status,
                    message: error.message,
                    data: {}
                })
            }
            if (success) {
                res.status(200).json({
                    status: 200,
                    message: success.message,
                    data: success.data
                })
            }
        })
    },

    getMealById: (req, res, next) => {
        const mealId = parseInt(req.params.mealId, 10)
        mealService.getMealById(mealId, (error, success) => {
            if (error) {
                return next({
                    status: error.status,
                    message: error.message,
                    data: {}
                })
            }
            if (success) {
                res.status(200).json({
                    status: 200,
                    message: success.message,
                    data: success.data
                })
            }
        })
    },

    deleteMeal: (req, res, next) => {
        const mealId = parseInt(req.params.mealId, 10)
        mealService.deleteMeal(mealId, (error, success) => {
            if (error) {
                return next({
                    status: error.status,
                    message: error.message,
                    data: {}
                })
            }
            if (success) {
                res.status(200).json({
                    status: 200,
                    message: success.message,
                    data: success.data
                })
            }
        })
    },

    createMeal: (req, res, next) => {
        const mealData = req.body
        mealService.createMeal(mealData, (error, success) => {
            if (error) {
                return next({
                    status: error.status,
                    message: error.message,
                    data: {}
                })
            }
            if (success) {
                res.status(200).json({
                    status: 200,
                    message: success.message,
                    data: success.data
                })
            }
        })
    }
}

module.exports = mealController