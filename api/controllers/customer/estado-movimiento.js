module.exports = {


  friendlyName: 'Estado movimiento',


  description: 'Muestra las transacciones que se encuentren en el estado de movimiento hasta la fecha de corte',


  inputs: {

  },


  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'pages/customer/views/view-movimientos'
    },
    notFound: {
      description: 'No user with the specified ID was found in the database.',
      responseType: 'notFound'
    }
  },


  fn: async function () {

    let movimiento = await EstadoMovimiento.findOne({
      cuenta: this.req.me.id
    });

    let transacciones = await Transaccion.find({
      estado_movimiento: movimiento.id
    }).populate('local').populate('diferido');

    // let transaccionesIds = new Array();
    // transacciones.forEach(element => {
    //   transaccionesIds.push(element.id);
    // });

    // let pagos = await Pago.find({
    //   transaccion: transaccionesIds
    // }).populate('transaccion');
    // sails.log.info(transacciones);
    // All done.
    return {
      transacciones: transacciones
    };

  }


};
