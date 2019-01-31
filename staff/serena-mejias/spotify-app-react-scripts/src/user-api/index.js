'use strict'

const userApi = {
    /*register(username, password) {
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (!username.trim().length) throw Error('username is empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (!password.trim().length) throw Error('password is empty')

        return fetch('https://skylabcoders.herokuapp.com/api/user', { 
            method: 'POST', 
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then(response => response.json())
            .then(response => {
                const { status } = response
                
                if (status === 'OK') return response.data.id
                else throw Error(response.error)
            })
    }*/

    login(username, password) {
        if(typeof username !== 'string') throw TypeError(`${username} is not string`);
        if(!username.trim().length) throw Error ('username is empty');

        if(typeof password !== 'string') throw TypeError (`${password} is not string`);
        if(!password.trim().length) throw Error ('password is empty');

        return fetch('https://skylabcoders.herokuapp.com/api/user', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body:JSON.stringify({username, password})
        })
        .then(response => response.json())
        .then(response => {
            const{ status } = response
             
             if(status === 'OK') {
                 return response.data.id
            } else {
                throw Error(response.error)
            }
        })

    },

    auth(username,password) {
        if (typeof username !== 'string') throw TypeError(username + ' is not a string');
        if (!username.trim().length) throw Error('username cannot be empty');
        if (typeof password !== 'string') throw TypeError(password + ' is not a string');
        if (!password.trim().length) throw Error('password is empty');

        return fetch('https://skylabcoders.herokuapp.com/api/auth', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body:JSON.stringify({username, password})
        })
        .then(response => response.json())
        .then(response => {
            const{ status } = response
             
             if(status === 'OK') {
                 return response.data
            } else {
                throw Error(response.error)
            }
        })
    }
}
export default userApi