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
    /**
     * Voorbeeld van een beforeEach functie.
     * Hiermee kun je code hergebruiken of initialiseren.
     */
    beforeEach((done) => {
        done()
    })


    it.skip('TC-301-1 Verplicht veld ontbreekt', (done) => {

    })

    
    it.skip('TC-301-2 Gebruiker is niet ingelogd', (done) => {
           
    })
    
    it.skip('TC-301-3 Maaltijd succesvol toegevoegd', (done) => {
      
    })

    it.skip('TC-303-1 Lijst van maaltijden geretourneerd', (done) => {
            
    })

    it.skip('TC-304-1 Maaltijd bestaat niet', (done) => {

    })

    it.skip('TC-304-2 details van maaltijd geretourneerd', (done) => {

    })

    it.skip('TC-305-1 niet ingelogd', (done) => {

    })

    it.skip('TC-305-2 niet de eigenaar van de data', (done) => {
        	
    })

    it.skip('TC-305-3 maaltijd bestaat niet', (done) => {

    })

    it.skip('TC-305-4 maaltijd succesvol bijgewerkt', (done) => {

    })







    
    
   

     

    


    
})