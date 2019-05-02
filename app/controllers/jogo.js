module.exports.jogo = function(application, req, res){
    if (!req.session.autorizado) {
        res.redirect('/');
        return;
    }    
    
    var connection = application.config.dbConnection;
    var JogoDAO = new application.app.models.JogoDAO(connection);

    JogoDAO.iniciaJogo(res, req.session.usuario, req.session.casa, req.query.invalido);
}

module.exports.sair = function (application, req, res) {
    if (!req.session.autorizado) {
        res.redirect('/');
        return;
    }
    req.session.destroy(function (err) {
        res.redirect('/');
    });
}

module.exports.suditos = function (application, req, res) {
    if (!req.session.autorizado) {
        res.redirect('/');
        return;
    }
    
    res.render('aldeoes');
}

module.exports.pergaminhos = function (application, req, res) {
    if (!req.session.autorizado) {
        res.redirect('/');
        return;
    }
    
    var connection = application.config.dbConnection;
    var JogoDAO = new application.app.models.JogoDAO(connection);

    JogoDAO.getAcoes(req.session.usuario, res);
}


module.exports.ordenar_sudito = function (application, req, res) {
    if (!req.session.autorizado) {
        res.redirect('/');
        return;
    }
    
    var dadosForm = req.body;

    req.assert('acao', 'Ação deve ser informada').notEmpty();
    req.assert('quantidade', 'Quantidade deve ser informada').notEmpty();

    var erros = req.validationErrors();

    if (erros) {
        res.redirect('jogo?invalido=1');
        return;
    }

    var connection = application.config.dbConnection;
    var JogoDAO = new application.app.models.JogoDAO(connection);
    
    dadosForm.usuario = req.session.usuario;
    JogoDAO.acao(dadosForm, req);

    res.redirect('jogo?invalido=2');
}
