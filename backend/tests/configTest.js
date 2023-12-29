import app from './../server.js'
import chai from 'chai'
import chaiHttp from 'chai-http'
import supertest from 'supertest'

const request = supertest(app);
chai.use(chaiHttp);
const expect = chai.expect

export {request, expect}