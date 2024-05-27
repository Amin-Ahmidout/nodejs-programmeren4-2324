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
        const mealId = parseInt(req.params.mealId, 10);
        mealService.getMealById(mealId, (error, success) => {
            if (error) {
                return res.status(error.status || 500).json({
                    status: error.status || 500,
                    message: error.message,
                    data: {}
                });
            }
            if (success) {
                res.status(200).json({
                    status: 200,
                    message: success.message,
                    data: success.data
                });
            }
        });
    },

    deleteMeal: (req, res, next) => {
        const mealId = parseInt(req.params.mealId, 10);
        const userId = req.userId; // Zorg ervoor dat je de userId hebt vanuit je auth middleware
    
        mealService.deleteMeal(mealId, userId, (error, success) => {
            if (error) {
                return res.status(error.status || 500).json({
                    status: error.status || 500,
                    message: error.message,
                    data: {}
                });
            }
            if (success) {
                res.status(200).json({
                    status: 200,
                    message: success.message,
                    data: success.data
                });
            }
        });
    },

    createMeal: (req, res, next) => {
        const mealData = req.body;
        mealData.cookId = req.userId; // Stel de cookId in als de ingelogde gebruiker
    
        mealService.createMeal(mealData, (error, success) => {
            if (error) {
                return next({
                    status: error.status,
                    message: error.message,
                    data: {}
                });
            }
            if (success) {
                res.status(200).json({
                    status: 200,
                    message: success.message,
                    data: success.data
                });
            }
        });
    },
}
module.exports = mealController
