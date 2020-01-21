 
 class MusicaRepository {
    
    constructor(conexao) {
       this._conexao = conexao;
    }

    porId(id, callback ) {
        this._conexao.query(`select * from musica where id = ${id}`, callback);
    }


    todos(callback) {
      this._conexao.query('select * from musica', callback);
    }

   
    salva(musica, callback) {
        console.log('ID ' + musica.id);

        if ( (musica.hasOwnProperty('id')) && (musica.id > 0) ) {
               this._conexao.query('update musica set ? where id = ' + musica.id, musica, callback);
               console.log('executou update');

        } else {
            this._conexao.query('insert into musica set ?', musica, callback);
            console.log('executou insert');

        }    
    }

    remove(musica, callback) {
        this._conexao.query('delete from musica where id = ' + musica.id, callback);
    }

} 

module.exports = () => { return MusicaRepository };