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
                callback(err, null)
            } else {
                if (data) {
                    callback(null, {
                        message: `Found meal with ID ${id}.`,
                        data: data
                    })
                } else {
                    callback(null, {
                        message: `Meal with ID ${id} not found.`,
                        data: null
                    })
                }
            }
        })
    },

    deleteMeal: (id, callback) => {
        database.deleteMeal(id, (err, data) => {
            if (err) {
                callback(err, null)
            } else {
                if (data) {
                    callback(null, {
                        message: `Meal with ID ${id} deleted successfully.`,
                        data: data
                    })
                } else {
                    callback(null, {
                        message: `Meal with ID ${id} not found.`,
                        data: null
                    })
                }
            }
        })
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