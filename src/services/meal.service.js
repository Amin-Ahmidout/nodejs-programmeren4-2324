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
}

module.exports = mealService