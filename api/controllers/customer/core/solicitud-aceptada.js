module.exports = {


  friendlyName: 'Solicitud aceptada',


  description: '',


  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'pages/customer/views/view-solicitud-aceptada'
    }
  },


  fn: async function () {
    let diferidos = await Diferido.find();

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

    let transaccion = "";


    transacciones.forEach(element => {
      sails.log.debug(diferidos[diferidos.length - 1].id == element.diferido.id);
      if(diferidos[diferidos.length - 1].id == element.diferido.id){
        transaccion = element;
      }
    });

    sails.log.debug(transaccion);
    // All done.
    return{
      transaccion: transaccion
    };

  }


};
