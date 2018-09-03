const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);
let token;
describe('/api/movie Tests', () => {
    before((done) => {
        token = chai.request(server)
        .post('/authenticate')
        .send({user_name:"hulusi", password: "123456"})
        .end((err,res)=> {
            token = res.body.token;
            console.log(`Servisten gelen token : ${token}`);
            done();
        });
    });
    describe('/ GET Movies', () => {
        it('it sholud be show all movies', (done) => {
            chai.request(server)
            .get('/api/movie')
            .set('x-access-token',token)
            .end((err,res)=> {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });

        });
    });
});