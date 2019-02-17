"use strict";

const userApi = require("../user-api");

/**
 * Abstraction of business logic.
 */
class Logic {
  constructor(storage = {}) {
    if (typeof storage !== "object") throw Error(`${storage} is not an Object`);

    this.__storage__ = storage;
  }

  /**
   * Registers a user.
   *
   * @param {string} name
   * @param {string} surname
   * @param {string} email
   * @param {string} password
   * @param {string} passwordConfirmation
   */
  registerUser(name, surname, email, password, passwordConfirmation) {
    if (typeof name !== "string") throw TypeError(name + " is not a string");

    if (!name.trim().length) throw Error("name cannot be empty");

    if (typeof surname !== "string")
      throw TypeError(surname + " is not a string");

    if (!surname.trim().length) throw Error("surname cannot be empty");

    if (typeof email !== "string") throw TypeError(email + " is not a string");

    if (!email.trim().length) throw Error("email cannot be empty");

    if (typeof password !== "string")
      throw TypeError(password + " is not a string");

    if (!password.trim().length) throw Error("password cannot be empty");

    if (typeof passwordConfirmation !== "string")
      throw TypeError(passwordConfirmation + " is not a string");

    if (!passwordConfirmation.trim().length)
      throw Error("password confirmation cannot be empty");

    if (password !== passwordConfirmation)
      throw Error("passwords do not match");

    return userApi.register(name, surname, email, password).then(() => {});
  }

  /**
   * Logs in the user by its credentials.
   *
   * @param {string} email
   * @param {string} password
   */
  logInUser(email, password) {
    if (typeof email !== "string") throw TypeError(email + " is not a string");

    if (!email.trim().length) throw Error("email cannot be empty");

    if (typeof password !== "string")
      throw TypeError(password + " is not a string");

    if (!password.trim().length) throw Error("password cannot be empty");

    return userApi.authenticate(email, password).then(({ id, token }) => {
      this.__storage__.userId = id;
      this.__storage__.userApiToken = token;
    });
  }

  /**I
   * Checks user is logged in.
   */
  get isUserLoggedIn() {
    return !!this.__storage__.userId;
  }

  /**
   * Logs out the user.
   */
  logOutUser() {
    this.__storage__.userId = null;
    this.__storage__.userApiToken = null;
  }

  retrieveUser() {
    return userApi
      .retrieve(this.__storage__.userId, this.__storage__.userApiToken)
      .then(
        ({
          id,
          name,
          surname,
          username: email,
          favoriteArtists = [],
          favoriteAlbums = [],
          favoriteTracks = []
        }) => ({
          id,
          name,
          surname,
          email,
          favoriteArtists,
          favoriteAlbums,
          favoriteTracks
        })
      );
  }

  /**
   *
   * Updates user data.
   *
   * @param {string} id
   * @param {string} token
   * @param {Object} data
   *
   * @throws {TypeError} - When any param is not a string.
   * @throws {Error} - When any param is empty.
   * @throws {Error} - When API returns an error.
   *
   * @returns {String} - Returns an OK or KO status.
   *
   */

  update(id, token, data) {
    if (typeof id !== "string") throw TypeError(`${id} is not a string`);
    if (!id.trim().length) throw Error("id is empty");

    if (typeof token !== "string") throw TypeError(`${token} is not a string`);
    if (!token.trim().length) throw Error("token is empty");

    if (!data) throw Error("data is empty");
    if (data.constructor !== Object)
      throw TypeError(`${data} is not an object`);

    return fetch(`${this.url}/user/${id}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(response => {
        const { status } = response;

        if (status === "OK") return response;
        throw Error(response.error);
      });
  }

  /**
   *
   * Removes a user.
   *
   * @param {string} id
   * @param {string} token
   * @param {string} username
   * @param {string} password
   *
   * @throws {TypeError} - When any param is not a string.
   * @throws {Error} - When any param is empty.
   * @throws {Error} - When API returns an error.
   *
   * @returns {String} - Returns an OK or KO status.
   *
   */

  remove(id, token, username, password) {
    if (typeof id !== "string") throw TypeError(`${id} is not a string`);
    if (!id.trim().length) throw Error("id is empty");

    if (typeof token !== "string") throw TypeError(`${token} is not a string`);
    if (!token.trim().length) throw Error("token is empty");

    if (typeof username !== "string")
      throw TypeError(`${username} is not a string`);
    if (!username.trim().length) throw Error("username is empty");

    if (typeof password !== "string")
      throw TypeError(`${password} is not a string`);
    if (!password.trim().length) throw Error("password is empty");

    return fetch(`${this.url}/user/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json"
      },
      body: JSON.stringify({ username, password })
    })
      .then(response => response.json())
      .then(response => {
        const { status } = response;

        if (status === "OK") return;

        throw Error(response.error);
      });
  }

  /**
     * Search artists.
     * 
     * @param {string} query 
     * @returns {Promise}
     */
    searchArtists(query) {
      if (typeof query !== 'string') throw TypeError(`${query} is not a string`)

      if (!query.trim().length) throw Error('query is empty')

      return spotifyApi.searchArtists(query)
  }

  /**
   * Retrieves an artist.
   * 
   * @param {string} artistId 
   */
  retrieveArtist(artistId) {
      if (typeof artistId !== 'string') throw TypeError(`${artistId} is not a string`)

      if (!artistId.trim().length) throw Error('artistId is empty')

      return spotifyApi.retrieveArtist(artistId)
  }

  /**
   * Retrieves albums from artist.
   * 
   * @param {string} artistId 
   */
  retrieveAlbums(artistId) {
      if (typeof artistId !== 'string') throw TypeError(`${artistId} is not a string`)

      if (!artistId.trim().length) throw Error('artistId is empty')

      return spotifyApi.retrieveAlbums(artistId)
  }

  /**
   * Retrieves an album.
   * 
   * @param {string} albumId 
   */
  retrieveAlbum(albumId) {
      if (typeof albumId !== 'string') throw TypeError(`${albumId} is not a string`)

      if (!albumId.trim().length) throw Error('albumId is empty')

      return spotifyApi.retrieveAlbum(albumId)
  }
  /**
   * Retrieves tracks from album.
   * 
   * @param {string} albumId 
   */
  retrieveTracks(albumId) {
      if (typeof albumId !== 'string') throw TypeError(`${albumId} is not a string`)

      if (!albumId.trim().length) throw Error('albumId is empty')

      return spotifyApi.retrieveTracks(albumId)
  }

  /**
   * Retrieves track.
   * 
   * @param {string} trackId 
   */
  retrieveTrack(trackId) {
      if (typeof trackId !== 'string') throw TypeError(`${trackId} is not a string`)

      if (!trackId.trim().length) throw Error('trackId is empty')

      return spotifyApi.retrieveTrack(trackId)
  }
}

module.exports = Logic;
