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
        chai.request(server)
            .post(endpointToTest)
            .send({
                // firstName: 'Voornaam', ontbreekt
                lastName: 'Achternaam',
                emailAdress: 'v.a@server.nl'
            })
            .end((err, res) => {
                /**
                 * Voorbeeld uitwerking met chai.expect
                 */
                chai.expect(res).to.have.status(400)
                chai.expect(res).not.to.have.status(200)
                chai.expect(res.body).to.be.a('object')
                chai.expect(res.body).to.have.property('status').equals(400)
                chai.expect(res.body)
                    .to.have.property('message')
                    .equals('Missing first name')
                chai
                    .expect(res.body)
                    .to.have.property('data')
                    .that.is.a('object').that.is.empty

                done()
            })
    })

    
        it.skip('TC-301-2 Gebruiker is niet ingelogd', (done) => {
            chai.request(server)
            .post(endpointToTest)
            .send({
                // firstName: 'Voornaam', ontbreekt
                lastName: 'Achternaam',
                emailAdress: 'v.a@server.nl'
            })
            .end((err, res) => {
                /**
                 * Voorbeeld uitwerking met chai.expect
                 */
                chai.expect(res).to.have.status(400)
                chai.expect(res).not.to.have.status(200)
                chai.expect(res.body).to.be.a('object')
                chai.expect(res.body).to.have.property('status').equals(400)
                chai.expect(res.body)
                    .to.have.property('message')
                    .equals('Missing first name')
                chai
                    .expect(res.body)
                    .to.have.property('data')
                    .that.is.a('object').that.is.empty

                done()
            })
        })
    
    it.skip('TC-301-3 Maaltijd succesvol toegevoegd', (done) => {
        const token = jwt.sign({ id: 1 }, jwtSecretKey, { expiresIn: '1h' })
        chai.request(server)
            .post(endpointToTest)
            .set('Authorization', 'Bearer ' + token)
            .send({
                // price ontbreekt
                Name: 'Aardappelen met groente',
                Description: 'Lekker eten',
                cookId: 1
            })
            .end((err, res) => {
                
                chai.expect(res).to.have.status(500)
                chai.expect(res).not.to.have.status(200)
                chai.expect(res.body).to.be.a('object')
                chai.expect(res.body)
                    .to.have.property('message')
                    .equals('Missing meal fields')
                chai
                    .expect(res.body)
                    .to.have.property('data')
                    .that.is.a('object').that.is.empty

                done()
            })
    })

    it.skip('TC-303-1 Lijst van maaltijden geretourneerd', (done) => {
        const token = jwt.sign({ id: 1 }, jwtSecretKey, { expiresIn: '1h' })
            chai.request(server)
                .post(endpointToTest)
                .set('Authorization', 'Bearer ' + token)
                .send({
                    price: 5.50,
                    Name: 'Aardappelen met groente',
                    Description: 'Lekker eten',
                    cookId: 1
                })
                .end((err, res) => {
                    chai.expect(res).to.have.status(500)
                    chai.expect(res.body).to.be.a('object')
                    chai.expect(res.body)
                        .to.have.property('message')
                        .equals('Missing meal fields')
                    chai.expect(res.body)
                        .to.have.property('data')
                       

                    done()
                })
            
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