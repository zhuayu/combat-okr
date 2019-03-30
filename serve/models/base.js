const knex = require('./knex');

class Base {
  constructor(props) {
    this.table = props;
  }

  knex() {
    return knex(this.table)
  }

  all(){
    return knex(this.table).select()
  }

  select(params) {
    return knex(this.table).select().where(params).orderBy('id', 'desc')
  }

  insert(params){
    return knex(this.table).insert( params )
  }

  update(id, params ){
    return knex(this.table).where('id', '=', id).update( params )
  }

  delete(id){
    return knex(this.table).where('id', '=', id).del()
  }
}

module.exports = Base;