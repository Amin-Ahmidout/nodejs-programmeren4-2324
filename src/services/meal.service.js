const database = require('../dao/inmem-db')
const pool = require('../dao/dbconnection')

const mealService = {
    
    getAll: (callback) => {
        database.getAll((err, data) => {
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