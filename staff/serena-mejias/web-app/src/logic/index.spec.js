"use strict";

const logic = require("./index");
const { expect } = require("chai");

describe("logic testing", () => {
  describe("register", () => {
    let name = "Manuel";
    let surname = "Barzi";
    let email = `manuelbarzi@mail.com-${Math.random()}`;
    let password = "123";
    let passwordConfirm = password;

    it("should succed on correct data", () =>
      logic
        .registerUser(name, surname, email, password, passwordConfirm)
        .then(result => expect(result).not.to.exist));

    it("should fail on empty name", () =>
      expect(() => logic.registerUser("", surname, email, password)).to.throw(
        Error,
        "name is empty"
      ));

    it("should fail on empty surname", () =>
      expect(() => logic.registerUser(name, "", email, password)).to.throw(
        Error,
        "surname is empty"
      ));

    it("should fail on empty email", () =>
      expect(() => logic.registerUser(name, surname, "", password)).to.throw(
        Error,
        "email is empty"
      ));

    it("should fail on empty password", () => {
      expect(() => logic.registerUser(name, surname, email, "")).to.throw(
        Error,
        "password is empty"
      );
    });

    it("should fail when name is a number", () =>
      expect(() => logic.registerUser(1, surname, email, password)).to.throw(
        Error,
        "1 is not a string"
      ));

    it("should fail when surname is a bolean", () =>
      expect(() => logic.registerUser(name, true, email, password)).to.throw(
        Error,
        "true is not a string"
      ));

    it("should fail when email is an array", () =>
      expect(() => logic.registerUser(name, surname, [1, 2, 3], password)).to.throw(
        Error,
        "1,2,3 is not a string"
      ));

    it("should fail when password is an object", () =>
      expect(() =>
        logic.registerUser(name, surname, email, { wrong: "password" })
      ).to.throw(Error, "[object Object] is not a string"));
  });

  describe("login", () => {
    const name = "Manuel";
    const surname = "Barzi";
    let email;
    const password = "789";
    const passwordConfirm = password;

    const emailTest = "dasdasdasd";
    const passwordTest = "111";

    beforeEach(() => {
      email = `manuelbarzi@mail.com-${Math.random()}`;
      return logic.registerUser(name, surname, email, password, passwordConfirm);
    });

    it("should succeed on correct credentials", () =>
      logic.loginInUser(email, password).then(() => {
        expect(logic.__userId__).to.exist;
        expect(logic.__userApiToken__).to.exist;
      }));

    it("should fail on wrong email", () =>
      logic
        .loginInUser(emailTest, password)
        .then(() => {
          throw Error("should not have passed by here");
        })
        .catch(error => {
          expect(error).to.exist;
          expect(error.message).to.equal(
            `user with username \"dasdasdasd\" does not exist`
          );
        }));

    it("should fail on wrong password", () =>
      logic
        .loginInUser(email, passwordTest)
        .then(() => {
          throw Error("should not have passed by here");
        })
        .catch(error => {
          expect(error).to.exist;
          expect(error.message).to.equal(`username and/or password wrong`);
        }));

    it("should fail on empty email", () =>
      expect(() => logic.loginInUser("", password)).to.throw(
        Error,
        "email is empty"
      ));

    it("should fail on empty password", () => {
      expect(() => logic.loginInUser(email, "")).to.throw(Error, "password is empty");
    });

    it("should fail when email is an array", () =>
      expect(() => logic.loginInUser([1, 2, 3], password)).to.throw(
        Error,
        "1,2,3 is not a string"
      ));

    it("should fail when password is an object", () =>
      expect(() => logic.loginInUser(email, { wrong: "password" })).to.throw(
        Error,
        "[object Object] is not a string"
      ));
  });

  describe("retrieveUser", () => {
    const name = "Manuel";
    const surname = "Barzi";
    let email;
    const password = "123";
    const passwordConfirm = password;

    beforeEach(() => {
      email = `manuelbarzi@mail.com-${Math.random()}`;

      return logic
        .registerUser(name, surname, email, password, passwordConfirm)
        .then(() => logic.loginInUser(email, password));
    });

    it("should succeed with correct credentials", () =>
      logic
        .retrieveUser(logic.__userId__, logic.__userApiToken__)

        .then(data => {
          expect(data).to.exist;
        }));
  });

  describe("updateUser", () => {
    const name = "Manuel";
    const surname = "Barzi";
    let email;
    const password = "123";
    const passwordConfirm = password;
    const data = { favourites: [{ id: "1011334", name: "3-D Man" }] };

    beforeEach(() => {
      email = `manuelbarzi@mail.com-${Math.random()}`;

      return logic.register(name, surname, email, password, passwordConfirm)
        .then(() => logic.loginInUser(email, password))
    });

    it("should succed pushing new data", () => {
      return logic.updateUser(data)
        .then(data => {
          expect(data).to.exist()
          expect(data.status).to.equal("OK")})
    });

    it("should fail when data is not an object", () => {
        expect(() => logic.updateUser(12)).to.throw(Error, "12 is not an object");
    });

  });

});
