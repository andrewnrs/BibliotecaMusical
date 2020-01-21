 
 class ArtistaRepository {
    
    constructor(conexao) {
       this._conexao = conexao;
    }

    porId(id, callback ) {
        this._conexao.query(`select * from artista where id = ${id}`, callback);
    }

    porNome(nome, callback ) {
        this._conexao.query(`select * from artista where nome = ${nome}`, callback);
    }

    todos(callback) {
      this._conexao.query('select * from artista', callback);
    }

   
    salva(artista, callback) {
        console.log('ID ' + artista.id);

        if ( (artista.hasOwnProperty('id')) && (artista.id > 0) || ((artista.hasOwnProperty('nome')) &&artista.nome.length > 0)) {
               this._conexao.query('update artista set ? where id = ' + artista.id, artista, callback);
               console.log('executou update');

        } else {
            this._conexao.query('insert into artista set ?', artista, callback);
            console.log('executou insert');

        }    
    }

    remove(artista, callback) {
        this._conexao.query('delete from artista where id = ' + artista.id, callback);
    }

} 

module.exports = () => { return ArtistaRepository };