/* importar o mongodb */
var mongo = require('mongodb');

var connMongoDB = function(){
    try {
        var db = new mongo.Db(
            'got',
            new mongo.Server(
                'localhost', // string contendo o endereço do servidor
                27017, // porta de conexão
                {}
            ),
            {}
        );
    } catch (err) {
        let db = undefined;
        console.log('Erro ocorreu ' + err);
    }

    return db;
}

module.exports = function(){
    return connMongoDB;
}