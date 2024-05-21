
const database = require('../dao/inmem-db')

const userService = {
    create: (user, callback) => {
        database.addUser(user, (err, data) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, {
                    message: `User created with id ${data.id}.`,
                    data: data,
                    status: 200
                })
            }
        })
    },

    getAll: (filters, callback) => {
        database.getAll(filters, (err, data) => {
            if (err) {
                callback(err, null)
            } else {
                console.log(data) // For debugging purposes
                callback(null, {
                    message: `Found ${data.length} users.`,
                    data: data
                })
            }
        })
    },

    getById: (id, callback) => {
        database.getUserById(id, (err, data) => {
            if (err) {
                callback(err, null)
            } else {
                if (data) {
                    callback(null, {
                        message: `User found with id ${id}.`,
                        data: data,
                        status: 200
                    })
                } else {
                    callback(null, {
                        message: `User not found with id ${id}.`,
                        data: null,
                        status: 404
                    })
                }
            }
        })
    },

    updateUser: (id, updatedUser, callback) => {
        database.updateUser(id, updatedUser, (err, data) => {
            if (err) {
                callback({ status: 400, message: err.message }, null);
            } else {
                if (data) {
                    callback(null, {
                        status: 200,
                        message: `User updated with id ${id}.`,
                        data: data
                    });
                } else {
                    callback({
                        status: 404,
                        message: `User not found with id ${id}.`,
                        data: null
                    }, null);
                }
            }
        });
    },
    

    delete: (id, callback) => {
        database.deleteUser(id, (err, data) => {
            if (err) {
                callback(err, null)
            } else {
                if (data) {
                    callback(null, {
                        message: `User deleted with id ${id}.`,
                        data: data
                    })
                } else {
                    callback(null, {
                        message: `User not found with id ${id}.`,
                        data: null
                    })
                }
            }
        })
    },

    getProfile: (userId, callback) => {
        database.getProfile(userId, (err, data) => {
            if (err) {
                callback(err, null)
            } else {
                if (data) {
                    callback(null, {
                        message: `Profile found for user with id ${userId}.`,
                        data: data
                    })
                } else {
                    callback(null, {
                        message: `User not found with  id ${userId}.`,
                        data: null
                    })
                }
            }
        })
    }
}

module.exports = userService
