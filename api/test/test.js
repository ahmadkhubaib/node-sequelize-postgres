import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import app from '../index';

chai.use(chatHttp);
const { expect } = chai;

describe('Testing the person endpoints:', () => {
    it('It should create a person', (done) => {
        const person = {
            firstName: 'Ahmad',
            lastName: 'Hassan',
            profession: 'Artist'
        };
        chai
            .request(app)
            .post('/api/v1/persons')
            .set('Accept', 'application/json')
            .send(person)
            .end((err, res) => {
                expect(res.status).to.equal(201);
                expect(res.body.data).to.include({
                    id: 1,
                    firstName: person.firstName,
                    lastName: person.lastName,
                    profession: person.profession
                });
                done();
            });
    });

    it('It should not create a person with incomplete parameters', (done) => {
        const person = {
            lastName: 'Person Last name',
            profession: 'stupid'
        };
        chai
            .request(app)
            .post('/api/v1/persons')
            .set('Accept', 'application/json')
            .send(person)
            .end((err, res) => {
                expect(res.status).to.equal(400);
                done();
            });
    });

    it('It should get all persons', (done) => {
        chai
            .request(app)
            .get('/api/v1/persons')
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                res.body.data[0].should.have.property('id');
                res.body.data[0].should.have.property('firstName');
                res.body.data[0].should.have.property('lastName');
                res.body.data[0].should.have.property('profession');
                done();
            });
    });

    it('It should get a particular person', (done) => {
        const personId = 1;
        chai
            .request(app)
            .get(`/api/v1/persons/${personId}`)
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                res.body.data.should.have.property('id');
                res.body.data.should.have.property('firstName');
                res.body.data.should.have.property('lastName');
                res.body.data.should.have.property('profession');
                done();
            });
    });

    it('It should not get a particular person with invalid id', (done) => {
        const personId = 8888;
        chai
            .request(app)
            .get(`/api/v1/persons/${personId}`)
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(404);
                res.body.should.have
                    .property('message')
                    .eql(`Cannot find person with the id ${personId}`);
                done();
            });
    });

    it('It should not get a particular person with non-numeric id', (done) => {
        const personId = 'aaa';
        chai
            .request(app)
            .get(`/api/v1/persons/${personId}`)
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(400);
                res.body.should.have
                    .property('message')
                    .eql('Please input a valid numeric value');
                done();
            });
    });

    it('It should update a person', (done) => {
        const personId = 1;
        const updatedperson = {
            id: personId,
            firstName: 'AHMAD',
            lastName: 'ALI',
            profession: 'Tester'
        };
        chai
            .request(app)
            .put(`/api/v1/persons/${personId}`)
            .set('Accept', 'application/json')
            .send(updatedperson)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.data.id).equal(updatedperson.id);
                expect(res.body.data.firstName).equal(updatedperson.firstName);
                expect(res.body.data.lastName).equal(updatedperson.lastName);
                expect(res.body.data.profession).equal(updatedperson.profession);
                done();
            });
    });

    it('It should not update a person with invalid id', (done) => {
        const personId = '9999';
        const updatedperson = {
            id: personId,
            firstName: 'Hamza',
            lastName: 'Ali',
            profession: 'stupid'
        };
        chai
            .request(app)
            .put(`/api/v1/persons/${personId}`)
            .set('Accept', 'application/json')
            .send(updatedperson)
            .end((err, res) => {
                expect(res.status).to.equal(404);
                res.body.should.have
                    .property('message')
                    .eql(`Cannot find person with the id: ${personId}`);
                done();
            });
    });

    it('It should not update a person with non-numeric id value', (done) => {
        const personId = 'ggg';
        const updatedperson = {
            id: personId,
            firstName: 'Hamza',
            lastName: 'Ali',
            profession: 'stupid'
        };
        chai
            .request(app)
            .put(`/api/v1/persons/${personId}`)
            .set('Accept', 'application/json')
            .send(updatedperson)
            .end((err, res) => {
                expect(res.status).to.equal(400);
                res.body.should.have
                    .property('message')
                    .eql('Please input a valid numeric value');
                done();
            });
    });

    it('It should delete a person', (done) => {
        const personId = 1;
        chai
            .request(app)
            .delete(`/api/v1/persons/${personId}`)
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.data).to.include({});
                done();
            });
    });

    // it('It should not delete a person with invalid id', (done) => {
    //     const personId = 777;
    //     chai
    //         .request(app)
    //         .delete(`/api/v1/persons/${personId}`)
    //         .set('Accept', 'application/json')
    //         .end((err, res) => {
    //             expect(res.status).to.equal(404);
    //             res.body.should.have
    //                 .property('message')
    //                 .eql(`person with the id ${personId} cannot be found`);
    //             done();
    //         });
    // });

    it('It should not delete a person with non-numeric id', (done) => {
        const personId = 'bbb';
        chai
            .request(app)
            .delete(`/api/v1/persons/${personId}`)
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(400);
                res.body.should.have
                    .property('message')
                    .eql('Please provide a numeric value');
                done();
            });
    });
});
