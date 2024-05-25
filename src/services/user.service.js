
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
    updateUser: (id, updatedUser, authUserId, callback) => {
        console.log(`authUserId: ${authUserId}, id: ${id}`); // Log the IDs for debugging
        if (parseInt(id) !== parseInt(authUserId)) {
            return callback({ status: 403, message: 'Forbidden: You can only update your own data' }, null);
        }
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
    
    delete: (id, authUserId, callback) => {
        console.log(`Service - authUserId: ${authUserId}, id: ${id}`);  // Log the IDs for debugging
        
        if (parseInt(id) !== parseInt(authUserId)) {
            return callback({ status: 403, message: 'Forbidden: You can only delete your own data' }, null);
        }
        database.deleteUser(id, (err, data) => {
            if (err) {
                callback({ status: 400, message: err.message }, null);
            } else {
                if (data) {
                    callback(null, {
                        status: 200,
                        message: `User deleted with id ${id}.`,
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
    }
    ,

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
