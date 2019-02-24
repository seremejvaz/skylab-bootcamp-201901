"use strict";

import userApi from ".";

describe("user api", () => {
    
    //este será el test para register cuando lo tenga acabado
    describe("register", () => {
        const username = `serenamejvaz-${Math.random()}`;
        const password = "123";
    
        it("should succeed on correct data", () =>
      userApi
        .register(username, password)
        .then(id => expect(id).toBeDefined())
        .catch(error => expect(error).toBeUndefined()));

    it("should fail on already existing user", () =>
      userApi
        .register(username, password)
        .then(() => {
          throw Error("should not have passed by here");
        })
        .catch(error => {
          expect(error).toBeDefined();
          expect(error.message).toBe(
            `user with username \"${username}\" already exists`
          );
        }));
  });

  describe("auth", () => {
    const username = `serenamejvaz-${Math.random()}`;
    const password = "123";

    let id;

    beforeEach(() =>
        userApi.register(username, password)
            .then(() => id = data.id)
    )

    it("should succeed on correct data", () =>
      userApi
        .auth(username, password)
        .then(data => {
          expect(data.id).toBeDefined();
          expect(data.token).toBeDefined();
        })
        .catch(error => expect(error).toBeUndefined()));

    it("should fail on already invalid user", () =>
      userApi
        .auth("invented3@mail.com", password)
        .then(() => {
          throw Error("should not have passed by here");
        })
        .catch(error => {
          expect(error).toBeDefined();
          expect(error.message).toBe(
            'user with username "invented3@mail.com" does not exist'
          );
        }));
  });

  describe("authorization before each method", () => {
    let tokenTest, idTest;

    beforeEach(() => {
      userApi.auth(username, password)
      .then(data => {
          console.log(data);
            tokenTest = data.token;
            idTest = data.id;
      });
    });

    //retrieve

    describe("retrieve", () => {
      it("should succed on correct data", () =>
        userApi
          .retrieve(tokenTest, idTest)
          .then(user => {
            expect(user.id).toBe(idTest);
            expect(user.username).toBe(username);
          })
          .catch(error => expect(error).toBeUndefined()));

      it("should fail on already invalid token", () =>
        userApi
          .retrieve("111", "222")
          .then(() => {
            throw Error("should not have passed by here");
          })
          .catch(error => {
            expect(error).toBeDefined();
            expect(error.message).toBe("invalid token");
          }));
    });
  });
});
