const database = require('../dao/inmem-db')


const mealService = {
    
    getAllMeals: (callback) => {
        database.getAllMeals((err, data) => {
            if (err) {
                callback(err, null)
            } else {
                console.log(data)
                callback(null, {
                    message: `Found ${data.length} meals.`,
                    data: data
                })
            }
        })
    },

    getMealById: (id, callback) => {
        database.getMealById(id, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                if (data) {
                    callback(null, {
                        message: `Found meal with ID ${id}.`,
                        data: data
                    });
                } else {
                    callback({
                        status: 404,
                        message: `Meal with ID ${id} not found.`
                    }, null);
                }
            }
        });
    },

    deleteMeal: (mealId, userId, callback) => {
        database.getCookIdByMealId(mealId, (err, cookId) => {
            if (err) {
                callback(err, null);
            } else if (cookId !== userId) {
                callback({ status: 403, message: "Forbidden: You can only delete your own meals" }, null);
            } else {
                database.deleteMeal(mealId, (err, data) => {
                    if (err) {
                        callback(err, null);
                    } else {
                        callback(null, {
                            message: `Meal with ID ${mealId} deleted successfully.`,
                            data: data
                        });
                    }
                });
            }
        });
    },

    createMeal: (meal, callback) => {
        database.createMeal(meal, (err, data) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, {
                    message: `Meal created with ID ${data.id}.`,
                    data: data
                })
            }
        })
    }
}

module.exports = mealService