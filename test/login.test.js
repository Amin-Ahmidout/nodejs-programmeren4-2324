const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')
const tracer = require('tracer')
const expect = chai.expect
const assert = require('assert')

chai.should()
chai.use(chaiHttp)
tracer.setLevel('warn')

it('TC-101-1 Verplicht veld ontbreekt'), (done) => {

}
