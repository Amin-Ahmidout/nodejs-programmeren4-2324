const database = require('../dao/inmem-db')

const authService = {

    login: (username, password, callback) => {
        database.login(username, password, (err, data) => {
            if (err) {
                callback(err, null)
            } else {
                if (data) {
                    callback(null, {
                        message: `User authenticated successfully.`,
                        data: data
                    })
                } else {
                    callback(null, {
                        message: `Invalid username or password.`,
                        data: null
                    })
                }
            }
        })
    }
}

module.exports = authService
