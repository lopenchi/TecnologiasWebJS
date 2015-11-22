/**
 * PokemonsController
 *
 * @description :: Server-side logic for managing Pokemons
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  guardarPokemon: function (req, res) {
    var params = req.allParams();
    sails.log.info("Nombre:", params.nombre, "Foto Pokemon:", params.fotoPokemon, "Usuario: ", req.session.user.nombre);

    if (params.nombre === undefined) {
      sails.log.error("Pokemon no tiene nombre");
      alert("Pokemon no tiene nombre");
      return;
    } else {

      var deleteFd = 'D:\\EPN Desaroollo\\Tecnologias Web con JS\\TecWebJav_2015_B\\ArchivosSesionEPN\\assets\\images\\pokemons';
      sails.log.info('Perfil: ', params.fotoPokemon);

      req.file('fotoPokemon').upload({
        // don't allow the total upload size to exceed ~10MB
        dirname: '../../assets/images/pokemons',
        maxBytes: 10000000
      }, function whenDone(err, uploadedFiles) {
        if (err) {
          return res.negotiate(err);
        }

        // If no files were uploaded, respond with an error.
        if (uploadedFiles.length === 0) {
          return res.badRequest('No file was uploaded');
        }

        console.log(uploadedFiles[0]);
        var urlImagen = uploadedFiles[0].fd.replace(deleteFd, "");

        // Generate a unique URL where the avatar can be downloaded.
        var fotoUrl = require('util').format('%s/user/avatar/%s/%s', sails.getBaseUrl(), req.session.user.id, params.nombre);
        var fotoUrlFd = uploadedFiles[0].fd;

        nuevoPokemon = {
          "nombre": params.nombre,
          "dueno": req.session.user.id,
          "fotoUrl": fotoUrl,
          "fotoUrlFd": fotoUrlFd,
          "url": urlImagen,
        }

        Pokemon.create(nuevoPokemon)
          .exec(function (err, pokemonCreated) {
            if (err) {
              sails.log.error("Pokemon no creado: ", err);
              return;
            }
            sails.log.info('Pokemon: ' + JSON.stringify(pokemonCreated));
            // response code 200
            return res.redirect("/");
          });
      });
    }

  }
};

