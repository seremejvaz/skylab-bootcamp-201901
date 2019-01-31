'use strict'

import userApi from '.'

describe('user api', () => {
    const username = `serenamejvaz-${Math.random()}`
    const password = '123'

    describe('login', () => {
        it('should succeed on correct data', () =>
            userApi.login(username, password)
                .then(id => expect(id).toBeDefined())
                .catch(error => expect(error).toBeUndefined())
        )

        it('should fail on already existing user', () =>
            userApi.login(username, password)
                .then(() => {
                    throw Error('should not have passed by here')
                })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with username \"${username}\" already exists`)
                })
        )
    });

    describe('auth', () => {
        it('should succeed on correct data', () =>
            userApi.auth(username, password)
                .then(data => {
                    expect(data.id).toBeDefined()
                    expect(data.token).toBeDefined()})
                .catch(error => expect(error).toBeUndefined())
        )

        it('should fail on already invalid user', () =>
            userApi.auth('invented3@mail.com', password)
                .then(() => {
                    throw Error('should not have passed by here')
                })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe("user with username \"invented3@mail.com\" does not exist")
                })
        )
    });
});