/**
 * Pokemons.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    nombre: {
      type: "string",
      required: true
    },
    fotoUrl: {
      type: "string",
      unique: true
    },
    fotoUrlFd: {
      type: "string",
      unique: true
    },
    url: {
      type: "string",
      unique: true
    },
    dueno: {
      model: "User"
    },
    tipo: {
      type: "string"
    }
  }
};

