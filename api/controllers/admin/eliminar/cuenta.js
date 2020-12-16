module.exports = {


  friendlyName: 'EliminarCuenta',


  description: 'Cuenta eliminar.',


  inputs: {
    id:{
      type: 'number',
      required: true
    }
  },


  exits: {
    redirect: {
      responseType: 'redirect',
      description: ''
    },
  },


  fn: async function (inputs, exits) {

    let idUser = inputs.id

    await EstadoMovimiento.destroyOne({cuenta: idUser})
    await EstadoCuenta.destroyOne({cuenta: idUser})
    let userDeleted = await Cuenta.destroyOne({id: idUser})
    await Cliente.destroyOne({id: userDeleted.id})
  
    return exits.redirect('/admin/cuentas');;

  }


};
