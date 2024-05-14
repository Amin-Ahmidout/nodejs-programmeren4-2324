const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')
const tracer = require('tracer')
const expect = chai.expect
const assert = require('assert')

chai.should()
chai.use(chaiHttp)
tracer.setLevel('warn')

const endpointToTest = '/api/user'

describe('UC201 Registreren als nieuwe user', () => {
    /**
     * Voorbeeld van een beforeEach functie.
     * Hiermee kun je code hergebruiken of initialiseren.
     */
    beforeEach((done) => {
        done()
    })

    /**
     * Hier starten de testcases
     */
    it('TC-201-1 Verplicht veld ontbreekt', (done) => {
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

    it('TC-201-2 Niet-valide email adres', (done) => {
        chai.request(server)
            .post('/api/user')
            .send({
                firstName: 'Jan', // Valid first name
                lastName: 'De Boer', // Valid last name
                emailAdress: 'jan.de.boer' // Invalid email, missing domain
            })
            .end((err, res) => {
                expect(res).to.have.status(400)
                expect(res.body).to.be.an('object')
                expect(res.body)
                    .to.have.property('message')
                    .eql('Invalid email address')
                done()
            })
    })

    it('TC-201-3 Niet-valide wachtwoord', (done) => {
      const testUser = {
        firstName: 'John',
        lastName: 'Doe',
        emailAdress: 'test@example.com',
        password: 'short', // Invalid password
        street: 'Mainstreet',
        city: 'New York',
        roles: 'editor,guest'
      }
    
      // Attempt to add the user with an invalid password
      chai.request(server)
        .post('/api/user')
        .send(testUser)
        .end((err, res) => {
          assert.ifError(err)
    
          // The server should respond with a 400 status code for invalid input
          res.should.have.status(400)
          res.should.be.an('object')
          res.body.should.be
            .an('object')
            .that.has.all.keys('status', 'message', 'data')
    
      
    
          done()
        })
    })

    it('TC-201-4 When a user already exists, a valid error should be returned', (done) => {
        const testUser = {
            firstName: 'John',
            lastName: 'Doe',
            emailAdress: 'TESTFOREXISTING@avans.nl',
            password: 'Secret1234',
            street: 'Mainstreet',
            city: 'New York',
            roles: 'editor,guest'
        }

        // Create the user for the first time
        chai.request(server)
            .post('/api/user')
            .send(testUser)
            .end((err, res) => {
                assert.ifError(err)

                res.should.have.status(200)
                res.should.be.an('object')
                res.body.should.be
                    .an('object')
                    .that.has.all.keys('status', 'message', 'data')

                // Try to create the same user again
                chai.request(server)
                    .post('/api/user')
                    .send(testUser)
                    .end((err, res) => {
                        assert.ifError(err)

                        res.should.have.status(400)
                        res.should.be.an('object')
                        res.body.should.be
                            .an('object')
                            .that.has.all.keys('status', 'message', 'data')

                        let { status, message } = res.body
                        status.should.be.a('number')
                        message.should.be
                            .a('string')
                            .that.equals('User already exists')

                        // Delete the user after the test
                        chai.request(server)
                            .post('/api/login')
                            .send({
                                emailAdress: testUser.emailAdress,
                                password: testUser.password
                            })
                            .end((loginErr, loginRes) => {
                                if (loginErr) return done(loginErr)

                                loginRes.should.have.status(200)
                                const token = loginRes.body.data.token

                                chai.request(server)
                                    .delete(
                                        `/api/user/${loginRes.body.data.id}`
                                    )
                                    .set('Authorization', `Bearer ${token}`)
                                    .end((deleteErr, deleteRes) => {
                                        if (deleteErr) return done(deleteErr)
                                        deleteRes.should.have.status(200)
                                        done()
                                    })
                            })
                    })
            })
    })

    it('TC-201-5 Gebruiker succesvol geregistreerd', (done) => {
        chai.request(server)
            .post(endpointToTest)
            .send({
                firstName: 'firstnametest',
                lastName: 'lastnametest',
                isActive: 1,
                emailAdress: 'f.l@server.com',
                password: 'Secret1234',
                phoneNumber: '06 12425495',
                roles: 'editor,guest',
                street: '',
                city: ''
            })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')

                res.body.should.have.property('data').that.is.a('object')
                res.body.should.have.property('message').that.is.a('string')

                const data = res.body.data
                data.should.have.property('firstName').equals('firstnametest')
                data.should.have.property('lastName').equals('lastnametest')
                data.should.have.property('emailAdress')
                data.should.have.property('id').that.is.a('number')
                data.should.have.property('isActive').equals(1)
                data.should.have.property('phoneNumber').equals('06 12425495')
                data.should.have.property('roles').equals('editor,guest')
                data.should.have.property('password').equals('Secret1234')

                // Delete the registered user
                chai.request(server)
                    .delete(endpointToTest + '/' + data.id)
                    .end((err, res) => {
                        res.should.have.status(200)
                        done()
                    })
            })
    })
})
