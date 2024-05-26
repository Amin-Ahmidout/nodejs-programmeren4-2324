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


    it('TC-301-1 Verplicht veld ontbreekt bij toevoegen maaltijd', (done) => {
        const token = jwt.sign({ id: 1 }, jwtSecretKey, { expiresIn: '1h' });
    
        // Maaltijdgegevens zonder het verplichte veld 'name'
        const incompleteMealData = {
            description: 'Heerlijke pasta met bolognesesaus',
            price: 8.50,
            dateTime: '2024-05-26 18:00:00',
            maxAmountOfParticipants: 10,
            imageUrl: 'https://example.com/image.jpg',
            isActive: true,
            isVega: false,
            isVegan: false,
            isToTakeHome: true,
            allergenes: 'gluten'
        };
    
        chai.request(server)
            .post('/api/meal')
            .set('Authorization', `Bearer ${token}`)
            .send(incompleteMealData)
            .end((err, res) => {
                if (err) {
                    console.error('Error creating meal:', err);
                } else {
                    console.log('Create meal response:', res.body);
                }
    
                // We verwachten een 400 status omdat een verplicht veld ontbreekt
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message').that.is.a('string');
                expect(res.body.message).to.equal('Missing required field(s): name');
                expect(res.body).to.have.property('data').that.is.empty;
                done();
            });
    });
    

    
    it('TC-301-2 Gebruiker is niet ingelogd', (done) => {
        const mealData = {
            name: 'Pasta Bolognese',
            description: 'Heerlijke pasta met bolognesesaus',
            price: 8.50,
            dateTime: '2024-05-26 18:00:00',
            maxAmountOfParticipants: 10,
            imageUrl: 'https://example.com/image.jpg',
            isActive: true,
            isVega: false,
            isVegan: false,
            isToTakeHome: true,
            allergenes: 'gluten'
        };
    
        chai.request(server)
            .post('/api/meal')
            .send(mealData)
            .end((err, res) => {
                if (err) {
                    console.error('Error creating meal:', err);
                } 
    
                
                expect(res).to.have.status(401);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message').that.is.a('string');
                expect(res.body.message).to.equal('No token provided!');
                expect(res.body).to.have.property('data').that.is.empty;
                done();
            });
    });
    
    
    it('TC-301-3 Maaltijd succesvol aangemaakt', (done) => {
        const token = jwt.sign({ id: 1 }, jwtSecretKey, { expiresIn: '1h' });
        
        const mealData = {
            name: 'Pasta Bolognese',
            description: 'Heerlijke pasta met bolognesesaus',
            price: 8.50,
            dateTime: '2024-05-26 18:00:00',
            maxAmountOfParticipants: 10,
            imageUrl: 'https://example.com/image.jpg'
        };
    
        chai.request(server)
            .post('/api/meal')
            .set('Authorization', `Bearer ${token}`)
            .send(mealData)
            .end((err, res) => {
                if (err) {
                    console.error('Error creating meal:', err);
                } 
    
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('data').that.is.an('object');
                expect(res.body.data).to.have.property('cookId').that.equals(1);
                done();
            });
    });
    
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






    
    
   

     

    


    
