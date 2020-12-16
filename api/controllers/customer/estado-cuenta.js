module.exports = {


  friendlyName: 'Estado cuenta',


  description: 'Muestra las transacciones que se encuentren en el estado de movimiento hasta la fecha de corte',


  inputs: {

  },


  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'pages/customer/views/view-cuentas'
    },
    notFound: {
      description: 'No user with the specified ID was found in the database.',
      responseType: 'notFound'
    }
  },


  fn: async function (inputs) {

    let cuenta = await EstadoCuenta.findOne({
      cuenta: this.req.me.id
    });

    let transacciones = await Transaccion.find({
      estado_cuenta: cuenta.id
    }).populate('local').populate('diferido');
    // All done.
    return {
      transacciones: transacciones
    };
  }


};
