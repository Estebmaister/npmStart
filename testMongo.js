// Variables para la conexión con MongoDB.
var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");

// URL de conexión con la BD
var url = "mongodb://localhost:27017/test";

// Prueba de conexión con el servidor
MongoClient.connect(url, function (err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  db.close();
});

// Prueba para la inserción de datos.
var insertarPeliculas = function (db, callback) {
  // Carga de la colección de películas.
  var collection = db.collection("peliculas");

  // Inserción de algunas películas
  collection.insert(
    [
      { titulo: "Akira", director: "Katsuhiro Otomo" },
      { titulo: "La guerra de las galaxias", director: "George Lucas" },
      { titulo: "Blade runner", director: "Ridley Scott" },
    ],
    function (err, docs) {
      // Tests unitarios
      assert.equal(err, null);
      assert.equal(3, docs.result.n);
      assert.equal(3, docs.ops.length);

      // Log de consola
      console.log("Insertadas películas en las colección de películas.");

      callback(docs);
    }
  );
};

// Pruebas para la lectura de datos insertados
var leerPeliculas = function (db, callback) {
  // Carga de la colección de películas.
  var collection = db.collection("peliculas");

  // Consulta de los documentos (películas) de la colección
  collection.find({}).toArray(function (err, res) {
    assert.equal(err, null);
    assert.equal(2, res.length);
    console.log("Se han encontrado las siguientes películas");
    console.dir(res);
    callback(res);
  });
};

// Pruebas para la actualización de películas
var actualizarPeliculas = function (db, callback) {
  // Carga de la colección de películas.
  var collection = db.collection("peliculas");

  // Actualizar la película de título Akira, añadiendole el año
  collection.update({ titulo: "Akira" }, { $set: { año: 1988 } }, function (
    err,
    res
  ) {
    assert.equal(err, null);
    assert.equal(1, res.result.n);
    console.log("Actualizada película Akira para incluir el año");
    callback(res);
  });
};

// Pruebas para el borrado de películas
var borrarPeliculas = function (db, callback) {
  // Carga de la colección de películas.
  var collection = db.collection("peliculas");

  // Borrar la película con el titulo Akira
  collection.remove({ titulo: "Akira" }, function (err, res) {
    assert.equal(err, null);
    assert.equal(0, res.result.n);
    console.log("Se ha eliminado la película con el título Akira");
    callback(res);
  });
};

// Conexión con el servidor para la consulta de datos
MongoClient.connect(url, function (err, db) {
  assert.equal(null, err);
  console.log("Conexión con el servidor para las operaciones CRUD");

  // Invocación encadenada de las operaciones.
  //   insertarPeliculas(db, function () {
  //     db.close();
  //   });

  // Invocación encadenada de las operaciones.
  //   leerPeliculas(db, function () {
  //     db.close();
  //   });

  // Invocación encadenada de las operaciones.
  //   actualizarPeliculas(db, function () {
  //     leerPeliculas(db, function () {
  //       db.close();
  //     });
  //   });

  // Invocación encadenada de las operaciones.
  borrarPeliculas(db, function () {
    leerPeliculas(db, function () {
      db.close();
    });
  });
});

// Remember always change the test function to avoid errors throw
