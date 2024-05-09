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
}

module.exports = mealController