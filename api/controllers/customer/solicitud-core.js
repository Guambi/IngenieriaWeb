module.exports = {


  friendlyName: 'Solicitud core',


  description: 'Mostrar la pagina de solicitud',

  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'pages/customer/views/view-solicitud'
    }
  },


  fn: async function () {

    let movimiento = await EstadoMovimiento.findOne({
      cuenta: this.req.me.id
    });


    let cuenta = await EstadoCuenta.findOne({
      cuenta: this.req.me.id
    });

    let transacciones = await Transaccion.find({
      estado_movimiento: movimiento.id,
    }).populate('local').populate('diferido');

    let transaccionesCuenta = await Transaccion.find({
      estado_cuenta: cuenta.id,
    }).populate('local').populate('diferido');

    transaccionesCuenta.forEach(element => {
      transacciones.push(element);
    });

    // All done.
    return {
      transacciones: transacciones
    };

  }


};
