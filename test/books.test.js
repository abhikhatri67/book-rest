const chai = require("chai");
const chaiHttp = require("chai-http");
const { response } = require("express");
const server = require("../server");
const Book = require("../model/book");

// Assertion
chai.use(chaiHttp);
let should = chai.should();

describe("Books Rest API", () => {
  // Testing GET route.
  beforeEach((done) => {
    //Before each test we empty the database
    Book.deleteMany({}, (err) => {
      done();
    });
  });

  /*
   * Test the /GET route
   */
  describe("/GET books", () => {
    it("it should GET all the books", (done) => {
      chai
        .request(server)
        .get("/books")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });

    /*
     * Test the /POST route
     */
    describe("/POST book", () => {
      it("it adds a book in db", (done) => {
        let book = {
          title: "Harry Potter",
          author: "J.K Rowling",
          isbn: 987654321,
          _id: 987654321,
        };
        chai
          .request(server)
          .post("/books")
          .send(book)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a("object");
            res.body.should.have.property("title");
            res.body.should.have.property("author");
            res.body.should.have.property("isbn");
            done();
          });
      });
    });

    /*
     * Test the /GET/:id route
     */
    describe("/GET/:id book", () => {
      it("it should GET a book by the given id", (done) => {
        const book = new Book({
          _id: 987654321,
          author: "J.K Rowling",
          title: "Harry Potter",
          isbn: 987654321,
        });
        book.save((err, book) => {
          chai
            .request(server)
            .get("/books/" + book._id)
            .send(book)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("object");
              res.body.should.have.property("title");
              res.body.should.have.property("author");
              res.body.should.have.property("_id").eql(book.isbn);
              done();
            });
        });
      });
    });
  });
});
