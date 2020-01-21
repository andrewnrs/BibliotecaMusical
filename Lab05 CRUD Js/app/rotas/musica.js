module.exports = function (app) {

    
    app.get('/musicassolo', function (req, resp) {

        let conexao = new app.infra.ConnectionFactory().getConexao();
        let musicas = new app.repositorio.MusicaRepository(conexao);

        musicas.todos(function (erros, resultado) {

            if (erros) {
                console.log(erros);
            }
            resp.render('musicas/listagem', {lista: resultado });
        });
        conexao.end();
    });

    /* ---------------------------------------------------------------- */
    app.get('/musicassolo/form', function (req, resp) {
        //document.getElementById('artistas').set;
        resp.render('musicas/form-cadastro', {errosValidacao: {},  musica: {} });
    });


    app.post('/musicassolo', function (req, resp) {

        let musica = req.body;
        console.log(musica);

        req.assert('nome', 'Nome da musica é obrigatório.').notEmpty();
        req.assert('genero', 'Genero da musica é obrigatória.').notEmpty();
        req.assert('duracao', 'Duração da musica é obrigatória.').notEmpty();
        //req.assert('artistas', 'Artista da musica é obrigatório.').notEmpty();
        //req.assert('dataNascimento', 'Data inválida').isDate();

        let erros = req.validationErrors();

        if (erros) {
            resp.render('musicas/form-cadastro', { errosValidacao: erros, musica: musica });
            return;
        }


        let conexao = new app.infra.ConnectionFactory().getConexao();
        let musicas = new app.repositorio.MusicaRepository(conexao);
        //let artistas = new app.repositorio.ArtistaRepository(conexao);

        console.log(musica.artista)

        musicas.salva(musica, function (erros, resultados) {
           //resp.render('musicas/listagem' );   
           resp.redirect('/musicassolo');
        });

        conexao.end();

    });

    app.post('/musicassolo/remove/(:id)', function (req, resp) {
        let musica = {
            id: req.params.id
        }

        let conexao = new app.infra.ConnectionFactory().getConexao();
        let musicas = new app.repositorio.MusicaRepository(conexao);

        musicas.remove(musica, function (erros, resultados) {
            resp.redirect('/musicassolo');
        });
    });


    app.get('/musica/edita/(:id)', function (req, resp) {
        

        let conexao = new app.infra.ConnectionFactory().getConexao();
        let musicas = new app.repositorio.MusicaRepository(conexao);

        musicas.porId(req.params.id, function (erros, resultado) {
            if (erros ) {
                console.log(erros);
            }
            resp.render('musicas/form-cadastro', {errosValidacao: erros,  
                                                    musica: {
                                                        id: resultado[0].id,
                                                        nome: resultado[0].nome,
                                                        genero: resultado[0].genero,
                                                        duracao: resultado[0].duracao}
            });
            console.log(resultado);
        });
        conexao.end();
    });

}