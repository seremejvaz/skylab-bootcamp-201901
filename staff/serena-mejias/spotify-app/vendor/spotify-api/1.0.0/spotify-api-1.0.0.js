"use strict";
//TOKEN!!


/**
 * Duckling API client.
 *
 * @version 2.1.0
 */
var spotifyApi = {
    token: 'no token',
  /**
   * Searches ducklings.
   *
   * @param {string} query - The text to match on search.
   * @param {function} callback - The expression to evaluate on response. If error first
   * argument informs the error message, othwerwise first argument is undefined and second argument provides the matching
   * results.
   */
  searchArtists(query, callback) {
    fetch(`https://api.spotify.com/v1/search?q=${query}&type=artists`, {
      method: "GET",
      headers: {
        authorization:
          "Bearer BQDnJ7zBCSsrYQ-Aa41q8C9zQtL_2bk8N5sW9QYQ2e4DGd_WQMT5X4SnwE9oegJIeU24fn4fV5XwoRQFIiKe9XnBmbwhs9yvC0R9bYvi0mooC77aNWWVPR4RkINEKDKpSFgJh0qLt2OST2eIxxPf"
      }
    })
      .then(res => res.json())
      .then(({ artists: { items } }) => callback(undefined, items));
  }
  /** TODO
     * Searches ducklings.
     *
     * @param {string} query - The text to match on search.
     * @param {function} callback - The expression to evaluate on response. If error first
     * argument informs the error message, othwerwise first argument is undefined and second argument provides the matching
     * results.
     */
    retrieveAlbums(query, callback) {
      fetch(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
        method: "GET",
        headers: {
          authorization:
            "Bearer BQDnJ7zBCSsrYQ-Aa41q8C9zQtL_2bk8N5sW9QYQ2e4DGd_WQMT5X4SnwE9oegJIeU24fn4fV5XwoRQFIiKe9XnBmbwhs9yvC0R9bYvi0mooC77aNWWVPR4RkINEKDKpSFgJh0qLt2OST2eIxxPf"
        }
      })
        .then(res => res.json())
        .then(({ artists: { items } }) => callback(undefined, items));
    }
};
