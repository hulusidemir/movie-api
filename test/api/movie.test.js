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

    describe('/POST Movie',()=> {
        it('it should be post a movie',(done)=> {
            const movie = {
                title : 'Testimizin Testi',
                category: 'Testimizin Kategorisi',
                year: 1980,
                imdb_score: 10,
                director_id: 2342423
            }
            chai.request(server)
            .post('/api/movie')
            .send(movie)
            .set('x-access-token',token)
            .end((err,res)=> {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title');
                res.body.should.have.property('category');
                res.body.should.have.property('year');
                res.body.should.have.property('imdb_score');
                done();
            });

        });
    });
});