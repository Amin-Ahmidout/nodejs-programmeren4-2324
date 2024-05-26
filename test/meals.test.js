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
    
        // Voeg een nieuwe maaltijd toe
        chai.request(server)
            .post('/api/meal')
            .set('Authorization', `Bearer ${token}`)
            .send(mealData)
            .end((err, res) => {
                if (err) {
                    console.error('Error creating meal:', err);
                    return done(err);
                }
    
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('data').that.is.an('object');
                expect(res.body.data).to.have.property('cookId').that.equals(1);
    
                const mealId = res.body.data.id;
                
                // Verwijder de gecreëerde maaltijd
                chai.request(server)
                    .delete(`/api/meal/${mealId}`)
                    .set('Authorization', `Bearer ${token}`)
                    .end((err, res) => {
                        if (err) {
                            console.error('Error deleting meal:', err);
                            return done(err);
                        }
    
                        expect(res).to.have.status(200);
                        done();
                    });
            });
    });
    
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

    it.skip('TC-304-2 Gegevens succesvol geretourneerd', (done) => {
        // Eerst maken we een nieuwe maaltijd aan
        const token = jwt.sign({ id: 1 }, jwtSecretKey, { expiresIn: '1h' });
    
        const newMealData = {
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
    
        // Voeg een nieuwe maaltijd toe
        chai.request(server)
            .post('/api/meal')
            .set('Authorization', `Bearer ${token}`)
            .send(newMealData)
            .end((err, res) => {
                if (err) {
                    console.error('Error creating meal:', err);
                    return done(err);
                } 
    
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('data').that.is.an('object');
                expect(res.body).to.have.property('message').that.is.a('string');
                expect(res.body.message).to.equal(`Meal created with ID ${res.body.data.id}.`);
    
                const mealId = res.body.data.id;
    
                // Vraag de maaltijd op met de gegenereerde ID
                chai.request(server)
                    .get(`/api/meal/${mealId}`)
                    .set('Authorization', `Bearer ${token}`)
                    .end((err, res) => {
                        if (err) {
                            console.error('Error retrieving meal:', err);
                            return done(err);
                        }
    
                        // We verwachten een 200 status omdat de maaltijd succesvol is opgehaald
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('data').that.is.an('object');
                        expect(res.body).to.have.property('message').that.is.a('string');
                        expect(res.body.message).to.equal(`Found meal with ID ${mealId}.`);
                        
                        // Controleer of de teruggegeven gegevens overeenkomen met de ingevoerde gegevens
                        const retrievedMeal = res.body.data;
                        expect(retrievedMeal).to.have.property('id').that.equals(mealId);
                        expect(retrievedMeal).to.have.property('name').that.equals(newMealData.name);
                        expect(retrievedMeal).to.have.property('description').that.equals(newMealData.description);
                        expect(retrievedMeal).to.have.property('price').that.equals(newMealData.price);
                        expect(retrievedMeal).to.have.property('maxAmountOfParticipants').that.equals(newMealData.maxAmountOfParticipants);
                        expect(retrievedMeal).to.have.property('imageUrl').that.equals(newMealData.imageUrl);
                        expect(retrievedMeal).to.have.property('isActive').that.equals(newMealData.isActive);
                        expect(retrievedMeal).to.have.property('isVega').that.equals(newMealData.isVega);
                        expect(retrievedMeal).to.have.property('isVegan').that.equals(newMealData.isVegan);
                        expect(retrievedMeal).to.have.property('isToTakeHome').that.equals(newMealData.isToTakeHome);
                        expect(retrievedMeal).to.have.property('allergenes').that.equals(newMealData.allergenes);
    
                        // Verwijder de gecreëerde maaltijd
                        chai.request(server)
                            .delete(`/api/meal/${mealId}`)
                            .set('Authorization', `Bearer ${token}`)
                            .end((err, res) => {
                                if (err) {
                                    console.error('Error deleting meal:', err);
                                    return done(err);
                                }
    
                                expect(res).to.have.status(200);
                                expect(res.body).to.be.an('object');
                                expect(res.body).to.have.property('message').that.is.a('string');
                                expect(res.body.message).to.equal(`Meal deleted with ID ${mealId}.`);
    
                                done();
                            });
                    });
            });
    });
    
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



})
