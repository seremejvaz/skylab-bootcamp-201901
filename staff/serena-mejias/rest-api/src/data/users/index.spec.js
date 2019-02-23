"use strict";

require("dotenv").config();

const { MongoClient, ObjectId } = require("mongodb");
const users = require(".");
const { expect } = require("chai");

const {
  env: { DB_URL }
} = process;

describe("user", () => {
  let client;

  before(() =>
    MongoClient.connect(DB_URL, { useNewUrlParser: true }).then(_client => {
      client = _client;
      users.collection = client.db().collection("users");
    })
  );

  beforeEach(() => users.collection.deleteMany());

  xdescribe("add", () => {
    const _user = {
      name: "Tachi",
      surname: "Melodin",
      email: "tachito",
      password: "meguhtalagasssolina"
    };

    it("should succeed on correct data", () =>
      users
        .add(_user)
        .then(id => {
          expect(id).to.exist;
          expect(id).to.be.a("string");

          return users.collection.findOne({ _id: ObjectId(id) });
        })
        .then(({ name, surname, email, password }) => {
          expect(name).to.equal(_user.name);
          expect(surname).to.equal(_user.surname);
          expect(email).to.equal(_user.email);
          expect(password).to.equal(_user.password);
        }));
  });

  xdescribe("findByEmail", () => {
    const _user = {
      name: "Tachi",
      surname: "Melodin",
      email: "tachito",
      password: "meguhtalagasssolina"
    };

    beforeEach(() => users.collection.insertOne(_user));

    it("should succeed on correct data", () =>
      users
        .findByEmail(_user.email)
        .then(({ id, _id, name, surname, email, password }) => {
          expect(id).to.exist;
          expect(id).to.be.a("string");
          expect(_id).not.to.exist;
          expect(name).to.equal(_user.name);
          expect(surname).to.equal(_user.surname);
          expect(email).to.equal(_user.email);
          expect(password).to.equal(_user.password);
        }));

    it("should resolve null on non matching email", () =>
      users
        .findByEmail("unknown@mail.com")
        .then(user => expect(user).to.be.null));
  });

  describe("findById", () => {
    const _user = {
      name: "Tachi",
      surname: "Melodin",
      email: "tachito",
      password: "meguhtalagasssolina"
    };

    let userId;

    beforeEach(() => {
      users.collection.insertOne(_user).then(res => {
        userId = res.insertedId.toString();
      });
    });

    it("should succeed on correct data", () => {
      console.log("Doing test");

      users.findById(userId).then(user => {
        expect(user.id).to.exist;
        expect(user.id).to.be.a("string");
        expect(user._id).not.to.exist;
        expect(user.name).to.equal(_user.name);
        expect(user.surname).to.equal(_user.surname);
        expect(user.email).to.equal(_user.email);
        expect(user.password).to.equal(_user.password);
      });
    });

    xit("should resolve null on non matching email", () =>
      users.findById("-123-123-").then(user => expect(user).to.be.null));
  });

  xdescribe("update", () => {
    const _user = {
      name: "Tachi",
      surname: "Melodin",
      email: "tachito",
      password: "meguhtalagasssolina"
    };

    beforeEach(() =>
      users.collection
        .insertOne(_user)
        .then(res => (_user.id = res.insertedId.toString()))
    );

    it("should succeed on correct data", () => {
      const data = { name: "testUsername" };
      return users
        .update(_user.id, data)
        .then(() => users.findById(userId))
        .then(user => {
          expect(user).to.exist;
          expect(user.id).to.be.a("string");
          expect(user.name).to.equal(data.name);
          expect(user.surname).to.equal(data.surname);
          expect(user.email).to.equal(data.email);
          expect(user.password).to.equal(data.password);
        });
    });
  });

  xdescribe("remove", () => {
    const _user = {
      name: "Tachi",
      surname: "Melodin",
      email: "tachito",
      password: "meguhtalagasssolina"
    };

    beforeEach(() =>
      users.collection
        .insertOne(_user)
        .then(res => (userId = res.insertedId.toString()))
    );

    it("should succeed removing user", () => {
      return users
        .remove(user.id)
        .then(() => users.findOne({ _id: ObjectId(userId) }))
        .then(res => expect(res).to.be.null);
    });
  });

  after(() => users.collection.deleteMany().then(() => client.close()));
});
