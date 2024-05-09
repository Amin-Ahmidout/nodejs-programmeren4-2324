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
}

module.exports = mealService