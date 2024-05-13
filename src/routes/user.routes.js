const express = require('express')
const assert = require('assert')
const chai = require('chai')
chai.should()
const router = express.Router()
const userController = require('../controllers/user.controller')
const database = require('../dao/inmem-db') // Replace '../path/to/database' with the actual path to your database module or object
const userService = require('../services/user.service')
const { validateToken } = require('../routes/auth.routes');

// Importeer de juiste database-module of -object





// Tijdelijke functie om niet bestaande routes op te vangen
const notFound = (req, res, next) => {
    res.status(404).json({
        status: 404,
        message: 'Route not found',
        data: {}
    })
}



// Input validation function 2 met gebruik van assert
const validateUserCreateAssert = (req, res, next) => {
    try {
        assert(req.body.emailAdress, 'Missing email')
        assert(req.body.firstName, 'Missing first name')
        assert(req.body.lastName, 'Missing last name')
        next()
    } catch (ex) {
        return res.status(400).json({
            status: 400,
            message: ex.message,
            data: {}
        })
    }
}


const validateEmail = (req, res, next) => {
    try {
        const email = req.body.emailAdress;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            throw new Error('Invalid email address');
        }
        next();
    } catch (ex) {
        return res.status(400).json({
            status: 400,
            message: ex.message,
            data: {}
        });
    }
};

const validateUniqueEmail = (req, res, next) => {
    const email = req.body.emailAdress;
    database.getUserByEmail(email, (err, existingUser) => {
        if (err) {
            return res.status(500).json({
                status: 500,
                message: err.message,
                data: {}
            });
        }
        if (existingUser) {
            return res.status(400).json({
                status: 400,
                message: 'User already exists',
                data: {}
            });
        }
        next();
    });
}; 



// Userroutes
router.post('/api/user', validateUserCreateAssert, validateEmail, validateUniqueEmail, userController.create)
router.get('/api/user', userController.getAll)
router.get('/api/user/profile', validateToken, userController.getProfile)
router.get('/api/user/:userId', validateToken, userController.getById)


// Tijdelijke routes om niet bestaande routes op te vangen
router.put('/api/user/:userId', userController.updateUser)
router.delete('/api/user/:userId', userController.delete)


module.exports = router

