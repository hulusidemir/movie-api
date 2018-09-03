const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);
let token,movieId;
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

    describe('/ POST Movies',()=> {
        it('it should be post a movie',(done)=> {
            const film = {
                title: 'Test Movie',
                category: 'Test Movies Category',
                country: 'Türkiye',
                year:1950,
                imbdb_score: 10
            };
            chai.request(server)
            .post('/api/movie')
            .send(film)
            .set('x-access-token',token)
            .end((err,res)=> {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title');
                res.body.should.have.property('category');
                res.body.should.have.property('country');
                res.body.should.have.property('year');
                res.body.should.have.property('imbdb_score');
                movieId = res.body._id;
                done();
            });
        });
    });
    describe('api/movie/:movie_id',()=> {
        it('it should be show movie given by id',(done)=> {
            chai.request(server)
            .get('/api/movie/'+movieId)
            .set('x-access-token',token)
            .end((err,res)=> {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title');
                res.body.should.have.property('category');
                res.body.should.have.property('country');
                res.body.should.have.property('year');
                res.body.should.have.property('imbdb_score');
                res.body.should.have.property('_id').eql(movieId);
                done();
                
            });
        });
    });
    describe('/ PUT Movies',()=> {
        it('it should be put a movie given by id',(done)=> {
            const film = {
                title: 'Test Güncellenen Movie',
                category: 'Test Güncellenen Movies Category',
                country: 'Amerika',
                year:1952,
                imbdb_score: 8
            };
            chai.request(server)
            .put('/api/movie/'+ movieId)
            .send(film)
            .set('x-access-token',token)
            .end((err,res)=> {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title').eql(film.title);
                res.body.should.have.property('category').eql(film.category);
                res.body.should.have.property('country').eql(film.country);
                res.body.should.have.property('year').eql(film.year);
                res.body.should.have.property('imbdb_score').eql(film.imbdb_score);
                done();
            });
        });
    });

    describe('/ DELETE Movie',()=> {
        it('it should be delete a movie given by id',(done)=> {
            chai.request(server)
            .delete('/api/movie/'+ movieId)
            .set('x-access-token',token)
            .end((err,res)=> {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql(1);
                done();
            });
        });
    });

});