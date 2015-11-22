/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function (cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();


  (function () {
    User.create({
      nombre: "Carolina",
      usuario: "caro",
      password: "123456"
    }).exec(function (err, usrCreated) {

      if (err) {
        sails.log.error('Error :( ', err);
        return;
      }

      sails.log.info('Usuario: ' + JSON.stringify(usrCreated));

      // Crear el pokemon referenciando al usuario
      Pokemon.create({nombre: "Pikachu", dueno: usrCreated.id})
        .exec(function (err, pokemonCreated) {
          if (err) {
            sails.log.error('Error :( ', err);
            return;
          }
          sails.log.info('Pokemon: ' + JSON.stringify(pokemonCreated));
        });

      Pokemon.create({nombre: "Charizar", dueno: usrCreated.id})
        .exec(function (err, pokemonCreated) {
          if (err) {
            sails.log.error('Error :( ', err);
            return;
          }
          sails.log.info('Pokemon: ' + JSON.stringify(pokemonCreated));
        });

    });
  })();
};
