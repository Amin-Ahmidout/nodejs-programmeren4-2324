const authService = require('../services/auth.service')

let authController = {
   
    login: (req, res, next) => {
        const { emailAdress, password } = req.body;

        authService.login(emailAdress, password, (error, success) => {
            if (error) {
                return next({
                    status: error.status,
                    message: error.message,
                    data: {}
                });
            }
            if (success) {
                res.status(200).json({
                    status: 200,
                    message: success.message,
                    data: success.data
                });
            }
        });
    },
}

module.exports = authController