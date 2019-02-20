const uuid = require("uuid/v4");
const fs = require("fs");
const path = require("path");

const artistComment = {
  add(comment) {
    const id = uuid();
    comment.id = id;

    const file = path.join(__dirname, "artist-comments.json");

    return new Promise((resolve, reject) =>
      fs.readFile(file, "utf8", (err, data) => {
        if (err) {
          reject(err);
        } else {
          data = JSON.parse(data);
          data.push(comment);
          const json = JSON.stringify(data);
          fs.writeFile(file, json, err => {
            if (err) {
              reject(err);
            }
          });
        }
        resolve(comment.id);
      })
    );
  },

  retrieve(id) {
    const file = path.join(__dirname, "artist-comments.json");

    return new Promise((resolve, reject) =>
      fs.readFile(file, "utf8", (err, data) => {
        if (err) {
          reject(err);
        } else {
          obj = JSON.parse(data);
          obj = obj.find(com => com.id === id);
          obj = obj? obj : null
          resolve(obj);
        }
      })
    );
  },

  update(comment) {
    const file = path.join(__dirname, "artist-comments.json");

    return new Promise((resolve, reject) =>
      fs.readFile(file, "utf8", (err, data) => {
        if (err) {
          reject(err);
        } else {
          let array = JSON.parse(data);
          let obj = array.find(com => com.id === comment.id);
          const commentIndex = array.indexOf(obj);
          array.splice(commentIndex, 1, comment)
          updateComments = JSON.stringify(array);

          fs.writeFile(file, updateComments, err => {
            if (err) reject(err);
          });
          resolve(obj);
        }
      })
    );
  },

  delete(id) {
    
    const file = path.join(__dirname, "artist-comments.json");

    return new Promise((resolve, reject) =>
      fs.readFile(file, "utf8", (err, data) => {
        if (err) {
          reject(err);
        } else {
          let array = JSON.parse(data);
          let obj = array.find(com => com.id === id);
          const commentIndex = array.indexOf(obj);
          array.splice(commentIndex, 1)
          updateComments = JSON.stringify(array);

          fs.writeFile(file, updateComments, err => {
            if (err) reject(err);
          });
          resolve(obj);
        }
      })
    );
  },

  find(id) {
      
  }


};

module.exports = artistComment;
