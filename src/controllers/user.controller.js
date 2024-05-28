// const { updateUser} = require('../dao/inmem-db')
const userService = require('../services/user.service')

let userController = {
    create: (req, res, next) => {
        const user = req.body
        //
        // Todo: Validate user input
        //
        userService.create(user, (error, success) => {
            if (error) {
                return next({
                    status: error.status,
                    message: error.message,
                    data: {}
                })
            }
            if (success) {
                res.status(200).json({
                    status: success.status,
                    message: success.message,
                    data: success.data
                })
            }
        })
    },

    getAll: (req, res, next) => {
        // Extract filters from query parameters
        const filters = req.query;
     
        userService.getAll(filters, (error, success) => {
            if (error) {
                return next({
                    status: error.status || 400,  
                    message: error.message,
                    data: {}
                });
            }
            res.status(200).json({
                status: 200,
                message: success.message,
                data: success.data
            });
        });
    },

    getById: (req, res, next) => {
        const userId = req.params.userId
        userService.getById(userId, (error, success) => {
            if (error) {
                return next({
                    status: error.status,
                    message: error.message,
                    data: {}
                })
            }
            if (success) {
                res.status(200).json({
                    status: success.status,
                    message: success.message,
                    data: success.data
                })
            }
        })
    },

    // Todo: Implement the update and delete methods
    updateUser: (req, res, next) => {
        const userId = req.params.userId;
        const updatedUser = req.body;
        const authUserId = req.userId;  // Extracted from validateToken middleware
        
        userService.updateUser(userId, updatedUser, authUserId, (error, success) => {
            if (error) {
                return next({
                    status: error.status || 500,
                    message: error.message || 'An error occurred',
                    data: {}
                });
            }
            if (success) {
                res.status(200).json({
                    status: 200,
                    message: `User with id ${userId} successfully updated.`,
                    data: success.data
                });
            } else {
                res.status(404).json({
                    status: 404,
                    message: `User with id ${userId} not found.`,
                    data: {}
                });
            }
        });
    },
    
    
      
    

    delete: (req, res, next) => {
        const userId = req.params.userId;
        const authUserId = req.userId;  // Extracted from validateToken middleware
    
        console.log(`Controller - authUserId: ${authUserId}, userId: ${userId}`);  // Add logging for debugging
        
        userService.delete(userId, authUserId, (error, success) => {
            if (error) {
                return next({
                    status: error.status,
                    message: error.message,
                    data: {}
                });
            }
            if (success) {
                res.status(200).json({
                    status: success.status,
                    message: success.message,
                    data: success.data
                });
            }
        });
    }
    ,

    getProfile: (req, res, next) => {
        const userId = req.userId;
        console.log('userId by controller', userId);
        userService.getProfile(userId, (error, success) => {
            if (error) {
                return next({
                    status: error.status,
                    message: error.message,
                    data: {}
                });
            }
            if (success) {
                res.status(200).json({
                    status: success.status,
                    message: success.message,
                    data: success.data
                });
            }
        });
    },

}

module.exports = userController
