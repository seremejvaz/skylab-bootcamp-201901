"use strict";

const { ObjectId } = require("mongodb");

const user = {
  collection: null,

  add(user) {
    const { name, surname, email, password } = user;

    if (typeof name !== "string") throw TypeError(`${name} is not a string`);
    if (!name.trim().length) throw Error("name is empty");

    if (typeof surname !== "string")
      throw TypeError(`${surname} is not a string`);
    if (!surname.trim().length) throw Error("surname is empty");

    if (typeof email !== "string") throw TypeError(`${email} is not a string`);
    if (!email.trim().length) throw Error("email is empty");

    if (typeof password !== "string")
      throw TypeError(`${password} is not a string`);
    if (!password.trim().length) throw Error("password is empty");

    return this.collection
      .insertOne(user)
      .then(res => res.insertedId.toString());
  },

  findByEmail(email) {
    if (typeof email !== "string") throw TypeError(`${email} is not a string`);
    if (!email.trim().length) throw Error("email is empty");
    return this.collection.findOne({ email }).then(user => {
      if (!user) return null;
      user.id = user._id.toString();
      delete user._id;
      return user;
    });
  },

  findById(userId) {
    return this.collection.findOne({ _id: ObjectId(userId) }).then(user => {
      if (!user) return null;
      user.id = user._id.toString();
      delete user._id;
      return user;
    });
  },

  update(userId, data) {
    if (userId === undefined || userId === null)
      throw Error("id should be defined");
   // if (typeof userId !== "string")
      //throw TypeError(`${userId} should be a string`);
    if (!data) throw Error("data is not defined");
    if (data.constructor !== Object)
      throw TypeError(`${data} should be an object`);

    /*db.collection.findOneAndUpdate(
   <filter>,
   <update>,
)*/
    return this.collection.findOneAndUpdate(
      { _id: ObjectId(userId) },
      { $set: data }
    );
  },

  remove(userId) {
    if (userId === undefined || userId === null)
      throw Error("id should be defined");
    if (typeof userId !== "string")
      throw TypeError(`${userId} should be a string`);
    return this.collection.deleteOne({ _id: ObjectId(userId) });
  }
};

module.exports = user;
