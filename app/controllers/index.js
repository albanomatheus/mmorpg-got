module.exports.index = function(application, req, res){
    res.render('index', {erros:{}});
}

module.exports.autenticar = function (application, req, res) {
    let dadosForm = req.body;

    req.assert("usuario", "Usuário não pode ser vazio").notEmpty();
    req.assert("senha", "Senha não pode ser vazio").notEmpty();

    let erros = req.validationErrors();

    if (erros) {
        res.render("index", {erros});
        return;
    }

    let conn = application.config.dbConnection;
    let UsuariosDAO = new application.app.models.UsuariosDAO(conn);
    
    UsuariosDAO.autenticar(dadosForm, req, res);
}