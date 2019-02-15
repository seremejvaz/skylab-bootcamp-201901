"use strict";

const { expect } = require("chai");

const userApi = require(".");

/**
 *
 * User Api Testing
 *
 */

describe("user api", () => {
  describe("register", () => {
    const name = "Manuel";
    const surname = "Barzi";
    const username = `manuelbarzi-${Math.random()}`;
    const password = "456";

    it("should succeed on correct data", () =>
      userApi
        .register(name, surname, username, password)
        .then(id => expect(id).to.exist));

    it("should fail on already existing user", () =>
      userApi
        .register(name, surname, username, password)
        .then(() => {
          throw Error("should not have passed by here");
        })
        .catch(error => {
          expect(error).to.exist;
          expect(error.message).to.equal(
            `user with username \"${username}\" already exists`
          );
        }));

    it("should fail on empty name", () => {
      expect(() => userApi.register("", surname, username, password)).to.throw(
        Error,
        "name is empty"
      );
    });

    it("should fail when name is a boolean", () => {
      expect(() =>
        userApi.register(true, surname, username, password)
      ).to.throw(Error, "true is not a string");
    });

    it("should fail when surname is a number", () => {
      expect(() => userApi.register(name, 1, username, password)).to.throw(
        Error,
        `1 is not a string`
      );
    });

    it("should fail on empty surname", () => {
      expect(() => userApi.register(name, "", username, password)).to.throw(
        Error,
        "surname is empty"
      );
    });

    it("should fail when username is a boolean", () => {
      expect(() => userApi.register(name, surname, true, password)).to.throw(
        Error,
        `true is not a string`
      );
    });

    it("should fail on empty username", () => {
      expect(() => userApi.register(name, surname, "", password)).to.throw(
        Error,
        "username is empty"
      );
    });

    it("should fail when password is an array", () => {
      expect(() =>
        userApi.register(name, surname, username, [1, 2, 3])
      ).to.throw(Error, `1,2,3 is not a string`);
    });

    it("should fail on empty password", () => {
      expect(() => userApi.register(name, surname, username, "")).to.throw(
        Error,
        "password is empty"
      );
    });
  });

  describe("authenticate", () => {
    const name = "Manuel";
    const surname = "Barzi";
    let username;
    const password = "456";

    const usernameTest = "dasdasdasd";
    const passwordTest = "123";

    let _id;

    beforeEach(() => {
      username = `manuelbarzi-${Math.random()}`;
      return userApi
        .register(name, surname, username, password)
        .then(id => (_id = id));
    });

    it("should succeed on correct data", () =>
      userApi
        .authenticate(username, password)
        .then(({ data: { id, token } }) => {
          expect(id).to.equal(_id);
          expect(token).to.exist;
        }));

    it("should fail on wrong username", () =>
      userApi
        .authenticate(usernameTest, password)
        .then(() => {
          throw Error("should not have passed by here");
        })
        .catch(error => {
          expect(error).to.exist;
          expect(error.message).to.equal(
            `user with username \"${usernameTest}\" does not exist`
          );
        }));

    it("should fail on wrong password", () =>
      userApi
        .authenticate(username, passwordTest)
        .then(() => {
          throw Error("should not have passed by here");
        })
        .catch(error => {
          expect(error).to.exist;
          expect(error.message).to.equal(`username and/or password wrong`);
        }));

    it("should fail when username is a boolean", () => {
      expect(() => userApi.authenticate(true, password)).to.throw(
        Error,
        `true is not a string`
      );
    });

    it("should fail when username is empty", () => {
      expect(() => userApi.authenticate("", password)).to.throw(
        Error,
        `username is empty`
      );
    });

    it("should fail when password is an array", () => {
      expect(() => userApi.authenticate(username, [1, 2, 3])).to.throw(
        Error,
        `1,2,3 is not a string`
      );
    });

    it("should fail when password is empty", () => {
      expect(() => userApi.authenticate(username, "")).to.throw(
        Error,
        `password is empty`
      );
    });
  });

  describe("retrieve", () => {
    const name = "Manuel";
    const surname = "Barzi";
    let username;
    const password = "456";

    let _id, _token;

    beforeEach(() => {
      username = `manuelbarzi-${Math.random()}`;
      return userApi
        .register(name, surname, username, password)
        .then(id => (_id = id))
        .then(() => userApi.authenticate(username, password))
        .then(({ data: { token } }) => (_token = token));
    });

    it("should succeed on correct data", () =>
      userApi.retrieve(_id, _token).then(user => {
        expect(user.id).to.equal(_id);
        expect(user.name).to.equal(name);
        expect(user.surname).to.equal(surname);
        expect(user.username).to.equal(username);
      }));

    it("should fail on wrong token", () => {
      return userApi
        .retrieve(_id, "wrongToken")
        .then(() => {
          throw Error("should not pass by here");
        })
        .catch(({ message }) => expect(message).to.equal(`invalid token`));
    });

    it("should fail on wrong id", () => {
      return userApi
        .retrieve("wrong id", _token)
        .then(() => {
          throw Error("should not pass by here");
        })
        .catch(({ message }) =>
          expect(message).to.equal(
            `token id \"${_id}\" does not match user \"wrong id\"`
          )
        );
    });

    it("should fail on empty id", () => {
      expect(() => userApi.retrieve("", _token)).to.throw(Error, "id is empty");
    });

    it("should fail on empty token", () => {
      expect(() => userApi.retrieve(_id, "")).to.throw(Error, "token is empty");
    });

    it("should fail when id is a number", () => {
      expect(() => userApi.retrieve(1, _token)).to.throw(
        Error,
        `1 is not a string`
      );
    });

    it("should fail when token is a boolean", () => {
      expect(() => userApi.retrieve(_id, true)).to.throw(
        Error,
        `true is not a string`
      );
    });
  });

  describe("update", () => {
    const name = "Manuel";
    const surname = "Barzi";
    let username;
    const password = "456";

    let _id, _token;

    const data = { name: "Pepito", surname: "Grillo", age: 32 };

    beforeEach(() => {
      username = `manuelbarzi-${Math.random()}`;
      return userApi
        .register(name, surname, username, password)
        .then(id => (_id = id))
        .then(() => userApi.authenticate(username, password))
        .then(({ data: { token } }) => (_token = token));
    });

    it("should succeed on correct data", () => {
      return userApi
        .update(_id, _token, data)
        .then(() => userApi.retrieve(_id, _token))
        .then(user => {
          expect(user.id).to.equal(_id);
          expect(user.name).to.equal(data.name);
          expect(user.surname).to.equal(data.surname);
          expect(user.age).to.equal(data.age);
          expect(user.username).to.equal(username);
        });
    });

    it("should fail on wrong id", () => {
      return userApi
        .update("wrong id", _token, data)
        .then(() => {
          throw Error("should not pass by here");
        })
        .catch(({ message }) =>
          expect(message).to.equal(
            `token id \"${_id}\" does not match user \"wrong id\"`
          )
        );
    });

    it("should fail on wrong token", () => {
      return userApi
        .update(_id, "wrong token", data)
        .then(() => {
          throw Error("should not pass by here");
        })
        .catch(({ message }) => expect(message).to.equal(`invalid token`));
    });

    it("should fail on empty id", () => {
      expect(() => userApi.update("", _token, data)).to.throw(
        Error,
        "id is empty"
      );
    });

    it("should fail on empty token", () => {
      expect(() => userApi.update(_id, "", data)).to.throw(
        Error,
        "token is empty"
      );
    });

    it("should fail on empty data", () => {
      expect(() => userApi.update(_id, _token, "")).to.throw(
        Error,
        "data is empty"
      );
    });

    it("should fail when id is a number", () => {
      expect(() => userApi.update(1, _token, data)).to.throw(
        Error,
        `1 is not a string`
      );
    });

    it("should fail when token is a boolean", () => {
      expect(() => userApi.update(_id, true, data)).to.throw(
        Error,
        `true is not a string`
      );
    });

    it("should fail on array as data", () => {
      expect(() => userApi.update(_id, _token, [1, 2, 3])).to.throw(
        Error,
        "1,2,3 is not an object"
      );
    });
  });

  describe("remove", () => {
    const name = "Manuel";
    const surname = "Barzi";
    let username;
    const password = "456";

    let _id, _token;

    beforeEach(() => {
      username = `manuelbarzi-${Math.random()}`;
      return userApi
        .register(name, surname, username, password)
        .then(id => (_id = id))
        .then(() => userApi.authenticate(username, password))
        .then(({ data: { token } }) => (_token = token));
    });

    it("should succeed on correct data", () => {
      return userApi
        .remove(_id, _token, username, password)
        .then(() => userApi.retrieve(_id, _token))
        .then(() => {
          throw Error("should not pass by here");
        })
        .catch(({ message }) =>
          expect(message).to.equal(`user with id \"${_id}\" does not exist`)
        );
    });

    it("should fail on wrong id", () => {
      return userApi
        .remove("wrong id", _token, username, password)
        .then(() => {
          throw Error("should not pass by here");
        })
        .catch(({ message }) =>
          expect(message).to.equal(
            `token id \"${_id}\" does not match user \"wrong id\"`
          )
        );
    });

    it("should fail on wrong token", () => {
      return userApi
        .remove(_id, "wrong token", username, password)
        .then(() => {
          throw Error("should not pass by here");
        })
        .catch(({ message }) => expect(message).to.equal(`invalid token`));
    });

    it("should fail on wrong username", () => {
      return userApi
        .remove(_id, _token, "wrong username", password)
        .then(() => {
          throw Error("should not pass by here");
        })
        .catch(({ message }) =>
          expect(message).to.equal(`username and/or password wrong`)
        );
    });

    it("should fail on wrong password", () => {
      return userApi
        .remove(_id, _token, username, "wrong password")
        .then(() => {
          throw Error("should not pass by here");
        })
        .catch(({ message }) =>
          expect(message).to.equal(`username and/or password wrong`)
        );
    });

    it("should fail on empty id", () => {
      expect(() => userApi.remove("", _token, username, password)).to.throw(
        Error,
        "id is empty"
      );
    });

    it("should fail on empty token", () => {
      expect(() => userApi.remove(_id, "", username, password)).to.throw(
        Error,
        "token is empty"
      );
    });

    it("should fail on empty username", () => {
      expect(() => userApi.remove(_id, _token, "", password)).to.throw(
        Error,
        "username is empty"
      );
    });

    it("should fail on empty password", () => {
      expect(() => userApi.remove(_id, _token, username, "")).to.throw(
        Error,
        "password is empty"
      );
    });

    it("should fail when username is a boolean", () => {
      expect(() => userApi.remove(_id, _token, true, password)).to.throw(
        Error,
        `true is not a string`
      );
    });

    it("should fail when password is an array", () => {
      expect(() => userApi.remove(_id, _token, username, [1, 2, 3])).to.throw(
        Error,
        `1,2,3 is not a string`
      );
    });

    it("should fail when id is a number", () => {
      expect(() => userApi.remove(1, _token, username, password)).to.throw(
        Error,
        `1 is not a string`
      );
    });

    it("should fail when token is a object", () => {
      expect(() =>
        userApi.remove(_id, { wrong: "token" }, username, password)
      ).to.throw(Error, `[object Object] is not a string`);
    });
  });
});
