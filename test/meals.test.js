const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')
const tracer = require('tracer')
const expect = chai.expect
const assert = require('assert')
const jwt = require('jsonwebtoken')
const jwtSecretKey = require('../src/util/config').secretkey
chai.should()
chai.use(chaiHttp)
tracer.setLevel('warn')

const endpointToTest = '/api/meal'

describe('UC301 toevoegen van maaltijd', () => {
    beforeEach((done) => {
        done()
    })


    it.skip('TC-301-1 Verplicht veld ontbreekt', (done) => {
        
    })

    
    it.skip('TC-301-2 Gebruiker is niet ingelogd', (done) => {
           
    })
    
    it.skip('TC-301-3 Maaltijd succesvol toegevoegd', (done) => {
      
    })
})

describe ('UC-303 opvragen van maaltijden', () => {
    beforeEach((done) => {
        done()
    }) 
    it('TC-303-1 Lijst van maaltijden geretourneerd', (done) => {
        const token = jwt.sign({ id: 1 }, jwtSecretKey, { expiresIn: '1h' })
        chai.request(server)
            .get(endpointToTest)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.an('object')
                res.body.should.have.property('data').that.is.an('array')

                done()
            })
    })
})

describe('UC-304 opvragen van maaltijd bij ID', () => {
    beforeEach((done) => {
        done()
    })

    it.skip('TC-304-1 Maaltijd bestaat niet', (done) => {

    })

    it.skip('TC-304-2 details van maaltijd geretourneerd', (done) => {

    })
})

describe('UC-305 verwijderen van een maaltijd', () => {
    it.skip('TC-305-1 niet ingelogd', (done) => {

    })

    it.skip('TC-305-2 niet de eigenaar van de data', (done) => {
        	
    })

    it.skip('TC-305-3 maaltijd bestaat niet', (done) => {

    })

    it.skip('TC-305-4 maaltijd succesvol bijgewerkt', (done) => {

    })
})






    
    
   

     

    


    
