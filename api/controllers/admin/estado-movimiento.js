module.exports = {


  friendlyName: 'Estado movimiento',


  description: 'Muestra las transacciones que se encuentren en el estado de movimiento hasta la fecha de corte',


  inputs: {
    // cuentaId: {
    //   description: '',
    //   type: 'number',
    //   required: true
    // }
  },


  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'pages/admin/view-movimientos'
    },
    notFound: {
      description: 'No user with the specified ID was found in the database.',
      responseType: 'notFound'
    }
  },


  fn: async function (inputs) {
    let estados_movimientos = await EstadoMovimiento.find().populate('cuenta');
    let cuentas = await Cuenta.find().populate('cliente');
    
    return{
      movimientos: estados_movimientos,
      cuentas: cuentas
    };

  }


};
